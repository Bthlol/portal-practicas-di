// Dueño: Benjamín (M2). Flujo en tres pasos: completar → revisar → enviada.
// El paso de revisión es la confirmación antes de comprometer la acción
// (Heurística: prevención de errores). Los errores se explican en lenguaje
// simple junto al campo que los causa.
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import ofertas from '../data/ofertas.json'
import empresas from '../data/empresas.json'
import { usePostulaciones } from '../state/postulaciones'
import { formatFecha, estaCerrada, textoCierre, textoRemuneracion } from '../utils/format'

const MIN_CARACTERES = 50
const MAX_CARACTERES = 800

const validar = ({ mensaje, archivoCV }) => {
  const errores = {}
  if (mensaje.trim().length < MIN_CARACTERES) {
    errores.mensaje = `Escribe al menos ${MIN_CARACTERES} caracteres para que la empresa conozca tu interés.`
  }
  if (!archivoCV) {
    errores.archivoCV = 'Adjunta tu CV en PDF para continuar.'
  } else if (!archivoCV.toLowerCase().endsWith('.pdf')) {
    errores.archivoCV = 'El CV debe ser un archivo PDF. Exporta tu documento a PDF e inténtalo de nuevo.'
  }
  return errores
}

// Recordatorio de la oferta: el usuario no tiene que recordar a qué está postulando.
const ResumenOferta = ({ oferta, empresa }) => (
  <div className='postular__oferta'>
    <p className='postular__empresa'>{empresa ? empresa.nombre : ''}</p>
    <p className='postular__oferta-titulo'>{oferta.titulo}</p>
    <p className='postular__oferta-datos'>
      {textoRemuneracion(oferta.remuneracion)} · {oferta.modalidad} · {textoCierre(oferta.fechaCierre)}
    </p>
  </div>
)

const Pasos = ({ actual }) => {
  const pasos = ['Completar', 'Revisar', 'Enviada']
  return (
    <ol className='postular__pasos'>
      {pasos.map((nombre, i) => (
        <li
          key={nombre}
          className={`postular__paso${i === actual ? ' postular__paso--actual' : ''}${i < actual ? ' postular__paso--hecho' : ''}`}
        >
          {i + 1}. {nombre}
        </li>
      ))}
    </ol>
  )
}

