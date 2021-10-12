import React, { useEffect, useState } from 'react'

const BandList = ({data, votar, borrar, cambiarNombre}) => {

    const [bands, setbands] = useState(data)

    useEffect(() => {
        console.log('data', data)
        setbands(data)
        return () => {
            
        }
    }, [data])

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

    const onPerdioFoco = (id, nombre) => {
      //  console.log(id, nombre)
        cambiarNombre(id, nombre)
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
