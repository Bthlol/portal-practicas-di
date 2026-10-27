// Dueño: Seba (M1). Esqueleto del Commit 0: lista simple para que la navegación
// funcione desde el primer día. Agregar filtros, contador, orden y estado vacío.
import React, { useState } from 'react'

import ofertas from '../data/ofertas.json'
import empresas from '../data/empresas.json'
import OfertaCard from '../components/oferta_card'
import Filtros from '../components/filtros'

export const OfertasPage = () => {
  const [filtros, setFiltros] = useState({})

  return (
    <div className='ofertas-page'>
      <Filtros filtros={filtros} onChange={setFiltros} />
      <section className='ofertas-page__lista'>
        <h1>Ofertas de práctica</h1>
        {ofertas.map((oferta) => (
          <OfertaCard
            key={oferta.id}
            oferta={oferta}
            empresa={empresas.find((e) => e.id === oferta.empresaId)}
          />
        ))}
      </section>
    </div>
  )
}

export default OfertasPage
