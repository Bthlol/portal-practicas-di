# Formato de datos

El MVP no tiene backend: todo sale de tres archivos JSON en `src/data/`. Cada archivo es un
arreglo de objetos con el formato de esta página.

## Reglas generales

- **Datos cercanos a casos reales** (lo exige el enunciado). Las ofertas se basan en las que
  publica el portal real (practicas.inf.utfsm.cl); donde la publicación original no trae un dato,
  se completa con un valor verosímil o se deja `null` si la ausencia es parte del caso.
- **Sin datos personales.** Las reseñas no llevan nombres ni roles USM de alumnos; el autor se
  describe por año de carrera (ej. «Alumno/a de 5° año»).
- **Fechas** en formato ISO `AAAA-MM-DD`.
- **Identificadores** con prefijo y número: `of-01`, `emp-01`, `res-01`. No se reutilizan.
- **Montos** en pesos chilenos, como número entero y sin puntos: `400000`.

## Ofertas: `ofertas.json` (dueño: Seba)

| Campo | Tipo | Obligatorio | Notas |
| --- | --- | --- | --- |
| `id` | texto | sí | `of-NN` |
| `empresaId` | texto | sí | Debe existir en `empresas.json` |
| `titulo` | texto | sí | Ej. «Práctica en desarrollo backend» |
| `tipoPractica` | texto | sí | `Industrial` o `Profesional` |
| `areas` | lista de texto | sí | Se usan en los filtros de M1. Mantener nombres consistentes entre ofertas |
| `tecnologias` | lista de texto | sí | Se muestran como etiquetas |
| `modalidad` | texto | sí | `Presencial`, `Híbrido` o `Remoto` |
| `ubicacion` | texto | sí | Ciudad |
| `remuneracion` | número o `null` | sí | Monto mensual. `null` = la empresa no lo informó, y la interfaz lo dice explícitamente (hallazgo de H2) |
| `jornada` | texto | sí | Ej. «Completa, lunes a viernes» |
| `duracionSemanas` | número | sí | |
| `fechaPublicacion` | fecha | sí | |
| `fechaCierre` | fecha | sí | Define «Cierra en N días» y bloquea la postulación si ya pasó |
| `descripcion` | texto | sí | Uno o dos párrafos |
| `tareas` | lista de texto | sí | Tareas concretas del día a día. Fue la información más pedida en las entrevistas |
| `requisitos` | lista de texto | no | |
| `contacto` | correo | sí | Se muestra como enlace `mailto:` |

**Casos borde que deben existir** (el diseño los muestra y el testing los necesita):

- al menos una oferta con `remuneracion: null`;
- al menos una que cierre en 3 días o menos respecto de la fecha de testing;
- al menos una ya cerrada;
- al menos una de ciberseguridad (continuidad con la tarea T1 de la Parte 2);
- al menos 4 áreas distintas.

## Empresas: `empresas.json` (dueño: Manuel)

| Campo | Tipo | Obligatorio | Notas |
| --- | --- | --- | --- |
| `id` | texto | sí | `emp-NN` |
| `nombre` | texto | sí | |
| `rubro` | texto | sí | Ej. «Retail», «Servicios TI» |
| `ciudad` | texto | sí | |

Toda empresa referida por una oferta debe existir aquí.

## Reseñas: `resenas.json` (dueño: Manuel)

| Campo | Tipo | Obligatorio | Notas |
| --- | --- | --- | --- |
| `id` | texto | sí | `res-NN` |
| `empresaId` | texto | sí | Debe existir en `empresas.json` |
| `autor` | texto | sí | Anonimizado: año de carrera, nunca un nombre |
| `periodo` | texto | sí | Ej. «Verano 2026» |
| `area` | texto | sí | Área en que se hizo la práctica |
| `calificacion` | número 1–5 | sí | |
| `coincidioConOferta` | sí/no | sí | Si las tareas reales coincidieron con lo publicado (caso de desajuste de las entrevistas) |
| `texto` | texto | sí | Opinión breve |

**Casos borde:** al menos una empresa sin reseñas, y al menos una con reseñas que indiquen
`coincidioConOferta: false`.

## Fecha de referencia para el testing

`diasParaCierre` compara contra la fecha real. Para que las ofertas no caduquen entre sesiones de
prueba, fija `FECHA_REFERENCIA` en `src/utils/format.js` (ej. `'2026-11-05'`) y elige las fechas de
cierre de los datos respecto de ese día.
