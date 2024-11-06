type APIError = {
    error: boolean,
    message: string
};
type APIResponse = {
    error: false,
}

import express from "express";
import EventEmitter from "events";
import {Server} from "ws";
import {json} from "body-parser";
const host = express();
const webSocketServer = new Server({
    port: 3001
});
const changeEvent = new EventEmitter();
let message:string = "Hello World!";

host.listen("3000", () => {
    console.log("System started on port 3000!")
});

host.use(json());
host.use((request, response) => {
    const url = decodeURI(request.originalUrl);
    if(url === "/api/set/") {
        if(request.body.message === null || request.body.message === "") {
            response.status(500);
            response.send({"error":true, "message":"Invalid message provided."} satisfies APIError);
            return;
        };
        message = request.body.message;
        changeEvent.emit("fire");
        response.send({"error":false} satisfies APIResponse);
        return;
    };
    response.status(500);
    response.send({"error":true, "message":"The requested API endpoint does not exist."} satisfies APIError);
});

webSocketServer.on("connection", (socket) => {
    socket.send(JSON.stringify(message));
    changeEvent.on("fire", () => {
        socket.send(JSON.stringify(message));
    });
});