// Dueño: Seba (M1. Encontrar prácticas de su área de interés). Hipótesis H4:
// filtros por área o conocimientos.
// Los filtros se guardan en la URL (?area=...&modalidad=...) para que el alumno
// no los pierda al abrir una oferta y volver atrás con el navegador.
import React from 'react'
import { useSearchParams } from 'react-router-dom'

import ofertas from '../data/ofertas.json'
import empresas from '../data/empresas.json'
import OfertaCard from '../components/oferta_card'
import Filtros, { FILTROS_VACIOS } from '../components/filtros'
import { estaCerrada } from '../utils/format'

const ORDENES = [
  { valor: 'cierre', texto: 'Cierre más próximo' },
  { valor: 'recientes', texto: 'Publicadas recientemente' },
  { valor: 'remuneracion', texto: 'Mayor remuneración' }
]

const MODALIDADES = ['Presencial', 'Híbrido', 'Remoto']

const empresaDe = (oferta) => empresas.find((e) => e.id === oferta.empresaId)

// Sin tildes ni mayúsculas: «analisis» encuentra «análisis».
const normalizar = (texto) =>
  texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

const plural = (n, singular, pluralTexto) => `${n} ${n === 1 ? singular : pluralTexto}`

// ---- URL <-> filtros ----

const leerFiltros = (params) => ({
  texto: params.get('q') || '',
  areas: params.getAll('area'),
  tecnologias: params.getAll('tec'),
  modalidades: params.getAll('modalidad'),
  tipo: params.get('tipo') || '',
  incluirCerradas: params.get('cerradas') === '1'
})

const aParametros = (f, orden) => {
  const params = new URLSearchParams()
  if (f.texto) params.set('q', f.texto)
  f.areas.forEach((a) => params.append('area', a))
  f.tecnologias.forEach((t) => params.append('tec', t))
  f.modalidades.forEach((m) => params.append('modalidad', m))
  if (f.tipo) params.set('tipo', f.tipo)
  if (f.incluirCerradas) params.set('cerradas', '1')
  if (orden !== 'cierre') params.set('orden', orden)
  return params
}

// ---- Filtrado y orden ----

// Dentro de un mismo grupo basta con que calce una opción (área A o área B);
// entre grupos se exigen todas (área y modalidad).
const coincide = (oferta, f) => {
  if (f.areas.length && !oferta.areas.some((a) => f.areas.includes(a))) return false
  if (f.tecnologias.length && !oferta.tecnologias.some((t) => f.tecnologias.includes(t))) return false
  if (f.modalidades.length && !f.modalidades.includes(oferta.modalidad)) return false
  if (f.tipo && oferta.tipoPractica !== f.tipo) return false

  const palabras = normalizar(f.texto).split(/\s+/).filter(Boolean)
  if (palabras.length) {
    const empresa = empresaDe(oferta)
    const fuente = normalizar([
      oferta.titulo,
      empresa ? empresa.nombre : '',
      oferta.descripcion,
      oferta.ubicacion,
      ...oferta.areas,
      ...oferta.tecnologias
    ].join(' '))
    if (!palabras.every((p) => fuente.includes(p))) return false
  }
  return true
}

const ordenar = (lista, orden) => {
  const copia = [...lista]
  if (orden === 'recientes') {
    return copia.sort((a, b) => b.fechaPublicacion.localeCompare(a.fechaPublicacion))
  }
  if (orden === 'remuneracion') {
    // Las que no informan monto quedan al final.
    return copia.sort((a, b) => (b.remuneracion ?? -1) - (a.remuneracion ?? -1))
  }
  // Cierre más próximo primero; las cerradas, si se muestran, al final.
  return copia.sort((a, b) => {
    const cerradaA = estaCerrada(a.fechaCierre)
    const cerradaB = estaCerrada(b.fechaCierre)
    if (cerradaA !== cerradaB) return cerradaA ? 1 : -1
    return cerradaA
      ? b.fechaCierre.localeCompare(a.fechaCierre)
      : a.fechaCierre.localeCompare(b.fechaCierre)
  })
}

// ---- Opciones y conteos del panel ----

const contar = (lista, obtener) => {
  const conteo = {}
  lista.forEach((oferta) => {
    [].concat(obtener(oferta)).forEach((valor) => {
      conteo[valor] = (conteo[valor] || 0) + 1
    })
  })
  return conteo
}

const conteoTecnologias = contar(ofertas, (o) => o.tecnologias)

