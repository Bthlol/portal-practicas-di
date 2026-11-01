// Dueño: Seba (M1). Tarjeta de una oferta en el listado.
// Muestra lo mínimo para decidir si vale la pena abrir la oferta (hallazgo B de
// las entrevistas): área, tecnologías, modalidad, remuneración y vigencia.
// Toda la tarjeta es un solo enlace a la ficha; nada dentro parece un botón aparte.
import React from 'react'
import { Link } from 'react-router-dom'

import { diasParaCierre, formatFecha, textoCierre, textoRemuneracion } from '../utils/format'

const DIAS_CIERRE_PRONTO = 3
const MAX_TECNOLOGIAS = 3

const claseCierre = (dias) => {
  if (dias < 0) return 'oferta-card__cierre oferta-card__cierre--cerrada'
  if (dias <= DIAS_CIERRE_PRONTO) return 'oferta-card__cierre oferta-card__cierre--pronto'
  return 'oferta-card__cierre'
}

export const OfertaCard = ({ oferta, empresa }) => {
  const dias = diasParaCierre(oferta.fechaCierre)
  const sinRemuneracion = oferta.remuneracion === null || oferta.remuneracion === undefined
  const tecnologias = oferta.tecnologias || []
  const visibles = tecnologias.slice(0, MAX_TECNOLOGIAS)
  const ocultas = tecnologias.length - visibles.length

  return (
    <Link
      className={`oferta-card${dias < 0 ? ' oferta-card--cerrada' : ''}`}
      to={`/ofertas/${oferta.id}`}
    >
      <div className='oferta-card__encabezado'>
        <div>
          <p className='oferta-card__empresa'>
            {empresa ? empresa.nombre : 'Empresa no informada'}
          </p>
          <h2 className='oferta-card__titulo'>{oferta.titulo}</h2>
        </div>
        <p className={claseCierre(dias)}>
          <strong>{textoCierre(oferta.fechaCierre)}</strong>
          <span>{formatFecha(oferta.fechaCierre)}</span>
        </p>
      </div>

      <div className='oferta-card__areas'>
        {(oferta.areas || []).map((area) => (
          <span key={area} className='etiqueta'>{area}</span>
        ))}
      </div>

      {visibles.length > 0 && (
        <p className='oferta-card__tecnologias'>
          {visibles.join(' · ')}
          {ocultas > 0 && <span className='oferta-card__mas'> +{ocultas}</span>}
        </p>
      )}

      <ul className='oferta-card__datos'>
        <li>{oferta.modalidad} · {oferta.ubicacion}</li>
        <li>Práctica {oferta.tipoPractica.toLowerCase()}</li>
        <li className={sinRemuneracion ? 'oferta-card__sin-monto' : ''}>
          {textoRemuneracion(oferta.remuneracion)}
        </li>
      </ul>
    </Link>
  )
}

export default OfertaCard
