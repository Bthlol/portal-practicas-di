// Utilidades compartidas de formato. Dueño: Benjamín.
// Todas las pantallas formatean montos y fechas con estas funciones
// para que la interfaz sea consistente (Heurística 1 de Nielsen).

// Fecha de referencia para calcular días al cierre.
// Durante el testing conviene fijarla (ej. '2026-11-05') para que las
// ofertas no caduquen entre una sesión y otra. Con null se usa la fecha real.
export const FECHA_REFERENCIA = null

const hoy = () => {
  const base = FECHA_REFERENCIA ? new Date(`${FECHA_REFERENCIA}T00:00:00`) : new Date()
  base.setHours(0, 0, 0, 0)
  return base
}

// 400000 -> "$400.000". null o undefined -> "No informada".
export const formatCLP = (monto) => {
  if (monto === null || monto === undefined) return 'No informada'
  return '$' + Math.round(monto).toLocaleString('es-CL')
}

// "2026-11-15" -> "15 nov 2026"
export const formatFecha = (iso) => {
  if (!iso) return ''
  const fecha = new Date(`${iso.slice(0, 10)}T00:00:00`)
  return fecha.toLocaleDateString('es-CL', { day: 'numeric', month: 'short', year: 'numeric' })
}

// Días que faltan para el cierre. 0 = cierra hoy, negativo = ya cerró.
export const diasParaCierre = (iso) => {
  const cierre = new Date(`${iso.slice(0, 10)}T00:00:00`)
  return Math.round((cierre - hoy()) / (1000 * 60 * 60 * 24))
}

export const estaCerrada = (iso) => diasParaCierre(iso) < 0

// Texto listo para mostrar: "Cierra hoy", "Cierra en 3 días", "Cerrada".
export const textoCierre = (iso) => {
  const dias = diasParaCierre(iso)
  if (dias < 0) return 'Cerrada'
  if (dias === 0) return 'Cierra hoy'
  if (dias === 1) return 'Cierra mañana'
  return `Cierra en ${dias} días`
}

// Para resúmenes de una línea, donde «No informada» sola sería ambigua.
// 400000 -> "$400.000 mensuales". null -> "Remuneración no informada".
export const textoRemuneracion = (monto) => {
  if (monto === null || monto === undefined) return 'Remuneración no informada'
  return `${formatCLP(monto)} mensuales`
}