export const PostularPage = () => {
  const { id } = useParams()
  const oferta = ofertas.find((o) => o.id === id)
  const { postular, postulaciones } = usePostulaciones()

  const [paso, setPaso] = useState(0)
  const [mensaje, setMensaje] = useState('')
  const [archivoCV, setArchivoCV] = useState('')
  const [errores, setErrores] = useState({})
  const [intentoEnviar, setIntentoEnviar] = useState(false)

  if (!oferta) {
    return (
      <div className='layout__vacio'>
        <p>Esta oferta no existe o fue retirada del portal.</p>
        <Link className='boton' to='/ofertas'>Volver a Ofertas</Link>
      </div>
    )
  }

  const empresa = empresas.find((e) => e.id === oferta.empresaId)
  const previa = postulaciones.find((p) => p.ofertaId === oferta.id)

  // Si ya postuló, no se muestra el formulario (salvo justo después de enviar).
  if (previa && paso !== 2) {
    return (
      <div className='postular'>
        <h1>Ya postulaste a esta práctica</h1>
        <p>Enviaste tu postulación el {formatFecha(previa.fecha)}. Su estado actual es «{previa.estado}».</p>
        <div className='postular__acciones'>
          <Link className='boton boton--primario' to='/postulaciones'>Ver mis postulaciones</Link>
          <Link className='boton' to={`/ofertas/${oferta.id}`}>Volver a la oferta</Link>
        </div>
      </div>
    )
  }

  if (estaCerrada(oferta.fechaCierre) && paso !== 2) {
    return (
      <div className='postular'>
        <h1>Esta oferta ya no recibe postulaciones</h1>
        <p>Cerró el {formatFecha(oferta.fechaCierre)}.</p>
        <Link className='boton boton--primario' to='/ofertas'>Ver otras ofertas</Link>
      </div>
    )
  }

  const actualizarMensaje = (valor) => {
    setMensaje(valor)
    if (intentoEnviar) setErrores(validar({ mensaje: valor, archivoCV }))
  }

  const actualizarCV = (evento) => {
    const archivo = evento.target.files && evento.target.files[0]
    const nombre = archivo ? archivo.name : ''
    setArchivoCV(nombre)
    if (intentoEnviar) setErrores(validar({ mensaje, archivoCV: nombre }))
  }

  const irARevisar = (evento) => {
    evento.preventDefault()
    setIntentoEnviar(true)
    const encontrados = validar({ mensaje, archivoCV })
    setErrores(encontrados)
    if (Object.keys(encontrados).length === 0) setPaso(1)
  }

  const confirmar = () => {
    postular(oferta.id, { mensaje: mensaje.trim(), archivoCV })
    setPaso(2)
  }

  if (paso === 2) {
    return (
      <div className='postular'>
        <Pasos actual={2} />
        <div className='postular__exito'>
          <h1>¡Postulación enviada!</h1>
          <p>
            Tu postulación a <strong>{oferta.titulo}</strong>
            {empresa ? <> en <strong>{empresa.nombre}</strong></> : null} quedó registrada con
            estado «Enviada».
          </p>
          <p>Puedes revisar su estado en cualquier momento desde «Mis postulaciones».</p>
        </div>
        <div className='postular__acciones'>
          <Link className='boton boton--primario' to='/postulaciones'>Ver mis postulaciones</Link>
          <Link className='boton' to='/ofertas'>Seguir viendo ofertas</Link>
        </div>
      </div>
    )
  }

  if (paso === 1) {
    return (
      <div className='postular'>
        <Pasos actual={1} />
        <h1>Revisa tu postulación</h1>
        <ResumenOferta oferta={oferta} empresa={empresa} />
        <dl className='postular__revision'>
          <dt>Mensaje para la empresa</dt>
          <dd className='postular__mensaje'>{mensaje.trim()}</dd>
          <dt>CV adjunto</dt>
          <dd>{archivoCV}</dd>
        </dl>
        <p className='postular__nota'>
          Una vez enviada, la postulación no se puede editar, pero puedes retirarla desde «Mis postulaciones».
        </p>
        <div className='postular__acciones'>
          <button className='boton boton--primario' onClick={confirmar}>Confirmar y enviar</button>
          <button className='boton' onClick={() => setPaso(0)}>Editar</button>
        </div>
      </div>
    )
  }

  const restantes = MIN_CARACTERES - mensaje.trim().length

  return (
    <div className='postular'>
      <Link to={`/ofertas/${oferta.id}`}>← Volver a la oferta</Link>
      <Pasos actual={0} />
      <h1>Postular a esta práctica</h1>
      <ResumenOferta oferta={oferta} empresa={empresa} />

      <form className='postular__form' onSubmit={irARevisar} noValidate>
        <label className='postular__campo'>
          <span className='postular__etiqueta'>¿Por qué te interesa esta práctica?</span>
          <textarea
            className={`postular__textarea${errores.mensaje ? ' postular__textarea--error' : ''}`}
            rows={6}
            maxLength={MAX_CARACTERES}
            value={mensaje}
            onChange={(e) => actualizarMensaje(e.target.value)}
            placeholder='Cuéntale a la empresa qué te motiva y qué conocimientos puedes aportar.'
          />
          <span className='postular__ayuda'>
            {restantes > 0
              ? `Faltan ${restantes} caracteres para el mínimo.`
              : `${mensaje.length}/${MAX_CARACTERES} caracteres.`}
          </span>
          {errores.mensaje && <span className='postular__error' role='alert'>{errores.mensaje}</span>}
        </label>

        <label className='postular__campo'>
          <span className='postular__etiqueta'>CV (PDF)</span>
          <input type='file' accept='.pdf,application/pdf' onChange={actualizarCV} />
          {archivoCV && !errores.archivoCV && (
            <span className='postular__ayuda'>Archivo seleccionado: {archivoCV}</span>
          )}
          {errores.archivoCV && <span className='postular__error' role='alert'>{errores.archivoCV}</span>}
        </label>

        <div className='postular__acciones'>
          <button type='submit' className='boton boton--primario'>Revisar postulación</button>
          <Link className='boton' to={`/ofertas/${oferta.id}`}>Cancelar</Link>
        </div>
      </form>
    </div>
  )
}

export default PostularPage
