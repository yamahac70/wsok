import React,{ useState,useEffect } from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Chat from "./components/Chat";
function App() {
  const [nombre, setNombre] = useState("");
  const [registrado, setRegistrado] = useState(false);

  const registrar = (e) => {
    e.preventDefault();
    if (nombre !== "") {
      setRegistrado(true);
    }
  };
  return (
    <div className="App">
     {!registrado && (
        <form onSubmit={registrar}>
          <label htmlFor="">Introduzca su nombre</label>
          <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
          <button>Ir al chat</button>
        </form>
      )}

      {registrado && <Chat nombre={nombre} />}
    </div>
  )
}

export default App
