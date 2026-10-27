// Dueño: Benjamín.
import React from 'react'
import { NavLink } from 'react-router-dom'

import { usePostulaciones } from '../state/postulaciones'

export const NavBar = () => {
  const { postulaciones } = usePostulaciones()
  const navLinkClass = ({ isActive }) => {
    const classes = ['nav-bar__link']
    if (isActive) classes.push('nav-bar__link--active')
    return classes.join(' ')
  }
  return (
    <nav className='nav-bar'>
      <NavLink className={navLinkClass} to='/ofertas'>Ofertas</NavLink>
      <NavLink className={navLinkClass} to='/postulaciones'>
        Mis postulaciones
        {postulaciones.length > 0 && (
          <span className='nav-bar__contador'>{postulaciones.length}</span>
        )}
      </NavLink>
    </nav>
  )
}

export default NavBar
