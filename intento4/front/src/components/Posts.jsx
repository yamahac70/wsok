import React,{useEffect,useState} from 'react'
import socket from './Socket'

function Posts() {
    const [posts,setPosts] = useState([])
    useEffect(()=>{
        socket.emit('conexion')
        socket.on("rellenoPost",(pst)=>{
            setPosts(pst)
        })
    },[])
    useEffect(()=>{
        socket.on('post',(data)=>{
            setPosts([...posts,data])
            console.log(posts)
        })
        return ()=>{
            socket.off()
        }
    },[posts])
    const smit=(e)=>{
        e.preventDefault();
        const frm=Object.fromEntries(new FormData(e.target))
        socket.emit('post',frm)
        e.target.reset()
    }
    return (
    <div>
        <form onSubmit={smit}>
            <input type="text" name="titulo" placeholder="titulo" />
            <input type="text" placeholder="Escribe un post" name="post"/>
            <button type="submit">Enviar</button>
        </form>
        <div className="posts">
            {posts.map((post,index)=>{
                return <p key={index}>{post.post}</p>
            })}
        </div>
    </div>
  )
}

export default Posts