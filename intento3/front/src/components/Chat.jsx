import React,{useState,useEffect} from 'react'
import socket from './Socket'
import './Chat.css'

function Chat({nombre}) {
const [mensajes, setMensajes] = useState([])
const [mensaje, setMensaje] = useState('')

useEffect(() => {
    socket.emit('conectado', nombre)
    socket.on('mensajes', (msgTotal) => {
        setMensajes(msgTotal)
    })

}, [mensaje])
useEffect(() => {
    socket.on("mensaje",(msg)=>{
        setMensajes([...mensajes,msg])
    })
    return () => {
        socket.off();
    }
}, [mensajes])
        const tipoMensaje=(tipo,user)=>{
            return tipo==="mensaje"?user===nombre?"enviante":"recibido":"conexion"
        }
        const enviarMensaje=(e)=>{
            e.preventDefault();
            socket.emit("mensaje",{nombre,mensaje:e.target.mensaje.value})
            e.target.reset()
        }
  return (
    <div className='chat'>
        <div className="data">
            {mensajes.map((msg,i)=>{
                return (<span key={i} className={tipoMensaje(msg.tipo,msg.nombre)}><h4>{msg.nombre}</h4> <h3>{msg.mensaje}</h3></span>)
            })}
        </div>
        <form onSubmit={enviarMensaje}>
                <input type="text" placeholder='Mensaje' name='mensaje' />
                <button type="submit">Enviar</button>
        </form>
    </div>
  )
}

export default Chat