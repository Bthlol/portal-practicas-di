// Dueño: Benjamín (M2). Esqueleto del Commit 0.
import React from 'react'
import { Link } from 'react-router-dom'

import ofertas from '../data/ofertas.json'
import { usePostulaciones } from '../state/postulaciones'
import { formatFecha } from '../utils/format'

export const PostulacionesPage = () => {
  const { postulaciones } = usePostulaciones()

  if (postulaciones.length === 0) {
    return (
      <div className='layout__vacio'>
        <p>Aún no has postulado a ninguna práctica.</p>
        <Link className='boton' to='/ofertas'>Ver ofertas</Link>
      </div>
    )
  }

  return (
    <div className='postulaciones'>
      <h1>Mis postulaciones</h1>
      <ul>
        {postulaciones.map((p) => {
          const oferta = ofertas.find((o) => o.id === p.ofertaId)
          return (
            <li key={p.ofertaId}>
              <Link to={`/ofertas/${p.ofertaId}`}>{oferta ? oferta.titulo : p.ofertaId}</Link>
              {' · '}{formatFecha(p.fecha)} · {p.estado}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default PostulacionesPage
