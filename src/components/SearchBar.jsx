import React, { useState } from 'react'
import { getNameClients, get_ventas_id, get_clients_id } from '../reducer/actions'
import { useDispatch, useSelector } from 'react-redux'

export default function SearchBar () {
  const dispatch = useDispatch()
  const cliBusc = useSelector((state) => state.ventaBusc)
  const ventaBusc = useSelector((state) => state.ventaBusc)
  ventaBusc ? console.log(ventaBusc.name) : console.log('no hay')

  const [busc, setBusc] = useState({
    buscado: ''
  })

  function handleInput (e) {
    e.preventDefault()
    setBusc({
      buscado: e.target.value
    })
  }

  function hableSubmit (e) {
    // buscar un cliente por name
    // e.preventDefault();
    // dispatch(getNameClients(busc.buscado));
    // setBusc({buscado:""})

    // buscar un venta por id
    e.preventDefault()
    dispatch(get_clients_id(busc.buscado))
    setBusc({ buscado: '' })
    console.log(cliBusc)
  }

  return (
    <>
      <input
        typ='text'
        placeholder='Buscar...'
        onChange={(e) => handleInput(e)}
      />
      <button type='submit' onClick={(e) => hableSubmit(e)}>Buscar</button>
    </>
  )
}
