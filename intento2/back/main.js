const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');
const http=require('http');
const server=http.createServer(app);
const {Server}=require("socket.io");
const io=new Server(server,{cors:{
    origin:'*'
}});