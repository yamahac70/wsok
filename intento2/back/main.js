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
app.use(cors({origin:"*"}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const datos={
    contador:0,
}
io.on('connection',(sk)=>{
    sk.on("coneccion",(nombre)=>{})
    sk.on("contador",(num)=>{
        datos.contador=num;
        //con io emitimos a todos
        io.emit("contador",datos.contador);
        console.log(num)
    })
})




server.listen(4000,()=>{
    console.log("servidor corriendo en el puerto 4000");
})