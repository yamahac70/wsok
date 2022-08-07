const express=require("express")
const app=express()
const bodyParser=require("body-parser")
const cors=require("cors")
const http=require("http")
const server=http.createServer(app)
const {Server}=require("socket.io")
const io=new Server(server,{cors:{
    origin:"*"
}})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors({origin:"*"}))
let historial_conecciones=[]
let mensajes=[]



io.on('connection',(sk)=>{
    sk.on("conectado",(nombre)=>{
        //io.emit("mensaje",{nombre,hora:new Date().getHours})
        historial_conecciones.push({nombre,hora:new Date().getHours()})
        mensajes=[...mensajes,{nombre,hora:new Date().getHours(),mensaje:"conectado"}]
        io.emit("mensajes",mensajes)
        io.emit("mensaje",{nombre,hora:new Date().getHours(),mensaje:"conectado",tipo:"conexion"})
    })
    sk.on("mensaje",(data)=>{
        data.tipo="mensaje"
        mensajes=[...mensajes,data]
        io.emit("mensaje",data)
    })

})

app.get("/limpiar",(req,res)=>{
    mensajes=[]
})
app.get("/msg",(req,res)=>{
    res.json(mensajes)
})
server.listen(4000,()=>{
    console.log("servidor corriendo en el puerto 4000")
})