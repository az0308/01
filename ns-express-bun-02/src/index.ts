import express from "express";
import type {Request, Response, NextFunction} from "express";

const app = express();
const PORT = process.env.PORT || 3000;

import{createServer} from 'node:http';
const httpServer = createServer(app);

httpServer.listen(PORT,()=>{
    console.log(`Listening on port http://localhost:${PORT}`);
});

import cors from "cors";
app.use(
    cors({
        origin: "*",
    })
);

import { Server as IoServer } from 'socket.io';
const io = new IoServer(httpServer,{
    cors: {
        origin: "*",
    },
});

io.on("connection",(socket)=>{
    console.log("a user connected",socket.id);
    socket.on("disconnect", () => {
        console.log("user disconnect",socket.id);
    });
    socket.on('event_user', (data)=>{
        console.log('Received event_user from :', socket.id ,data);
        io.emit('event_user', data);

        socket.broadcast.emit('event_user', data);
    })
});

import addTime from "./middleware/time";
app.use(addTime);

import logger from "./middleware/log";
app.use(logger);

import path from "node:path";
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

import {router as sampleRouter} from "./routers/sample";
app.use("/api/sample", sampleRouter);

import { router as jsonDBRouter } from "./routers/jsonDB";
app.use("/api/jsonDB",jsonDBRouter);

import { router as usersRouter } from "./routers/users";
import { Socket } from "node:dgram";
app.use("/api/users",usersRouter);

app.get("/api",(req,res)=>{
    res.send("I am root api");
});

