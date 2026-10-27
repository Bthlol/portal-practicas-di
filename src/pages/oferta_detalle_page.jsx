// Dueño: Benjamín (M2). Esqueleto del Commit 0.
import React from 'react'
import { Link, useParams } from 'react-router-dom'

import ofertas from '../data/ofertas.json'
import empresas from '../data/empresas.json'
import ResumenResenas from '../components/resumen_resenas'
import { formatCLP, textoCierre } from '../utils/format'

export const OfertaDetallePage = () => {
  const { id } = useParams()
  const oferta = ofertas.find((o) => o.id === id)

  if (!oferta) {
    return (
      <div className='layout__vacio'>
        <p>Esta oferta no existe o fue retirada.</p>
        <Link className='boton' to='/ofertas'>Volver a Ofertas</Link>
      </div>
    )
  }

  const empresa = empresas.find((e) => e.id === oferta.empresaId)

  return (
    <div className='oferta-detalle'>
      <Link to='/ofertas'>← Volver a Ofertas</Link>
      <p>{empresa ? empresa.nombre : ''}</p>
      <h1>{oferta.titulo}</h1>
      <p>{formatCLP(oferta.remuneracion)} · {textoCierre(oferta.fechaCierre)}</p>
      <p>{oferta.descripcion}</p>
      <ResumenResenas empresaId={oferta.empresaId} />
      <Link className='boton boton--primario' to={`/ofertas/${oferta.id}/postular`}>Postular</Link>
    </div>
  )
}

export default OfertaDetallePage
