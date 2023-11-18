const { prototype } = require("events");
const express = require("express");
const cors = require('cors');
const http = require('http');
const jwt = require("jsonwebtoken");

const {_PORT, _FRONTEND_HOST} = require('./appConfig');
const routes_io = require("./routers/routes_io.js");
const routes = require('./routers/routes.js');

const PORT = process.env.PORT || _PORT;
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true
    }
  });;

const now = new Date();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use(routes);
routes_io(io);

const start = ()=>{
    try{
        server.listen(PORT, ()=>{
            console.log("Server started on "+ PORT + " port, time: " + now.getMinutes() + " : "+ now.getSeconds());

        });
    }
    catch(e){
        console.log(e);
    }
}

start();