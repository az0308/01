import {Router} from "express";
import type {Request, Response, NextFunction,ParamsDictionary} from "express-serve-static-core";
import { timeStamp } from "node:console";

export const router = Router();

router.get("/:id", (req: Request, res: Response) => {
        const output = {
            headers: req.headers,
            method: req.method,
            url: req.url,
            fullUrl: req.originalUrl,
            params: req.params,
            query: req.query,
            timeStamp: req.timestamp
        };
        res.status(202).header('X-Custom-Header', 'sample-Api-GET').json
        (output);
        res.send("next output"); //此指令無效
});

router.post("/:id", (req: Request, res: Response) => {
    const output = {
        headers: req.headers,
        method: req.method,
        url: req.url,
        fullUrl: req.originalUrl,
        params: req.params,
        query: req.query,
        body: req.body,
        timeStamp: req.timestamp
    };
    res.status(202).header('X-Custom-Header', 'sample-Api-GET').json
    (output);
    res.send("next output");
});