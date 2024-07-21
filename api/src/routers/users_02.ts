import bcrypt from "bcryptjs"
import jwt, {type JwtPayload} from "jsonwebtoken"

import gmail,{type ILetter} from "../sendMail/gmail";
import {Router} from "express";
import type {Request, Response, NextFunction,ParamsDictionary} from "express-serve-static-core";
import { isRegularExpressionLiteral } from "typescript";
import nsUtil from "../nsUtil/nsUtil";
import type { Settings } from "node:http2";
import { error } from "node:console";
import { resolve } from "node:path";


export const router = Router();

type Roles = "admin" | "guest" | "it" | "account" | "manager";

interface ReqBodyUser {
    email: string;
    username: string;
    password: string;
    roles: Roles[]; //["admin", "guest", "it"]
}

interface User extends ReqBodyUser {
    id: number;
    hashedPassword: string;
}

interface SignsignInUser{
    id: string;
    username: string;
    email: string;
}

const users: User[] = [];
const secret = process.env.JWT_SECRET || "mysecret";

import tblUsers from '../mysql/users';
import type { IUserLogin, IUserRegister, IUserNoId, IUser } from "../mysql/users";

router.get('/create',async(req:Request, res:Response)=>{
    const rs = await tblUsers.create();
    console.log(rs);
    //console.log(process.env.BD_USER)
    //console.log(process.env.DB_PASSWORD)
    if( rs == null ){
        res.status(500).json({error: `DB Table ${tblUsers.tblName} create fail.`});
    } else {
        res.status(200).json(rs);
    }
});

router.get('/drop',async(req:Request, res:Response)=>{
    const rs = await tblUsers.drop();
    console.log(rs);
    if( rs == null ){
        res.status(500).json({error: `DB Table ${tblUsers.tblName} drop fail.`});
    } else {
        res.status(200).json(rs);
    }
});

router.get('/clear',async(req:Request, res:Response)=>{
    const rs = await tblUsers.clear();
    console.log(rs);
    if( rs == null ){
        res.status(500).json({error: `DB Table ${tblUsers.tblName} drop fail.`});
    } else {
        res.status(200).json(rs);
    }
});

router.get("/getSchema", async(req: Request, res: Response) => {
    const rs = await tblUsers.getSchema();
    console.log(rs);
    if(rs == null){
        res.status(500).json({ error: `Get schema of ${tblUsers.tblName} fail.`});
    }else{
        res.status(200).json(rs);
    }
});

router.get("/getFieldName", async(req: Request, res: Response) => {
    const rs = await tblUsers.getFieldName();
    console.log(rs);
    if(rs == null){
        res.status(500).json({ error: `Get getFieldName of ${tblUsers.tblName} fail.`});
    }else{
        res.status(200).json(rs);
    }
});

router.post("/register",async (req: Request<ParamsDictionary, {message: string;users:IUser}, IUserRegister>, res: Response)=>{
    const {email, name, password,roles,phone} = req.body;

    if( !email || !name || !password || !roles ){
        return res
        .status(400)
        .json({ error: "email, name, password, roles are required."})
    }
    const userIdx = users.findIndex((user) => user.email === email);

    const dbUser = await tblUsers.getByEmail(email);
    if( dbUser ){
        return res.status(400).json({error:`用戶email:${email} 已經存在`});
    }

    const hashed_password = await bcrypt.hash(password, 10);

    //maxID 由mysql auto_inctement解決
    const rand6digit = Math.floor(Math.random() * 1000000).toString().padStart(6, '0')

    const letter: ILetter = {
        from: process.env.MAIL_SENDER as string,
        to: "a9291929120@gmail.com",
        subject: `${name} 感謝您的註冊!此為啟動通知信件`,
        html: `<h1>${name}歡迎註冊</h1>
            <h2>以下是您的帳號啟動碼</h2>
            <h3>${rand6digit}</h3>
        `,
    };
    const info = await gmail.send(letter);
    console.log("啟動信件已經寄出",info);

    const user: IUserNoId = { 
        email, 
        name, 
        password, 
        //hashed_password,
        roles,
        phone,
        activation_secret: rand6digit,
        status: "in-active",
    };

    const rs = await tblUsers.insert([user]);
    if ( rs ){
        res.status(201).json({message: '註冊成功', user: {id: rs.insertedId, ...user}});
    }else{
        res.status(500).json({error: '註冊失敗!'})
    }

    console.log("users", users);


    res.status(201).json({message:"註冊成功",users});
});


router.post("/login",async (req: Request, res: Response)=>{
    const {email, password} = req.body;
    if(!email || !password) {
        return res
            .status(400)
            .json({error: "email, password are required."})
    }
    
    const user = await tblUsers.getByEmail(email);
    if(!user){
        return res.status(400).json({error: `用戶email:${email} 不存在，請間註冊!`});
    }

    const isMatched=await bcrypt.compare(password, user.hashedPassword);

    if( !isMatched ){
        return res.status(400).json({error:"密碼錯誤"})
    }

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username,
            roles: user.roles
        },
        secret,
        {
            expiresIn: "1h",
        }
    );

    res.status(200).json(token);
});

router.get('/profile',async(req: Request,res: Response)=>{
    const token = req.headers.authorization;

    if(!token){
        return res.status(401).json({error:"請先登入"});
    }

    jwt.verify(token,secret,(err,payload)=>{
        if(err){
            return res.status(403).json({error: "jwt 驗證錯誤!"});
        }

        console.log("user:", payload);

        const user = payload as JwtPayload;
        const iat = (user.iat as number) * 1000;
        const exp = (user.exp as number) * 1000;

        res.json({
            message: 'jwt 驗證成功',
            user : payload,
            iat : nsUtil.taipeiTimeString(new Date(iat)),
            exp : nsUtil.taipeiTimeString(new Date(exp)),
        });
    });
});

const jwtVerify = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if(!token){
        return res.status(401).json({error: "請先登入"});
    }

    jwt.verify(token, secret, (err, payload) => {
        if(err) {
            return res.status(403).json({error: "jwt 驗證錯誤!"});
        }
        req.signInUser = payload as SignsignInUser;
        next();
    });
};

router.get('/protected', jwtVerify, (req: Request, res: Response) =>{
    res.json({
        message: 'protected api executed',
        signInUser: req.signInUser,

    });
});

router.get('/onlyAdmin', jwtVerify, (req: Request, res: Response) =>{
    if(req.signInUser.roles.indexOf("admin") === -1){
        return res.status(403).json({error: "只有管理員可以執行此操作"});
    }
    res.json({
        message: 'protected api executed',
        signInUser: req.signInUser
    });
});

router.get('/onlyguest', jwtVerify, (req: Request, res: Response) =>{
    if(req.signInUser.roles.indexOf("guest") === -1){
        return res.status(404).json({error: "只有客人可以執行此操作"});
    }
    res.json({
        message: 'protected api executed',
        signInUser: req.signInUser
    });
});

router.delete("/:id", async (req: Request, res: Response) => {
    const id = +req.params.id;
    const rs = await tblUsers.delete(id);
    if(rs){
        res.status(200).json({message: "刪除成功, id"});
    }else{
        res.status(500).json({error:"刪除失敗"});
    }
});