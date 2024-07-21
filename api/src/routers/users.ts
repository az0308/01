import bcrypt from "bcryptjs"
import jwt, {type JwtPayload} from "jsonwebtoken"

import gmail,{type ILetter} from "../sendMail/gmail";
import {Router, response} from "express";
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
import type { IUserLogin, IUserRegister, IUserNoId, IUser, getfood, getfoodid, getorder } from "../mysql/users";

router.get('/create',async(req:Request, res:Response)=>{
    const rs = await tblUsers.create2();
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

router.post("/register",async (req: Request<ParamsDictionary, {message: string;users:IUser}, IUserNoId>, res: Response)=>{
    const {email, name, password,roles,phone} = req.body;

    if( !email || !name || !password || !roles || !phone){
        return res
        .status(400)
        .json({ error: "email, name, password, roles, phone are required."})
    }
    //maxID 由mysql auto_inctement解決
    const rand6digit = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

    const dbUser = await tblUsers.getByEmail(email);

    if (dbUser && dbUser.status === 'active') {
        console.log("此用戶已存在")
        res.status(402).json({ code: 402, message: '此用戶已存在' });
    }else if(dbUser && dbUser.status === 'in-a') {
        const letter: ILetter = {
            from: process.env.MAIL_SENDER as string,
            to: email,
            subject: `${name} 感謝您的註冊!此為啟動通知信件`,
            html: `<h1>${name}歡迎註冊</h1>
                <h2>以下是您的帳號啟動碼</h2>
                <h3>${rand6digit}</h3>
            `,
        };
        const info = await gmail.send(letter);
        console.log("啟動信件已經寄出",info);

        const result = await tblUsers.update2({email,name,password,phone,activation_secret: rand6digit}as IUser);
        if (result) {
            console.log("驗證碼已重新傳送")
            res.status(401).json({ code: 401, message: '驗證碼已重新傳送' });
        }
    }else{
        const letter: ILetter = {
            from: process.env.MAIL_SENDER as string,
            to: email,
            subject: `${name} 感謝您的註冊!此為啟動通知信件`,
            html: `<h1>${name}歡迎註冊</h1>
                <h2>以下是您的帳號啟動碼</h2>
                <h3>${rand6digit}</h3>
            `,
        };
        const info = await gmail.send(letter);
        console.log("啟動信件已經寄出",info);

        //const hashed_password = await bcrypt.hash(password, 10);

        const user: IUserNoId = { 
            email, 
            name, 
            password, 
            //hashed_password,
            roles,
            phone,
            activation_secret:rand6digit,
            status: "in-a",
        };

        await tblUsers.insert([user]);

        res.status(201).json({code:201,message: "驗證碼發送成功"});
        
        console.log("驗證碼發送成功")
    }
});


router.post("/register1", async (req: Request<ParamsDictionary, { message: string; users: IUser }, IUserNoId>, res: Response) => {
    const { email, name, password, phone, activation_secret } = req.body;

    if (!email || !name || !password || !phone || !activation_secret) {
        return res.status(400).json({ code: 400, error: "email, name, password, roles, phone are required." });
    }

    const user = await tblUsers.getByEmail(email);
    if (!user) {
        console.log("用戶不存在")
        return res.status(400).json({ code:400,error: `用戶email: ${email} 不存在` });
    }

    if (user.status === 'active') {
        console.log("此用戶已存在")
        res.status(402).json({ code: 402, message: '此用戶已存在' });
    }
    const now = new Date().toLocaleString("sv");
    if (activation_secret===user.activation_secret) {
        await tblUsers.update1({email, status: 'active' }as IUser);
        await tblUsers.update3(now, email );
        console.log("註冊成功")
        res.status(201).json({ code: 201, message: "註冊成功" });
    } else {
        console.log("驗證碼錯誤")
        res.status(202).json({ code: 202, message: '驗證碼錯誤' });
    }
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
    console.log("User:", user);
        console.log("Password from request:", password);
        //console.log("Stored password hash:", user.hashed_password);

   // const isMatched=await bcrypt.compare(password, user.hashed_password);

    /*if( !isMatched ){
        return res.status(400).json({error:"密碼錯誤"})
    }*/

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            name: user.name,
            roles: user.roles,
            status: user.status
        },
        secret,
        {
            expiresIn: "1h",
        }
    );

    jwt.verify(token, secret, (err, payload) => {
        req.signInUser = payload as SignsignInUser;
    });
    
    if(req.signInUser.status.indexOf("active") === -1){
        res.status(404).json({code:404,error: "帳號未註冊"});
    }else{
        if(req.signInUser.roles.indexOf("guest") === -1){
            res.status(403).json({code:403,error: "只有會員可以執行此操作"});
        }else{
            res.status(200).json({code:200,signInUser: req.signInUser});
        }
    }

});


