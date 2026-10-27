# Portal de Prácticas DI — MVP

MVP del proyecto Lean UX de **Diseño de Interfaces Usuarias** sobre el Portal de Prácticas del
Departamento de Informática (practicas.inf.utfsm.cl). Solo frontend: los datos viven en archivos
JSON locales (`src/data/`) y las postulaciones se guardan en el navegador.

Basado en [alexarenasf/frontend-sample-app](https://github.com/alexarenasf/frontend-sample-app).

## Metas de usuario

| Meta | Hipótesis | Pantallas | Dueño | Estado |
| --- | --- | --- | --- | --- |
| M1. Encontrar prácticas de su área de interés | H4 | `/ofertas` | Seba | En desarrollo |
| M2. Decidir si una oferta le conviene antes de postular | H2 | `/ofertas/:id`, `/ofertas/:id/postular`, `/postulaciones` | Benjamín | Implementada |
| M3. Saber cómo les fue a compañeros en esa empresa | H1 | Resumen en `/ofertas/:id`, `/empresas/:id/resenas` | Manuel | En desarrollo |

Los pasos de cada meta están en [docs/flujos.md](docs/flujos.md).

## Cómo correrlo

Requisitos: Node >= 16.13.1 y npm >= 8.1.2.

```
npm install
npm run dev
```

Abrir http://localhost:5050

## Documentación

| Documento | Para qué |
| --- | --- |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Dueños de cada archivo, recursos compartidos y reglas de Git |
| [docs/datos.md](docs/datos.md) | Formato de los JSON, casos borde obligatorios y anonimización |
| [docs/flujos.md](docs/flujos.md) | Mapa de navegación y pasos de cada meta |
| [docs/prueba.md](docs/prueba.md) | Guion de verificación antes de entregar |

## Estructura

```
src/
  components/   layout, barra de navegación, tarjeta, filtros, resumen de reseñas
  pages/        una página por ruta
  data/         ofertas.json, empresas.json, resenas.json
  state/        contexto de postulaciones (localStorage)
  utils/        formato de montos y fechas
  stylesheets/  SCSS con BEM; base/ tiene variables, botones y etiquetas compartidos
docs/           datos, flujos y guion de prueba
```

Para fijar la fecha usada en «Cierra en N días» durante el testing, editar
`FECHA_REFERENCIA` en `src/utils/format.js`.
