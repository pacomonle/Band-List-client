import React, { useState } from 'react'

const BandAdd = ({crearBanda}) => {

    const [valor, setvalor] = useState('');

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
                    placeholder='Nuevo nombre de banda'S
                    value={valor}
                    onChange={ (e)=> setvalor(e.target.value)  }
                />
            </form>
        </>
    )
}

export default BandAdd
