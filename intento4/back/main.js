const express=require("express")
const app=express()
const bodyParser=require("body-parser")
const cors=require("cors")
const http=require("http")
const server=http.createServer(app)
const port = process.env.PORT || 4000
const {Server}=require("socket.io")
const io=new Server(server,{cors:{
    origin:"*"
}})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors({origin:"*"}))
let historial_conecciones=[]
let mensajes=[]
let post=[]


io.on('connection',(sk)=>{
   sk.on("post",(data)=>{
         post.push(data)
         io.emit("post",data)
         console.log(post)
   })
   sk.on("conexion",()=>{
        sk.emit("rellenoPost",post)

   })
   
   console.log(sk.id)
})
app.get("/api/post")
app.get("/limpiar",(req,res)=>{
    mensajes=[]
})
app.get("/msg",(req,res)=>{
    res.json(mensajes)
})
server.listen(4000,()=>{
    console.log("servidor corriendo en el puerto "+port)
})