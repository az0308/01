import { create } from "domain";
import type { RowDataPacket, ResultSetHeader } from "mysql2";
import myConn from "./myConn";

import brcypt from "bcryptjs"
import type internal from "stream";

export interface IUserLogin{
    email: string;
    password: string;
}

export interface IUserRegister extends IUserLogin{
    name: string;
    roles: string;
    phone: string;
}

export interface IUserNoId extends IUserRegister{
    //hashed_password: string;
    activation_secret: string;
    status: string;
}

export interface IUser extends IUserNoId{
    id:number;
}

export interface getfood{
    name: string;
    price: string;
    class1: string;
}

export interface getfoodid extends getfood{
    id:number;
}

export interface getorder{
    name: string;
    count: string;
    price: string;
    user: string;
    state: string;
}

const tblUsers = {
    tblName: 'users',
    tblName1: 'food',
    tblName2: 'order1',
    create: async() => {
        try{
            const sql = `CREATE TABLE IF NOT EXISTS ${tblUsers.tblName}
                (
                    id int(11) NOT NULL AUTO_INCREMENT COMMENT '代號',
                    name varchar(30) NOT NULL COMMENT '姓名',
                    email varchar(50) NOT NULL COMMENT 'email',
                    status varchar(10) DEFAULT NULL COMMENT '狀態：active/in-active',
                    password varchar(40) DEFAULT NULL COMMENT '明碼',
                    hashed_password varchar(256) DEFAULT NULL COMMENT '密碼',
                    roles varchar(256) DEFAULT NULL COMMENT '角色：member,admin,manager,accounting,it,hr',
                    activation_secret VARCHAR(12) DEFAULT NULL COMMENT '啟動碼',
                    PRIMARY KEY (id)
                    ) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
                `;
            const[rs, fields] = await myConn.query(sql);
            return rs;
        } catch ( err ) {
            console.log("create tblUsers error:", err);
            return null;
        }
    },
    create1: async() => {
        try{
            const sql = `CREATE TABLE IF NOT EXISTS ${tblUsers.tblName1}
                (
                    id int(11) NOT NULL AUTO_INCREMENT COMMENT '代號',
                    name varchar(30) NOT NULL COMMENT '姓名',
                    email varchar(50) NOT NULL COMMENT 'email',
                    status varchar(10) DEFAULT NULL COMMENT '狀態：active/in-active',
                    password varchar(40) DEFAULT NULL COMMENT '明碼',
                    hashed_password varchar(256) DEFAULT NULL COMMENT '密碼',
                    roles varchar(256) DEFAULT NULL COMMENT '角色：member,admin,manager,accounting,it,hr',
                    activation_secret VARCHAR(12) DEFAULT NULL COMMENT '啟動碼',
                    PRIMARY KEY (id)
                    ) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
                `;
            const[rs, fields] = await myConn.query(sql);
            return rs;
        } catch ( err ) {
            console.log("create tblUsers error:", err);
            return null;
        }
    },
    create2: async() => {
        try{
            const sql = `CREATE TABLE IF NOT EXISTS ${tblUsers.tblName2}
                (
                    id int(11) NOT NULL AUTO_INCREMENT COMMENT '代號',
                    name varchar(30) NOT NULL COMMENT '姓名',
                    email varchar(50) NOT NULL COMMENT 'email',
                    status varchar(10) DEFAULT NULL COMMENT '狀態：active/in-active',
                    password varchar(40) DEFAULT NULL COMMENT '明碼',
                    hashed_password varchar(256) DEFAULT NULL COMMENT '密碼',
                    roles varchar(256) DEFAULT NULL COMMENT '角色：member,admin,manager,accounting,it,hr',
                    activation_secret VARCHAR(12) DEFAULT NULL COMMENT '啟動碼',
                    PRIMARY KEY (id)
                    ) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
                `;
            const[rs, fields] = await myConn.query(sql);
            return rs;
        } catch ( err ) {
            console.log("create tblUsers error:", err);
            return null;
        }
    },
    drop: async () => {
        try{
            const sql = `DROP TABLE ID EXISTS ${tblUsers.tblName}`;
            const [rs] = await myConn.query(sql);
            return rs;
        } catch (err) {
            console.log(`drop table ${tblUsers.tblName} failed`,err);
            return null;
        }
    },
    clear: async () => {
        try{
            const sql = `DELETE FROM ${tblUsers.tblName}`;
            const [rs] = await myConn.query(sql);
            return rs;
        } catch (err) {
            console.log(`drop table ${tblUsers.tblName} failed`,err);
            return null;
        }
    },
    insert: async (oData: IUserNoId[]) => {
        try{
            const detaset: string[][] = [];
            oData.forEach((el, idx) => {
                detaset.push([
                    el.name,
                    el.email,
                    el.status,
                    el.password,
                    //el.hashed_password,
                    el.roles,
                    el.phone,
                    el.activation_secret,
                ]);
            });
            console.log(detaset)

            const sql = `INSERT INTO ${tblUsers.tblName} ( name, email, status, password, roles, phone, activation_secret)
            VALUES ? ;`;
            const [rs] = await myConn.query<ResultSetHeader>(sql, [detaset]);
            console.log('insert sql 回傳結果: ', rs);
            console.log({count: rs.affectedRows, insertedId: rs.insertId});
            return { count: rs.affectedRows, insertedId: rs.insertId };
        } catch (err) {
            return null;
        }
    },
    insert1: async (oData: getfood[]) => {
        try{
            const detaset: string[][] = [];
            oData.forEach((el, idx) => {
                detaset.push([
                    el.name,
                    el.price,
                    el.class1,
                ]);
            });
            console.log(detaset)

            const sql = `INSERT INTO ${tblUsers.tblName1} ( name, price, class)
            VALUES ? ;`;
            const [rs] = await myConn.query<ResultSetHeader>(sql, [detaset]);
            console.log('insert sql 回傳結果: ', rs);
            console.log({count: rs.affectedRows, insertedId: rs.insertId});
            return { count: rs.affectedRows, insertedId: rs.insertId };
        } catch (err) {
            return null;
        }
    },
    insert2: async (oData: getorder[]) => {
        try{
            const detaset: string[][] = [];
            oData.forEach((el, idx) => {
                detaset.push([
                    el.name,
                    el.count,
                    el.price,
                    el.user,
                    el.state
                ]);
            });
            console.log(detaset)

            const sql = `INSERT INTO ${tblUsers.tblName2} ( name, count, price, user, state)
            VALUES ? ;`;
            const [rs] = await myConn.query<ResultSetHeader>(sql, [detaset]);
            console.log('insert sql 回傳結果: ', rs);
            console.log({count: rs.affectedRows, insertedId: rs.insertId});
            return { count: rs.affectedRows, insertedId: rs.insertId };
        } catch (err) {
            return null;
        }
    },
    getSchema: async()=>{
        try {
            const sql = `DESCRIBE ${tblUsers.tblName}`;
            const[rs] = await myConn.query(sql);
            return rs;
        } catch (err) {
            console.log(`getSchema ${tblUsers.tblName} error:`, err);
            return null;
        }
    },

    getuser1: async()=>{
        try {
            const sql = `SELECT ${tblUsers.tblName}.id, ${tblUsers.tblName}.name, ${tblUsers.tblName}.email ,${tblUsers.tblName}.time FROM ${tblUsers.tblName} WHERE ${tblUsers.tblName}.status = 'active'`;
            const[rs] = await myConn.query(sql);
            return rs;
        } catch (err) {
            console.log(`getuser1 ${tblUsers.tblName} error:`, err);
            return null;
        }
    },
    getuser2: async( email:string)=>{
        try {
            const sql = `SELECT ${tblUsers.tblName}.id, ${tblUsers.tblName}.name, ${tblUsers.tblName}.email ,${tblUsers.tblName}.time FROM ${tblUsers.tblName} WHERE ${tblUsers.tblName}.email LIKE ? AND ${tblUsers.tblName}.status = 'active'`;
            const[rs] = await myConn.query(sql, [`%${email}%`]);
            return rs;
        } catch (err) {
            console.log(`getuser ${email} from ${tblUsers.tblName} error:`, err);
            return null;
        }
    },
    getuser3: async( email:string)=>{
        try {
            const sql = `SELECT ${tblUsers.tblName}.name,${tblUsers.tblName}.phone,${tblUsers.tblName}.password FROM ${tblUsers.tblName} WHERE ${tblUsers.tblName}.email =?`;
            const[rs] = await myConn.query(sql, [email]);
            return rs;
        } catch (err) {
            console.log(`getuser ${email} from ${tblUsers.tblName} error:`, err);
            return null;
        }
    },
    getfood: async()=>{
        try {
            const sql = `SELECT * FROM ${tblUsers.tblName1} `;
            const[rs] = await myConn.query(sql);
            return rs;
        } catch (err) {
            console.log(`getfood ${tblUsers.tblName1} error:`, err);
            return null;
        }
    },
    getfood1: async()=>{
        try {
            const sql = `SELECT ${tblUsers.tblName1}.name,${tblUsers.tblName1}.price FROM ${tblUsers.tblName1} WHERE ${tblUsers.tblName1}.class = 'a'`;
            const[rs] = await myConn.query(sql);
            return rs;
        } catch (err) {
            console.log(`getfood1 ${tblUsers.tblName1} error:`, err);
            return null;
        }
    },
    getfood2: async()=>{
        try {
            const sql = `SELECT ${tblUsers.tblName1}.name,${tblUsers.tblName1}.price FROM ${tblUsers.tblName1} WHERE ${tblUsers.tblName1}.class = 'b'`;
            const[rs] = await myConn.query(sql);
            return rs;
        } catch (err) {
            console.log(`getfood1 ${tblUsers.tblName1} error:`, err);
            return null;
        }
    },
    getfood3: async()=>{
        try {
            const sql = `SELECT ${tblUsers.tblName1}.name,${tblUsers.tblName1}.price FROM ${tblUsers.tblName1} WHERE ${tblUsers.tblName1}.class = 'c'`;
            const[rs] = await myConn.query(sql);
            return rs;
        } catch (err) {
            console.log(`getfood1 ${tblUsers.tblName1} error:`, err);
            return null;
        }
    },
    getfood4: async()=>{
        try {
            const sql = `SELECT ${tblUsers.tblName1}.name,${tblUsers.tblName1}.price FROM ${tblUsers.tblName1} WHERE ${tblUsers.tblName1}.class = 'd'`;
            const[rs] = await myConn.query(sql);
            return rs;
        } catch (err) {
            console.log(`getfood1 ${tblUsers.tblName1} error:`, err);
            return null;
        }
    },
    getorder: async(user:string)=>{
        try {
            const sql = `SELECT ${tblUsers.tblName2}.id,${tblUsers.tblName2}.name,${tblUsers.tblName2}.count,${tblUsers.tblName2}.price FROM ${tblUsers.tblName2} WHERE ${tblUsers.tblName2}.user = ? AND ${tblUsers.tblName2}.state = 'nok'`;
            const[rs] = await myConn.query(sql,[user]);
            return rs;
        } catch (err) {
            console.log(`getorder ${tblUsers.tblName2} error:`, err);
            return null;
        }
    },
    getuser: async( id:number)=>{
        try {
            const sql = `SELECT ${tblUsers.tblName}.id, ${tblUsers.tblName}.name, ${tblUsers.tblName}.email FROM ${tblUsers.tblName} WHERE ${tblUsers.tblName}.id= ?`;
            const[rs] = await myConn.query<RowDataPacket[]>(sql, [id]);
            return rs[0];
        } catch (err) {
            console.log(`getuser ${id} from ${tblUsers.tblName} error:`, err);
            return null;
        }
    },
    getFieldName: async () => {
        try {
            const sql = `SELECT a.COLUMN_NAME, a.COLUMN_COMMENT FROM information_schema.COLUMNS a WHERE a.TABLE_NAME = '${tblUsers.tblName}'`;
            const [rs] = await myConn.query(sql);
            return rs;
        } catch (err) {
            console.log('getFieldName: ',err);
            return null;
        }
    },
    getByEmail: async( email: string )=>{
        try {
            const sql = `SELECT * FROM ${tblUsers.tblName} WHERE email= ?`;
            const[rs] = await myConn.query<RowDataPacket[]>(sql, [email]);
            return rs[0];
        } catch (err) {
            console.log(`getByEmail ${email} from ${tblUsers.tblName} error:`, err);
            return null;
        }
    },
    getAll: async()=>{
        try {
            const sql = `SELECT * FROM ${tblUsers.tblName} `;
            const[rs] = await myConn.query<RowDataPacket[]>(sql);
            return rs;
        } catch (err) {
            console.log(`getAll from ${tblUsers.tblName} error:`, err);
            return null;
        }
    },
    delete: async( id: number)=>{
        try {
            const sql = `DELETE FROM ${tblUsers.tblName} WHERE id= ?`;
            const[rs] = await myConn.query(sql, [id]);
            return rs;
        } catch (err) {
            console.log(`delete ${id} from ${tblUsers.tblName} error:`, err);
            return null;
        }
    },
    delete1: async( id: number)=>{
        try {
            const sql = `DELETE FROM ${tblUsers.tblName1} WHERE id= ?`;
            const[rs] = await myConn.query(sql, [id]);
            return rs;
        } catch (err) {
            console.log(`delete ${id} from ${tblUsers.tblName1} error:`, err);
            return null;
        }
    },
    delete2: async( id: number)=>{
        try {
            const sql = `DELETE FROM ${tblUsers.tblName2} WHERE id= ?`;
            const[rs] = await myConn.query(sql, [id]);
            return rs;
        } catch (err) {
            console.log(`delete ${id} from ${tblUsers.tblName2} error:`, err);
            return null;
        }
    },
    update: async (oData: IUser) => {
        try{
            console.log('user update:', oData);

            /*let hashedPassword = oData.hashed_password;
            if (oData.password) {
            hashedPassword = await brcypt.hash(oData.password, 10);
            }*/
        
            const sql = `UPDATE ${tblUsers.tblName} SET name=?, password=?, phone=? WHERE email = ?`;
            const [rs] = await myConn.query<ResultSetHeader>(sql,[
                oData.name,
                //oData.status,
                oData.password,
                //hashedPassword,
                //oData.roles,
                oData.phone,
                //oData.id,
                oData.email,
            ]);
            console.log(`${rs.affectedRows} row(s) updated`);
            return rs.affectedRows;
        } catch (err) {
            console.log(err);
            return -1;
        }
    },
    update1: async (oData: IUser) => {
        try{
            console.log('user update:', oData);
      
            const sql = `UPDATE ${tblUsers.tblName} SET status=? WHERE email = ?`;
            const [rs] = await myConn.query<ResultSetHeader>(sql,[
                //oData.name,
                oData.status,
                //oData.password,
                //hashedPassword,
                //oData.roles,
                //oData.phone,
                //oData.id,
                oData.email
            ]);
            console.log(`${rs.affectedRows} row(s) updated`);
            return rs.affectedRows;
        } catch (err) {
            console.log(err);
            return -1;
        }
    },
    update2: async (oData: IUser) => {
        try{
            console.log('user update:', oData);
      
            const sql = `UPDATE ${tblUsers.tblName} SET name = ?, password = ?, phone = ?, activation_secret = ? WHERE email = ?`;
            const [rs] = await myConn.query<ResultSetHeader>(sql,[
                oData.name,
                //oData.status,
                oData.password,
                //hashedPassword,
                //oData.roles,
                oData.phone,
                //oData.id,
                oData.activation_secret,
                oData.email
            ]);
            console.log(`${rs.affectedRows} row(s) updated`);
            return rs.affectedRows;
        } catch (err) {
            console.log(err);
            return -1;
        }
    },
    update3: async (time: string,email:string) => {
        try{
            console.log('user update:', time);
      
            const sql = `UPDATE ${tblUsers.tblName} SET time = ? WHERE email = ?`;
            const [rs] = await myConn.query<ResultSetHeader>(sql,[time,email]);
            console.log(`${rs.affectedRows} row(s) updated`);
            return rs.affectedRows;
        } catch (err) {
            console.log(err);
            return -1;
        }
    },
    update4: async (count: string,id:number) => {
        try{
            console.log('user update:', count);
      
            const sql = `UPDATE ${tblUsers.tblName2} SET count = ? WHERE id = ?`;
            const [rs] = await myConn.query<ResultSetHeader>(sql,[count,id]);
            console.log(`${rs.affectedRows} row(s) updated`);
            return rs.affectedRows;
        } catch (err) {
            console.log(err);
            return -1;
        }
    },
    updatefood: async (name: string,price:string,class1:string,id:number) => {
        try{
            console.log('user update:', name,price);
      
            const sql = `UPDATE ${tblUsers.tblName1} SET name = ?, price = ?, class = ? WHERE id = ?`;
            const [rs] = await myConn.query<ResultSetHeader>(sql,[name,price,class1,id]);
            console.log(`${rs.affectedRows} row(s) updated`);
            return rs.affectedRows;
        } catch (err) {
            console.log(err);
            return -1;
        }
    },
    
    /*update1: async (oData: IUser) => {
        try{
            console.log('user update:', oData);
            const sql = `UPDATE ${tblUsers.tblName} SET name=?, email=?, status=?, password=?, hashed_password=?, roles=? WHERE id = ?`;
            const [rs] = await myConn.query<ResultSetHeader>(sql,[
                oData.name,
                oData.email,
                oData.status,
                oData.password,
                oData.hashed_password,
                oData.roles,
                oData.id,
            ]);
            console.log(`${rs.affectedRows} row(s) updated`);
            return rs.affectedRows;
        } catch (err) {
            console.log(err);
            return -1;
        }
    },
    activation: async (email: string, code: string) => {
        try{
            console.log(`activation of ${email} with secret: ${activation_secret}`)
            const user = await tblUsers.getByEmail(email);
            const activation_secret = user ?.activation_secret;
            const status = user?.status;
            if ( status=='active'){
                console.log(`user ${email} is already activated.`);
                return -1;
            }
            if ( activation_secret != code){
                console.log(`activation of ${email} failed.`);
                return -2;
            }
            console.log(`activation of ${email} success.`)

            const sql = `UPDATE ${tblUsers.tblName} SET status='active' WHERE email = ?`;
            const [rs] = await myConn.query<ResultSetHeader>(sql,[email,]);
            return rs.affectedRows;
        } catch (err) {
            console.log(`activation ${email} error:`,err);
            return -3;
        }
    },*/
    forgetPassword: async (password:string, email: string) => {
        try{
            const user = await tblUsers.getByEmail(email);
            if (!user){
                console.log(`user ${email} not found.`);
                return -1;
            }
            if ( user.status != "active"){
                console.log(`user ${email} is not active.`);
                return -2;
            }
            console.log(`activation of ${email} success.`)

        } catch (err) {
            console.log(`activation ${email} error:`,err);
            return -3;
        }
    },
};

export default tblUsers;