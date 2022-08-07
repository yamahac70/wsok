import { useState,useEffect,useRef } from 'react'
import reactLogo from './assets/react.svg'
import socket from './components/Soket'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
 /*  useEffect(() => {
    socket.emit('contador', count)
    
  }, [count]) */
  useEffect(() => {
    socket.on("contador", (mensaje) => {
     console.log(mensaje)
      setCount(mensaje);
    });

    return () => {
      socket.off();
    };
  }, [count]);
  const divRef=useRef(null)
  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() =>{ 
          
          setCount((count) => count + 1)
          socket.emit('contador', count+1)
          
          
          }}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
