import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Chat from './components/Chat'

function App() {
const [registro, setRegistro] = useState(false)
const [nombre, setNombre] = useState('')

const registroSubmit=(e)=>{
  e.preventDefault()
  setNombre(e.target.nombre.value)
  setRegistro(true)
}


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

      {!registro && (
        <form onSubmit={registroSubmit}>
        <input type="text" name="nombre" />
        <button type="submit">Registrar</button>
      </form>

      )}
      {registro && <Chat nombre={nombre}/> }
      
      
    </div>
  )
}

export default App
