// Estado compartido de postulaciones. Dueño: Benjamín.
// Se guarda en localStorage para que el flujo se sienta real durante el testing.
import React, { createContext, useContext, useEffect, useState } from 'react'

const CLAVE = 'portal-practicas-di:postulaciones'

const leer = () => {
  try {
    const guardado = window.localStorage.getItem(CLAVE)
    return guardado ? JSON.parse(guardado) : []
  } catch (e) {
    return []
  }
}

const PostulacionesContext = createContext(null)

export const PostulacionesProvider = ({ children }) => {
  const [postulaciones, setPostulaciones] = useState(leer)

  useEffect(() => {
    try {
      window.localStorage.setItem(CLAVE, JSON.stringify(postulaciones))
    } catch (e) {
      // Sin almacenamiento disponible: el estado vive solo en memoria.
    }
  }, [postulaciones])

  // datos: { mensaje, archivoCV }
  const postular = (ofertaId, datos = {}) => {
    setPostulaciones((actuales) => [
      ...actuales.filter((p) => p.ofertaId !== ofertaId),
      { ofertaId, ...datos, fecha: new Date().toISOString(), estado: 'Enviada' }
    ])
  }

  const yaPostulo = (ofertaId) => postulaciones.some((p) => p.ofertaId === ofertaId)

  const obtener = (ofertaId) => postulaciones.find((p) => p.ofertaId === ofertaId)

  // Control y libertad del usuario: puede deshacer una postulación.
  const retirar = (ofertaId) => {
    setPostulaciones((actuales) => actuales.filter((p) => p.ofertaId !== ofertaId))
  }

  // Útil para reiniciar entre sesiones de testing.
  const reiniciar = () => setPostulaciones([])

  return (
    <PostulacionesContext.Provider value={{ postulaciones, postular, yaPostulo, obtener, retirar, reiniciar }}>
      {children}
    </PostulacionesContext.Provider>
  )
}

export const usePostulaciones = () => useContext(PostulacionesContext)