router.post("/login_admin",async (req: Request, res: Response)=>{
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
    console.log("User:", user);
        console.log("Password from request:", password);
        //console.log("Stored password hash:", user.hashed_password);

    /*const isMatched=await bcrypt.compare(password, user.hashed_password);

    if( !isMatched ){
        return res.status(400).json({error:"密碼錯誤"})
    }*/

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            name: user.name,
            roles: user.roles
        },
        secret,
        {
            expiresIn: "1h",
        }
    );

    jwt.verify(token, secret, (err, payload) => {
        req.signInUser = payload as SignsignInUser;
    });
    
    if(req.signInUser.roles.indexOf("admin") === -1){
        res.status(403).json({code:403,error: "只有管理員可以執行此操作"});
    }else{
        res.status(200).json({code:200,signInUser: req.signInUser});
    }
});


router.post("/login_shop",async (req: Request, res: Response)=>{
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
    console.log("User:", user);
        console.log("Password from request:", password);
        //console.log("Stored password hash:", user.hashed_password);

    /*const isMatched=await bcrypt.compare(password, user.hashed_password);

    if( !isMatched ){
        return res.status(400).json({error:"密碼錯誤"})
    }*/

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            name: user.name,
            roles: user.roles
        },
        secret,
        {
            expiresIn: "1h",
        }
    );

    jwt.verify(token, secret, (err, payload) => {
        req.signInUser = payload as SignsignInUser;
    });
    
    if(req.signInUser.roles.indexOf("it") === -1){
        res.status(403).json({code:403,error: "只有店家可以執行此操作"});
    }else{
        res.status(200).json({code:200,signInUser: req.signInUser});
    }
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

router.put('/update', async (req: Request, res: Response) => {
    const {email, name, password, phone } = req.body;

    if (!name || !phone || !password ) {
        return res.status(400).json({ message: 'password, name, and phone are required.' });
    }

    try {
        const result = await tblUsers.update({email, name, password, phone } as IUser);
        if (result > 0) {
            res.status(200).json({ code:200, message: 'User updated successfully' });
        } else {
            res.status(500).json({ code:500, message: 'Failed to update user' });
        }
    } catch (err) {
        res.status(500).json({ code:500, message: 'Internal server error', error: err });
    }
});

router.post("/getuser", async (req: Request, res: Response) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ error: "id is required." });
    }
    
    try {
        const userId = parseInt(id, 10);
        if (isNaN(userId)) {
            return res.status(400).json({ error: "id must be a valid number." });
        }
        
        const user = await tblUsers.getuser(userId);
   
        if (!user) {
            res.status(404).json({ error: `User with id ${userId} not found.` });
        } else {
            res.status(200).json(user);
        }
    } catch (err) {
        console.error('Error retrieving user:', err);
        res.status(500).json({ error: `Failed to get user from ${tblUsers.tblName}.` });
    }
});

router.get("/getuser1", async(req: Request, res: Response) => {
    const rs = await tblUsers.getuser1();
    console.log(rs);
    if(rs == null){
        res.status(500).json({ error: `Get user1 of ${tblUsers.tblName} fail.`});
    }else{
        res.status(200).json(rs);
    }
});

router.post("/getuser2", async (req: Request, res: Response) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: "email is required." });
    }
    
    try {        
        const user = await tblUsers.getuser2(email);
   
        if (!user) {
            res.status(404).json({ error: `User with ${email} not found.` });
        } else {
            console.log(user);
            res.status(200).json({code:200,user});
        }
    } catch (err) {
        console.error('Error retrieving user:', err);
        res.status(500).json({ error: `Failed to get user from ${tblUsers.tblName}.` });
    }
});

router.post("/getuser3", async (req: Request, res: Response) => {
    const { email } = req.body;
  
    try {        
        const user = await tblUsers.getuser3(email);
   
        if (!user) {
            res.status(404).json({ error: `User with ${email} not found.` });
        } else {
            console.log(user);
            res.status(200).json({code:200,user});
        }
    } catch (err) {
        console.error('Error retrieving user:', err);
        res.status(500).json({ error: `Failed to get user from ${tblUsers.tblName}.` });
    }
});

router.get("/getfood", async(req: Request, res: Response) => {
    const rs = await tblUsers.getfood();
    console.log(rs);
    if(rs == null){
        res.status(500).json({ error: `Get food of ${tblUsers.tblName1} fail.`});
    }else{
        res.status(200).json(rs);
    }
});

