import React, { useContext, useState } from 'react'
import { SocketContext } from '../context/SocketContext';
;

const BandAdd = () => {

    const { socket } = useContext(SocketContext)

    const [valor, setvalor] = useState('');

    const crearBanda = (nombre) => {
       // console.log(nombre)
        socket.emit('crear-banda', { nombre })
      }
    

    const onsubmit = (ev) =>{
        ev.preventDefault()
       // console.log(valor)
       if (valor.trim().length > 0) {
        crearBanda(valor.trim())
        setvalor('')   
       }
    };

    return (
        <>
            <h3>Agregar Banda</h3>
            <form onSubmit={onsubmit}>
                <input 
                    className='form-control'
                    type="text"  
                    placeholder='Nuevo nombre de banda'
                    value={valor}
                    onChange={ (e)=> setvalor(e.target.value)  }
                />
            </form>
        </>
    )
}

export default BandAdd