const OPCIONES = {
  areas: [...new Set(ofertas.flatMap((o) => o.areas))].sort((a, b) => a.localeCompare(b, 'es')),
  // Las más frecuentes primero, para que el panel recogido muestre las útiles.
  tecnologias: Object.keys(conteoTecnologias)
    .sort((a, b) => conteoTecnologias[b] - conteoTecnologias[a] || a.localeCompare(b, 'es')),
  modalidades: MODALIDADES.filter((m) => ofertas.some((o) => o.modalidad === m)),
  tipos: [...new Set(ofertas.map((o) => o.tipoPractica))].sort()
}

// ---- Página ----

const EstadoVacio = ({ cerradasQueCoinciden, onMostrarCerradas, onLimpiar }) => (
  <div className='ofertas-page__vacio'>
    <p><strong>Ninguna oferta coincide con tus filtros.</strong></p>
    {cerradasQueCoinciden > 0 && (
      <p>
        {cerradasQueCoinciden === 1
          ? 'Hay 1 oferta ya cerrada que sí coincide.'
          : `Hay ${cerradasQueCoinciden} ofertas ya cerradas que sí coinciden.`}
      </p>
    )}
    <div className='ofertas-page__vacio-acciones'>
      {cerradasQueCoinciden > 0 && (
        <button type='button' className='boton' onClick={onMostrarCerradas}>
          Mostrar también las cerradas
        </button>
      )}
      <button type='button' className='boton boton--primario' onClick={onLimpiar}>
        Limpiar filtros
      </button>
    </div>
  </div>
)

export const OfertasPage = () => {
  const [params, setParams] = useSearchParams()
  const filtros = leerFiltros(params)
  const orden = ORDENES.some((o) => o.valor === params.get('orden')) ? params.get('orden') : 'cierre'

  // replace: los cambios de filtro no llenan el historial; «Atrás» vuelve a la
  // página anterior y no al filtro anterior.
  const actualizar = (nuevosFiltros, nuevoOrden = orden) =>
    setParams(aParametros(nuevosFiltros, nuevoOrden), { replace: true })

  const base = filtros.incluirCerradas
    ? ofertas
    : ofertas.filter((o) => !estaCerrada(o.fechaCierre))
  const resultado = ordenar(base.filter((o) => coincide(o, filtros)), orden)

  const conteo = {
    areas: contar(base, (o) => o.areas),
    tecnologias: contar(base, (o) => o.tecnologias),
    modalidades: contar(base, (o) => o.modalidad),
    tipos: contar(base, (o) => o.tipoPractica)
  }

  const cerradasQueCoinciden = filtros.incluirCerradas
    ? 0
    : ofertas.filter((o) => estaCerrada(o.fechaCierre) && coincide(o, filtros)).length

  const filtrando = Boolean(filtros.texto.trim()) || filtros.areas.length > 0 ||
    filtros.tecnologias.length > 0 || filtros.modalidades.length > 0 || Boolean(filtros.tipo)
  const unidad = filtros.incluirCerradas ? ['oferta', 'ofertas'] : ['oferta vigente', 'ofertas vigentes']
  const contador = filtrando
    ? `${resultado.length} de ${plural(base.length, ...unidad)} ${resultado.length === 1 ? 'coincide' : 'coinciden'} con tus filtros`
    : plural(base.length, ...unidad)

  return (
    <div className='ofertas-page'>
      <Filtros
        filtros={filtros}
        opciones={OPCIONES}
        conteo={conteo}
        onChange={(nuevos) => actualizar(nuevos)}
      />

      <section className='ofertas-page__lista'>
        <h1 className='ofertas-page__titulo'>Ofertas de práctica</h1>

        <div className='ofertas-page__barra'>
          <p className='ofertas-page__contador' aria-live='polite'>{contador}</p>
          <label className='ofertas-page__orden'>
            Ordenar por
            <select
              className='ofertas-page__select'
              value={orden}
              onChange={(e) => actualizar(filtros, e.target.value)}
            >
              {ORDENES.map((o) => (
                <option key={o.valor} value={o.valor}>{o.texto}</option>
              ))}
            </select>
          </label>
        </div>

        {resultado.length === 0
          ? (
            <EstadoVacio
              cerradasQueCoinciden={cerradasQueCoinciden}
              onMostrarCerradas={() => actualizar({ ...filtros, incluirCerradas: true })}
              onLimpiar={() => actualizar(FILTROS_VACIOS)}
            />
            )
          : resultado.map((oferta) => (
            <OfertaCard key={oferta.id} oferta={oferta} empresa={empresaDe(oferta)} />
          ))}
      </section>
    </div>
  )
}

export default OfertasPage
