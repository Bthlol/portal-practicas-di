// Dueño: Benjamín (M2). Esqueleto del Commit 0.
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import ofertas from '../data/ofertas.json'
import { usePostulaciones } from '../state/postulaciones'

export const PostularPage = () => {
  const { id } = useParams()
  const oferta = ofertas.find((o) => o.id === id)
  const { postular } = usePostulaciones()
  const [enviada, setEnviada] = useState(false)

  if (!oferta) {
    return <Link to='/ofertas'>Volver a Ofertas</Link>
  }

  if (enviada) {
    return (
      <div className='postular'>
        <h1>Postulación enviada</h1>
        <Link className='boton' to='/postulaciones'>Ver mis postulaciones</Link>
      </div>
    )
  }

  return (
    <div className='postular'>
      <Link to={`/ofertas/${oferta.id}`}>← Volver a la oferta</Link>
      <h1>Postular a {oferta.titulo}</h1>
      <button
        className='boton boton--primario'
        onClick={() => { postular(oferta.id); setEnviada(true) }}
      >
        Enviar postulación
      </button>
    </div>
  )
}

export default PostularPage
