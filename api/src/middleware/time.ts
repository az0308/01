import type {Request, Response, NextFunction} from "express";
import nsUtil from "../nsUtil/nsUtil";

const addTime = (req: Request, res: Response, next: NextFunction) =>{
    const nowStr = nsUtil.taipeiTimeString(new Date());

    req.timestamp = nowStr;
    res.header("Request-Time", nowStr);
    
    next();
};

export default addTime;