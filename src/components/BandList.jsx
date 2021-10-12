import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/SocketContext'

const BandList = () => {

    const [bands, setbands] = useState([]);

    const { socket } = useContext(SocketContext)

    useEffect(() => {
        socket.on('current-bands', (data) => {
          // console.log(data)
          setbands(data);
        });
        return () => {
            socket.off('current-bands');
        }
      }, [socket])

 

    const cambioNombre = (event, id) => {
     //   console.log(event.target.value, id)
        const newName = event.target.value;
        setbands( bands => bands.map(item => {
            if (item.id === id) {
            item.name = newName
         }
            return item
        }))
    }

    const onPerdioFoco = (id, newName) => {
      //  console.log(id, nombre)
      socket.emit('cambiar-nombre-banda', { id, newName })
    }

    const borrar = (id) => {
        // console.log('borrar banda', id)
        socket.emit('borrar-banda', { id })
    }

    const votar = (id) => {
        // console.log('votar app', id)
        socket.emit('votar-banda', { id })
    }

    const createRows = () => {
       
        return (
            bands.map( item => {
             return ( 
                 <tr key={item?.id}>
                    <td>
                        <button 
                            className='btn btn-primary'
                            onClick={() => votar(item?.id) }
                        >
                                +1
                        </button>
                    </td>
                    <td>
                        <input 
                            className='form-control'
                            type="text" 
                            value={item?.name}
                            onChange={(event)=> cambioNombre(event, item?.id)}
                            onBlur={() => onPerdioFoco(item?.id, item?.name)}
                        />
                    </td>
                    <td>
                        <h3> {item?.votes} </h3>
                    </td>
                    <td>
                        <button 
                            className='btn btn-danger'
                            onClick={()=> borrar(item?.id)}
                        >
                            Borrar
                        </button>
                    </td>
                 </tr>
             )
            })  
        )
    }
    return (
        <>
     
            <table className='table table-stripped'>
                <thead>
                    <tr>
                        <th>Acciones</th>
                        <th>Nombre</th>
                        <th>Votos</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {createRows()}
                </tbody>
            </table>
        </>
    )
}

export default BandList
