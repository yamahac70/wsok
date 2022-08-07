const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,{cors:true});
const port = process.env.PORT || 4000;
app.use(cors({
  origin: '*'
}))
//io.set('origins', '*:*');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
  
 /*  io.on('connection', (socket) => {
    let nombre="";
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
      io.emit('chat message', 'Hello World');
    });
    socket.on("bienvenido",(socket)=>{
      socket.emit("bienvenido", "bienvenido");
    })
   // socket.emit("bienvenido", "bienvenido");
    socket.on("conectado",(nom)=>{
      nombre=nom;
      socket.emit("mensajes",{
        nombre:nombre,
        mensaje:`${nombre} entro al chat`
      })
    })
    socket.on("mensaje", (nombre, mensaje) => {
      //io.emit manda el mensaje a todos los clientes conectados al chat
      io.emit("mensajes", { nombre, mensaje });
      console.log(nombre, mensaje);
    });

    socket.on("disconnect", () => {
      io.emit("mensajes", {
        servidor: "Servidor",
        mensaje: `${nombre} ha abandonado la sala`,
      });
    });
  }); */
//Funcionalidad de socket.io en el servidor
io.on("connection", (socket) => {
  let nombre;

  socket.on("conectado", (nomb) => {
    nombre = nomb;
    //socket.broadcast.emit manda el mensaje a todos los clientes excepto al que ha enviado el mensaje
    socket.broadcast.emit("mensajes", {
      nombre: nombre,
      mensaje: `${nombre} ha entrado en la sala del chat`,
    });
  });

  socket.on("mensaje", (nombre, mensaje) => {
    //io.emit manda el mensaje a todos los clientes conectados al chat
    io.emit("mensajes", { nombre, mensaje });
  });

  socket.on("disconnect", () => {
    io.emit("mensajes", {
      servidor: "Servidor",
      mensaje: `${nombre} ha abandonado la sala`,
    });
  });
});

  server.listen(port, () => {
    console.log('listening on *:3000');
  });