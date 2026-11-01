// Dueño: Seba (M1). Panel de filtros del listado de ofertas.
// Recibe los filtros actuales y avisa los cambios con onChange(nuevosFiltros).
// Las opciones salen de los datos (prop «opciones»), así que no hay que tocar
// este archivo si se agregan ofertas con áreas o tecnologías nuevas.
import React, { useState } from 'react'

const MAX_TECNOLOGIAS_VISIBLES = 8

export const FILTROS_VACIOS = {
  texto: '',
  areas: [],
  tecnologias: [],
  modalidades: [],
  tipo: '',
  incluirCerradas: false
}

export const hayFiltrosActivos = (f) =>
  Boolean(f.texto.trim()) ||
  f.areas.length > 0 ||
  f.tecnologias.length > 0 ||
  f.modalidades.length > 0 ||
  Boolean(f.tipo) ||
  f.incluirCerradas

const GrupoCasillas = ({ titulo, opciones, seleccion, conteo, onAlternar }) => (
  <fieldset className='filtros__grupo'>
    <legend className='filtros__subtitulo'>{titulo}</legend>
    {opciones.map((opcion) => (
      <label key={opcion} className='filtros__opcion'>
        <input
          type='checkbox'
          checked={seleccion.includes(opcion)}
          onChange={() => onAlternar(opcion)}
        />
        <span className='filtros__nombre'>{opcion}</span>
        <span className='filtros__cantidad'>{conteo[opcion] || 0}</span>
      </label>
    ))}
  </fieldset>
)

export const Filtros = ({ filtros, opciones, conteo, onChange }) => {
  const [verTodasTecnologias, setVerTodasTecnologias] = useState(false)

  const cambiar = (campo, valor) => onChange({ ...filtros, [campo]: valor })

  const alternar = (campo) => (valor) => {
    const actual = filtros[campo]
    cambiar(campo, actual.includes(valor)
      ? actual.filter((v) => v !== valor)
      : [...actual, valor])
  }

  // Con la lista recogida se muestran las más frecuentes, pero una tecnología
  // ya marcada nunca se esconde.
  const tecnologias = verTodasTecnologias
    ? opciones.tecnologias
    : opciones.tecnologias.filter((t, i) =>
      i < MAX_TECNOLOGIAS_VISIBLES || filtros.tecnologias.includes(t))

  return (
    <aside className='filtros' aria-label='Filtros de ofertas'>
      <div className='filtros__encabezado'>
        <h2 className='filtros__titulo'>Filtrar ofertas</h2>
        {hayFiltrosActivos(filtros) && (
          <button
            type='button'
            className='boton boton--texto filtros__limpiar'
            onClick={() => onChange(FILTROS_VACIOS)}
          >
            Limpiar filtros
          </button>
        )}
      </div>

      <label className='filtros__buscar'>
        <span className='filtros__subtitulo'>Buscar</span>
        <input
          type='search'
          className='filtros__campo'
          value={filtros.texto}
          placeholder='Ej. Python, datos, Valparaíso'
          onChange={(e) => cambiar('texto', e.target.value)}
        />
      </label>

      <label className='filtros__opcion filtros__vigentes'>
        <input
          type='checkbox'
          checked={!filtros.incluirCerradas}
          onChange={(e) => cambiar('incluirCerradas', !e.target.checked)}
        />
        <span className='filtros__nombre'>Solo ofertas vigentes</span>
      </label>

      <GrupoCasillas
        titulo='Área'
        opciones={opciones.areas}
        seleccion={filtros.areas}
        conteo={conteo.areas}
        onAlternar={alternar('areas')}
      />

      <GrupoCasillas
        titulo='Modalidad'
        opciones={opciones.modalidades}
        seleccion={filtros.modalidades}
        conteo={conteo.modalidades}
        onAlternar={alternar('modalidades')}
      />

      <GrupoCasillas
        titulo='Tecnología'
        opciones={tecnologias}
        seleccion={filtros.tecnologias}
        conteo={conteo.tecnologias}
        onAlternar={alternar('tecnologias')}
      />
      {opciones.tecnologias.length > MAX_TECNOLOGIAS_VISIBLES && (
        <button
          type='button'
          className='boton boton--texto filtros__ver-mas'
          onClick={() => setVerTodasTecnologias(!verTodasTecnologias)}
        >
          {verTodasTecnologias ? 'Ver menos' : `Ver todas (${opciones.tecnologias.length})`}
        </button>
      )}

      <fieldset className='filtros__grupo'>
        <legend className='filtros__subtitulo'>Tipo de práctica</legend>
        {['', ...opciones.tipos].map((tipo) => (
          <label key={tipo || 'todas'} className='filtros__opcion'>
            <input
              type='radio'
              name='tipo-practica'
              checked={filtros.tipo === tipo}
              onChange={() => cambiar('tipo', tipo)}
            />
            <span className='filtros__nombre'>{tipo || 'Todas'}</span>
            {tipo && <span className='filtros__cantidad'>{conteo.tipos[tipo] || 0}</span>}
          </label>
        ))}
      </fieldset>
    </aside>
  )
}

export default Filtros
