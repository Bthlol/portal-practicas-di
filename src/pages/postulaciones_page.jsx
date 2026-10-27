// Dueño: Benjamín (M2). Reemplaza la revisión manual diaria del portal y la
// planilla propia que describieron los entrevistados: el estado de cada
// postulación queda visible en un solo lugar.
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import ofertas from '../data/ofertas.json'
import empresas from '../data/empresas.json'
import { usePostulaciones } from '../state/postulaciones'
import { formatFecha, textoCierre, textoRemuneracion } from '../utils/format'

const FilaPostulacion = ({ postulacion, onRetirar }) => {
  const [confirmando, setConfirmando] = useState(false)
  const oferta = ofertas.find((o) => o.id === postulacion.ofertaId)
  const empresa = oferta ? empresas.find((e) => e.id === oferta.empresaId) : null

  return (
    <li className='postulaciones__item'>
      <div className='postulaciones__info'>
        <p className='postulaciones__empresa'>{empresa ? empresa.nombre : ''}</p>
        <p className='postulaciones__titulo'>
          {oferta ? oferta.titulo : 'Oferta retirada del portal'}
        </p>
        <p className='postulaciones__datos'>
          Postulaste el {formatFecha(postulacion.fecha)}
          {oferta ? ` · ${textoRemuneracion(oferta.remuneracion)} · ${textoCierre(oferta.fechaCierre)}` : ''}
        </p>
      </div>

      <span className='postulaciones__estado'>{postulacion.estado}</span>

      <div className='postulaciones__acciones'>
        {confirmando
          ? (
            <>
              <span className='postulaciones__pregunta'>¿Retirar esta postulación?</span>
              <button className='boton boton--peligro' onClick={() => onRetirar(postulacion.ofertaId)}>
                Sí, retirar
              </button>
              <button className='boton' onClick={() => setConfirmando(false)}>No</button>
            </>
            )
          : (
            <>
              {oferta && <Link className='boton' to={`/ofertas/${oferta.id}`}>Ver oferta</Link>}
              <button className='boton boton--texto' onClick={() => setConfirmando(true)}>
                Retirar
              </button>
            </>
            )}
      </div>
    </li>
  )
}

export const PostulacionesPage = () => {
  const { postulaciones, retirar } = usePostulaciones()
  const [aviso, setAviso] = useState('')

  const manejarRetiro = (ofertaId) => {
    const oferta = ofertas.find((o) => o.id === ofertaId)
    retirar(ofertaId)
    setAviso(`Retiraste tu postulación${oferta ? ` a «${oferta.titulo}»` : ''}.`)
  }

  // Más recientes primero.
  const ordenadas = [...postulaciones].sort((a, b) => b.fecha.localeCompare(a.fecha))

  return (
    <div className='postulaciones'>
      <h1>Mis postulaciones</h1>

      {aviso && (
        <p className='postulaciones__aviso' role='status'>
          {aviso}
          <button className='boton boton--texto' onClick={() => setAviso('')}>Cerrar</button>
        </p>
      )}

      {ordenadas.length === 0
        ? (
          <div className='layout__vacio'>
            <p>Aún no has postulado a ninguna práctica.</p>
            <Link className='boton boton--primario' to='/ofertas'>Ver ofertas</Link>
          </div>
          )
        : (
          <>
            <p className='postulaciones__resumen'>
              {ordenadas.length === 1
                ? 'Tienes 1 postulación activa.'
                : `Tienes ${ordenadas.length} postulaciones activas.`}
            </p>
            <ul className='postulaciones__lista'>
              {ordenadas.map((p) => (
                <FilaPostulacion key={p.ofertaId} postulacion={p} onRetirar={manejarRetiro} />
              ))}
            </ul>
          </>
          )}
    </div>
  )
}

export default PostulacionesPage
