// Dueño: Benjamín. Las rutas quedan fijas desde el Commit 0:
// nadie más necesita editar este archivo.
import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom'

import { PostulacionesProvider } from '../state/postulaciones'
import NavBar from './nav_bar'

import OfertasPage from '../pages/ofertas_page'
import OfertaDetallePage from '../pages/oferta_detalle_page'
import PostularPage from '../pages/postular_page'
import PostulacionesPage from '../pages/postulaciones_page'
import ResenasPage from '../pages/resenas_page'

const NoEncontrada = () => (
  <div className='layout__vacio'>
    <p>No encontramos esta página.</p>
    <Link className='boton' to='/ofertas'>Ir a Ofertas</Link>
  </div>
)

const Layout = () => {
  return (
    <BrowserRouter>
      <PostulacionesProvider>
        <div className='layout'>
          <header className='layout__header'>
            <Link className='layout__title' to='/ofertas'>Portal de Prácticas DI</Link>
            <NavBar />
          </header>
          <main className='layout__page'>
            <Routes>
              <Route path='/' element={<Navigate to='/ofertas' replace />} />
              <Route path='/ofertas' element={<OfertasPage />} />
              <Route path='/ofertas/:id' element={<OfertaDetallePage />} />
              <Route path='/ofertas/:id/postular' element={<PostularPage />} />
              <Route path='/postulaciones' element={<PostulacionesPage />} />
              <Route path='/empresas/:id/resenas' element={<ResenasPage />} />
              <Route path='*' element={<NoEncontrada />} />
            </Routes>
          </main>
        </div>
      </PostulacionesProvider>
    </BrowserRouter>
  )
}

export default Layout
