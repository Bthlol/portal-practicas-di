// Dueño: Manuel (M3). Esqueleto del Commit 0: agregar resumen, filtro por área,
// orden y el detalle de cada reseña.
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import empresas from '../data/empresas.json'
import resenas from '../data/resenas.json'

export const ResenasPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const empresa = empresas.find((e) => e.id === id)
  const deEmpresa = resenas.filter((r) => r.empresaId === id)

  return (
    <div className='resenas'>
      <button className='boton' onClick={() => navigate(-1)}>← Volver a la oferta</button>
      <h1>Reseñas de {empresa ? empresa.nombre : 'la empresa'}</h1>
      {deEmpresa.map((r) => (
        <p key={r.id}>{r.autor} · {r.periodo}: {r.texto}</p>
      ))}
    </div>
  )
}

export default ResenasPage
