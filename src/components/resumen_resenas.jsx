// Dueño: Manuel (M3). Se muestra dentro del detalle de la oferta.
// Esqueleto del Commit 0: reemplazar por promedio, N prácticas anteriores,
// % que coincidió con la oferta y una reseña destacada.
import React from 'react'
import { Link } from 'react-router-dom'

export const ResumenResenas = ({ empresaId }) => {
  return (
    <section className='resumen-resenas'>
      <h2 className='resumen-resenas__titulo'>Reseñas de compañeros</h2>
      <p>Reseñas (próximamente)</p>
      <Link to={`/empresas/${empresaId}/resenas`}>Ver todas las reseñas</Link>
    </section>
  )
}

export default ResumenResenas
