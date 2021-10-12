import { useEffect, useState } from "react";
import io from "socket.io-client";
import BandAdd from "./components/BandAdd";
import BandList from "./components/BandList";

const connectSocketServer = () => {
  const socket = io.connect('http://localhost:8080', {
    transports: ['websocket']
  });
  return socket;
}

function App() {

  const [online, setonline] = useState(false)
  const [socket, setsocket] = useState(connectSocketServer)
  const [bands, setbands] = useState([])

  useEffect(() => {
    console.log(socket?.connected, socket)
    setonline(socket?.connected)
    return () => {

    }
  }, [socket])

  useEffect(() => {
    socket.on('connect', () => {
      setonline(true)
    })
    return () => {
      // socket.disconnect()
    }
  }, [socket])

  useEffect(() => {
    socket.on('disconnect', () => {
      setonline(false)
    })
    return () => {

    }
  }, [socket])

  useEffect(() => {
    socket.on('current-bands', (data) => {
      // console.log(data)
      setbands(data)
    })
    return () => {

    }
  }, [socket])

  const votar = (id) => {
    // console.log('votar app', id)
    socket.emit('votar-banda', { id })
  }

  const borrar = (id) => {
    // console.log('borrar banda', id)
    socket.emit('borrar-banda', { id })
  }

  const cambiarNombre = (id, newName) => {
    // console.log('cambiar', id, newName)
    socket.emit('cambiar-nombre-banda', { id, newName })
  }

  const crearBanda = (nombre) => {
    console.log(nombre)
    socket.emit('crear-banda', { nombre })
  }

  return (
    <div className="container">
      <div className='alert'>
        <p className='mr-2'>
          Service status:
          {
            !!online ? (
              <span className='text-success'>Online</span>
            ) : (
              <span className='text-danger'>Offline</span>
            )
          }
        </p>
      </div>

      <p>BandNames</p>
      <hr />
      <div className='row'>
        <div className='col-8'>
          <BandList data={bands} votar={votar} borrar={borrar} cambiarNombre={cambiarNombre} />
        </div>
        <div className='col-4'>
          <BandAdd crearBanda={crearBanda} />
        </div>
      </div>

    </div>
  );
}

export default App;