router.get("/getfood1", async(req: Request, res: Response) => {
    const rs = await tblUsers.getfood1();
    console.log(rs);
    if(rs == null){
        res.status(500).json({ error: `Get food1 of ${tblUsers.tblName1} fail.`});
    }else{
        console.log("ok")
        res.status(200).json(rs);
    }
});

router.get("/getfood2", async(req: Request, res: Response) => {
    const rs = await tblUsers.getfood2();
    console.log(rs);
    if(rs == null){
        res.status(500).json({ error: `Get food2 of ${tblUsers.tblName1} fail.`});
    }else{
        res.status(200).json(rs);
    }
});

router.get("/getfood3", async(req: Request, res: Response) => {
    const rs = await tblUsers.getfood3();
    console.log(rs);
    if(rs == null){
        res.status(500).json({ error: `Get food3 of ${tblUsers.tblName1} fail.`});
    }else{
        res.status(200).json(rs);
    }
});

router.get("/getfood4", async(req: Request, res: Response) => {
    const rs = await tblUsers.getfood4();
    console.log(rs);
    if(rs == null){
        res.status(500).json({ error: `Get food4 of ${tblUsers.tblName1} fail.`});
    }else{
        res.status(200).json(rs);
    }
});

router.put('/updatefood', async (req: Request, res: Response) => {
    const {name, price, class1, id } = req.body;

    try {
        const result = await tblUsers.updatefood( name, price, class1, id);
        if (result > 0) {
            res.status(200).json({ code:200, message: 'User updated successfully' });
        } else {
            res.status(500).json({ code:500, message: 'Failed to update user' });
        }
    } catch (err) {
        res.status(500).json({ code:500, message: 'Internal server error', error: err });
    }
});

router.post('/updateorder', async (req: Request, res: Response) => {
    const {count, id } = req.body;

    try {
        const result = await tblUsers.update4( count, id);
        if (result > 0) {
            console.log("ok")
            res.status(200).json({ code:200, message: 'User updated successfully' });
        } else {
            res.status(500).json({ code:500, message: 'Failed to update user' });
        }
    } catch (err) {
        res.status(500).json({ code:500, message: 'Internal server error', error: err });
    }
});


router.post("/insertfood",async (req: Request<ParamsDictionary, {}, getfood>, res: Response)=>{
    const {name, price, class1} = req.body;

    if(!name || !price || !class1 ){
        return res
        .status(400)
        .json({ error: "name, price are required."})
    }
    //maxID 由mysql auto_inctement解決
  
        const food: getfood = { 
            name,       
            price,
            class1,
        };

        await tblUsers.insert1([food]);

        res.status(201).json({code:201,message: "新增菜單成功"});
        
        console.log("新增菜單成功")
    });

    router.post("/deletefood", async (req: Request, res: Response) => {
        const {id} = req.body;
        try {
            const rs = await tblUsers.delete1(id);
            if (rs) {
                res.status(200).json({ code: 200, message: "刪除成功", id });
            } else {
                res.status(500).json({ code: 500, error: "刪除失敗" });
            }
        } catch (err) {
            res.status(500).json({ code: 500, error: "內部伺服器錯誤", details: err });
        }
    });


    router.post("/insertorder",async (req: Request<ParamsDictionary, {}, getorder>, res: Response)=>{
        const {name, count, price, user} = req.body;
    
        if(!name || !price || !count ){
            return res
            .status(400)
            .json({ error: "name, price are required."})
        }
        //maxID 由mysql auto_inctement解決
      
            const order1: getorder = { 
                name,
                count,       
                price,
                user,
                state: "nok"
            };
    
            await tblUsers.insert2([order1]);
    
            res.status(201).json({code:201,message: "已加入購物車"});
            
            console.log("已加入購物車")
        });

router.post("/getorder", async (req: Request, res: Response) => {
    const { user } = req.body;
          
    try {        
        const user1 = await tblUsers.getorder(user);
           
        if (!user1) {
            res.status(404).json({ error: `User with ${user} not found.` });
        } else {
            console.log(user1);
            res.status(200).json(user1);
        }
    } catch (err) {
        console.error('Error retrieving user:', err);
        res.status(500).json({ error: `Failed to get user from ${tblUsers.tblName2}.` });
    }
});

router.post("/deleteorder", async (req: Request, res: Response) => {
    const {id} = req.body;
    try {
        const rs = await tblUsers.delete2(id);
        if (rs) {
            console.log("ok")
            res.status(200).json({ code: 200, message: "刪除成功", id });
        } else {
            res.status(500).json({ code: 500, error: "刪除失敗" });
        }
    } catch (err) {
        res.status(500).json({ code: 500, error: "內部伺服器錯誤", details: err });
    }
});