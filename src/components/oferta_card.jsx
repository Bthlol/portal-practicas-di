// Dueño: Seba (M1). Esqueleto del Commit 0: reemplazar por la tarjeta completa
// (etiquetas de área y tecnología, modalidad, remuneración y fecha de cierre).
import React from 'react'
import { Link } from 'react-router-dom'

import { formatCLP, textoCierre } from '../utils/format'

export const OfertaCard = ({ oferta, empresa }) => {
  return (
    <Link className='oferta-card' to={`/ofertas/${oferta.id}`}>
      <p className='oferta-card__empresa'>{empresa ? empresa.nombre : ''}</p>
      <h3 className='oferta-card__titulo'>{oferta.titulo}</h3>
      <p className='oferta-card__meta'>
        {formatCLP(oferta.remuneracion)} · {textoCierre(oferta.fechaCierre)}
      </p>
    </Link>
  )
}

export default OfertaCard
