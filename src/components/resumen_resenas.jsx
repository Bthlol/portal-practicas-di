// Dueño: Manuel (M3). Se muestra dentro del detalle de la oferta y en la página de reseñas.
import React from 'react'
import { Link } from 'react-router-dom'

import resenas from '../data/resenas.json'

// "Verano 2026" -> número comparable (invierno es posterior a verano del mismo año)
const ordenPeriodo = (periodo) => {
  const anio = parseInt((periodo.match(/\d{4}/) || ['0'])[0], 10)
  return anio * 10 + (/invierno/i.test(periodo) ? 6 : 1)
}

export const masRecientes = (a, b) => ordenPeriodo(b.periodo) - ordenPeriodo(a.periodo)
export const mejorCalificadas = (a, b) => b.calificacion - a.calificacion || masRecientes(a, b)

export const reseñasDeEmpresa = (empresaId) => resenas.filter((r) => r.empresaId === empresaId)

export const formatPromedio = (n) => n.toFixed(1).replace('.', ',')

export const calcularResumen = (lista) => {
  const total = lista.length
  if (total === 0) return { total: 0 }
  const promedio = lista.reduce((suma, r) => suma + r.calificacion, 0) / total
  const coinciden = lista.filter((r) => r.coincidioConOferta).length
  const destacada = [...lista].sort(mejorCalificadas)[0]
  return { total, promedio, porcentajeCoincide: Math.round((coinciden / total) * 100), destacada }
}

export const Estrellas = ({ valor }) => (
  <span className='resenas-estrellas' role='img' aria-label={`${valor} de 5`}>
    {'★'.repeat(valor)}{'☆'.repeat(5 - valor)}
  </span>
)

// enPagina: en la página de reseñas se oculta la reseña destacada y el enlace.
export const ResumenResenas = ({ empresaId, enPagina = false }) => {
  const resumen = calcularResumen(reseñasDeEmpresa(empresaId))

  return (
    <section className='resumen-resenas'>
      {!enPagina && <h2 className='resumen-resenas__titulo'>Reseñas de compañeros</h2>}

      {resumen.total === 0 ? (
        <p className='resumen-resenas__vacio'>Aún no hay reseñas de esta empresa</p>
      ) : (
        <>
          <div className='resumen-resenas__cifras'>
            <div className='resumen-resenas__promedio'>
              <span className='resumen-resenas__nota'>{formatPromedio(resumen.promedio)}</span>
              <Estrellas valor={Math.round(resumen.promedio)} />
            </div>
            <p className='resumen-resenas__dato'>
              {resumen.total} {resumen.total === 1 ? 'práctica anterior' : 'prácticas anteriores'}
            </p>
            <p
              className={`resumen-resenas__dato ${resumen.porcentajeCoincide < 60 ? 'resumen-resenas__dato--alerta' : ''}`}
            >
              {resumen.porcentajeCoincide}% dice que la práctica coincidió con la oferta
            </p>
          </div>

          {!enPagina && (
            <blockquote className='resumen-resenas__destacada'>
              <p>“{resumen.destacada.texto}”</p>
              <footer>
                {resumen.destacada.autor} · {resumen.destacada.periodo}
              </footer>
            </blockquote>
          )}

          {!enPagina && (
            <Link className='resumen-resenas__enlace' to={`/empresas/${empresaId}/resenas`}>
              Ver todas las reseñas
            </Link>
          )}
        </>
      )}
    </section>
  )
}

export default ResumenResenas