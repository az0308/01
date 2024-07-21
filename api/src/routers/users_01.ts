import bcrypt from "bcryptjs"
import jwt, {type JwtPayload} from "jsonwebtoken"
import {Router} from "express";
import type {Request, Response, NextFunction,ParamsDictionary} from "express-serve-static-core";
import { isRegularExpressionLiteral } from "typescript";
import nsUtil from "../nsUtil/nsUtil";
import type { Settings } from "node:http2";
import { error } from "node:console";
import { resolve } from "node:path";


export const router = Router();

type Roles = "admin" | "guest" | "it";

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

router.post("/register",async (req: Request<ParamsDictionary, {message: string;users:User[]}, ReqBodyUser>, res: Response)=>{
    const {email, username, password,roles} = req.body;
    const userIdx = users.findIndex((user) => user.email === email);

    if( userIdx >=0 ){
        return res.status(400).json({error:"用戶email已經存在"})
    }

    const hashedPassword =await bcrypt.hash(password, 10);

    let id = users.length===0 ? 0 : users[0].id;
    id = users.reduce((maxId, user, idx)=>{
        return user.id > maxId? user.id : maxId;
    },id)+1;

    const user:User = {
        id, 
        email, 
        username, 
        password, 
        hashedPassword,
        roles
    };

    users.push(user);  //Todo: in memory DB => jsonDB => MySQL 
    console.log("users", users);


    res.status(201).json({message:"註冊成功",users});
});


router.post("/login",async (req: Request<ParamsDictionary,{message:Settings; users:User[]}>, res: Response)=>{
    const {email, password, roles} = req.body;
    const userIdx = users.findIndex((user) => user.email === email);

    if( userIdx < 0 ){
        return res.status(400).json({error:"用戶email不存在"})
    }

    const user=users[userIdx]

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