// Dueño: Manuel (M3). Página completa de reseñas de una empresa.
import React, { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import empresas from '../data/empresas.json'
import ResumenResenas, {
  Estrellas,
  masRecientes,
  mejorCalificadas,
  reseñasDeEmpresa
} from '../components/resumen_resenas.jsx'

export const ResenasPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [area, setArea] = useState('todas')
  const [orden, setOrden] = useState('recientes')

  const empresa = empresas.find((e) => e.id === id)
  const deEmpresa = useMemo(() => reseñasDeEmpresa(id), [id])
  const areas = [...new Set(deEmpresa.map((r) => r.area))]

  const visibles = deEmpresa
    .filter((r) => area === 'todas' || r.area === area)
    .sort(orden === 'recientes' ? masRecientes : mejorCalificadas)

  const limpiar = () => {
    setArea('todas')
    setOrden('recientes')
  }

  return (
    <div className='resenas'>
      <button className='boton boton--texto' onClick={() => navigate(-1)}>
        ← Volver a la oferta
      </button>

      {!empresa ? (
        <p className='resenas__vacio'>No encontramos esta empresa.</p>
      ) : (
        <>
          <header className='resenas__encabezado'>
            <h1 className='resenas__titulo'>Reseñas de {empresa.nombre}</h1>
            <p className='resenas__subtitulo'>
              {empresa.rubro} · {empresa.ciudad}
            </p>
          </header>

          <ResumenResenas empresaId={id} enPagina />

          {deEmpresa.length > 0 && (
            <>
              <div className='resenas__controles'>
                <label className='resenas__control'>
                  Área de la práctica
                  <select value={area} onChange={(e) => setArea(e.target.value)}>
                    <option value='todas'>Todas</option>
                    {areas.map((a) => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                </label>
                <label className='resenas__control'>
                  Ordenar por
                  <select value={orden} onChange={(e) => setOrden(e.target.value)}>
                    <option value='recientes'>Más recientes</option>
                    <option value='calificacion'>Mejor calificadas</option>
                  </select>
                </label>
              </div>

              <p className='resenas__contador'>
                {visibles.length} {visibles.length === 1 ? 'reseña' : 'reseñas'}
              </p>

              {visibles.length === 0 ? (
                <div className='resenas__vacio'>
                  <p>Ninguna reseña coincide con el filtro.</p>
                  <button className='boton boton--primario' onClick={limpiar}>Limpiar filtros</button>
                </div>
              ) : (
                <ul className='resenas__lista'>
                  {visibles.map((r) => (
                    <li key={r.id} className='resena'>
                      <div className='resena__cabecera'>
                        <Estrellas valor={r.calificacion} />
                        <span className='etiqueta'>{r.area}</span>
                        {!r.coincidioConOferta && (
                          <span className='etiqueta etiqueta--alerta'>No coincidió con la oferta</span>
                        )}
                      </div>
                      <p className='resena__texto'>{r.texto}</p>
                      <p className='resena__autor'>{r.autor} · {r.periodo}</p>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}

export default ResenasPage