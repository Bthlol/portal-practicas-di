// Dueño: Benjamín (M2: decidir si una oferta le conviene antes de postular).
// Hipótesis asociada: H2 (remuneración visible) y la vigencia visible que
// pidieron los entrevistados de la Parte 1.
import React from 'react'
import { Link, useParams } from 'react-router-dom'

import ofertas from '../data/ofertas.json'
import empresas from '../data/empresas.json'
import ResumenResenas from '../components/resumen_resenas'
import { usePostulaciones } from '../state/postulaciones'
import {
  formatCLP,
  formatFecha,
  diasParaCierre,
  estaCerrada,
  textoCierre
} from '../utils/format'

const DIAS_CIERRE_PRONTO = 3

const Dato = ({ etiqueta, children }) => (
  <div className='oferta-detalle__dato'>
    <dt className='oferta-detalle__dato-etiqueta'>{etiqueta}</dt>
    <dd className='oferta-detalle__dato-valor'>{children}</dd>
  </div>
)

const ListaSeccion = ({ titulo, items }) => {
  if (!items || items.length === 0) return null
  return (
    <section className='oferta-detalle__seccion'>
      <h2 className='oferta-detalle__subtitulo'>{titulo}</h2>
      <ul className='oferta-detalle__lista'>
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </section>
  )
}

// Panel con la acción principal. Cambia según el estado de la oferta.
const AccionPostular = ({ oferta }) => {
  const { obtener } = usePostulaciones()
  const previa = obtener(oferta.id)

  if (previa) {
    return (
      <div className='oferta-detalle__accion'>
        <p className='oferta-detalle__postulado'>
          ✓ Ya postulaste el {formatFecha(previa.fecha)}
        </p>
        <Link className='boton boton--bloque' to='/postulaciones'>Ver mis postulaciones</Link>
      </div>
    )
  }

  if (estaCerrada(oferta.fechaCierre)) {
    return (
      <div className='oferta-detalle__accion'>
        <button className='boton boton--bloque' disabled>Postulaciones cerradas</button>
        <p className='oferta-detalle__nota'>
          Esta oferta cerró el {formatFecha(oferta.fechaCierre)} y ya no recibe postulaciones.
        </p>
        <Link to='/ofertas'>Ver otras ofertas</Link>
      </div>
    )
  }

  return (
    <div className='oferta-detalle__accion'>
      <Link className='boton boton--primario boton--bloque' to={`/ofertas/${oferta.id}/postular`}>
        Postular a esta práctica
      </Link>
    </div>
  )
}

export const OfertaDetallePage = () => {
  const { id } = useParams()
  const oferta = ofertas.find((o) => o.id === id)

  if (!oferta) {
    return (
      <div className='layout__vacio'>
        <p>Esta oferta no existe o fue retirada del portal.</p>
        <Link className='boton' to='/ofertas'>Volver a Ofertas</Link>
      </div>
    )
  }

  const empresa = empresas.find((e) => e.id === oferta.empresaId)
  const dias = diasParaCierre(oferta.fechaCierre)
  const cierraPronto = dias >= 0 && dias <= DIAS_CIERRE_PRONTO
  const sinRemuneracion = oferta.remuneracion === null || oferta.remuneracion === undefined

  return (
    <div className='oferta-detalle'>
      <nav className='oferta-detalle__migas' aria-label='Ruta de navegación'>
        <Link to='/ofertas'>Ofertas</Link>
        <span aria-hidden='true'> / </span>
        <span>{oferta.titulo}</span>
      </nav>

      <div className='oferta-detalle__grilla'>
        <article className='oferta-detalle__principal'>
          <header className='oferta-detalle__encabezado'>
            <p className='oferta-detalle__empresa'>
              {empresa ? empresa.nombre : 'Empresa no informada'}
              {empresa && empresa.rubro ? ` · ${empresa.rubro}` : ''}
            </p>
            <h1 className='oferta-detalle__titulo'>{oferta.titulo}</h1>
            <div>
              {(oferta.areas || []).map((area) => (
                <span key={area} className='etiqueta'>{area}</span>
              ))}
            </div>
          </header>

          <section className='oferta-detalle__seccion'>
            <h2 className='oferta-detalle__subtitulo'>Descripción</h2>
            <p>{oferta.descripcion}</p>
          </section>

          <ListaSeccion titulo='Qué harás en la práctica' items={oferta.tareas} />
          <ListaSeccion titulo='Requisitos' items={oferta.requisitos} />

          {oferta.tecnologias && oferta.tecnologias.length > 0 && (
            <section className='oferta-detalle__seccion'>
              <h2 className='oferta-detalle__subtitulo'>Tecnologías</h2>
              <div>
                {oferta.tecnologias.map((t) => (
                  <span key={t} className='etiqueta'>{t}</span>
                ))}
              </div>
            </section>
          )}

          <ResumenResenas empresaId={oferta.empresaId} />
        </article>

        <aside className='oferta-detalle__panel'>
          <div className='oferta-detalle__monto'>
            <p className='oferta-detalle__dato-etiqueta'>Remuneración mensual</p>
            {sinRemuneracion
              ? (
                <p className='oferta-detalle__aviso'>
                  <strong>No informada.</strong> La empresa no publicó el monto. Puedes
                  consultarlo al contacto antes de postular.
                </p>
                )
              : <p className='oferta-detalle__monto-valor'>{formatCLP(oferta.remuneracion)}</p>}
          </div>

          <div className={`oferta-detalle__cierre${cierraPronto ? ' oferta-detalle__cierre--pronto' : ''}${dias < 0 ? ' oferta-detalle__cierre--cerrada' : ''}`}>
            <strong>{textoCierre(oferta.fechaCierre)}</strong>
            <span>Fecha de cierre: {formatFecha(oferta.fechaCierre)}</span>
          </div>

          <AccionPostular oferta={oferta} />

          <dl className='oferta-detalle__datos'>
            <Dato etiqueta='Modalidad'>{oferta.modalidad}</Dato>
            <Dato etiqueta='Ubicación'>{oferta.ubicacion}</Dato>
            <Dato etiqueta='Jornada'>{oferta.jornada}</Dato>
            <Dato etiqueta='Duración'>{oferta.duracionSemanas} semanas</Dato>
            <Dato etiqueta='Tipo de práctica'>{oferta.tipoPractica}</Dato>
            <Dato etiqueta='Publicada'>{formatFecha(oferta.fechaPublicacion)}</Dato>
            <Dato etiqueta='Contacto'>
              <a href={`mailto:${oferta.contacto}`}>{oferta.contacto}</a>
            </Dato>
          </dl>
        </aside>
      </div>
    </div>
  )
}

export default OfertaDetallePage
