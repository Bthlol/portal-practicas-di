# Cómo colaborar

Equipo: Seba, Manuel y Benjamín. Cada integrante es dueño de una meta de usuario y de sus
propios archivos, para que nadie tenga que esperar a otro. Este documento es el contrato que lo
hace posible: si algo de aquí debe cambiar, se avisa en el grupo **antes** de cambiarlo.

## Dueños por archivo

Todo bajo `src/`. Nadie edita un archivo de otro integrante sin acordarlo.

| Dueño | Meta | Archivos |
| --- | --- | --- |
| Benjamín | M2. Decidir si una oferta le conviene | `components/layout.jsx`, `components/nav_bar.jsx`, `pages/oferta_detalle_page.jsx`, `pages/postular_page.jsx`, `pages/postulaciones_page.jsx`, `state/postulaciones.jsx`, `utils/format.js`, `stylesheets/base/`, `stylesheets/layout/`, `stylesheets/nav-bar/`, `stylesheets/oferta-detalle/`, `stylesheets/postular/`, `stylesheets/postulaciones/`, `stylesheets/index.scss`, `webpack.config.js` |
| Seba | M1. Encontrar prácticas de su área | `pages/ofertas_page.jsx`, `components/oferta_card.jsx`, `components/filtros.jsx`, `data/ofertas.json`, `stylesheets/ofertas-page/` |
| Manuel | M3. Saber cómo les fue a compañeros | `components/resumen_resenas.jsx`, `pages/resenas_page.jsx`, `data/empresas.json`, `data/resenas.json`, `stylesheets/resenas/` |

Las rutas (`layout.jsx`) y los `@import` de estilos (`index.scss`) quedaron registrados desde el
primer commit: nadie necesita tocarlos para agregar su trabajo.

## Puntos de contacto entre pantallas

| Desde | Hacia | Cómo |
| --- | --- | --- |
| Tarjeta de oferta (Seba) | Detalle (Benjamín) | Enlace a `/ofertas/:id` con el `id` de la oferta |
| Detalle (Benjamín) | Resumen de reseñas (Manuel) | `<ResumenResenas empresaId={oferta.empresaId} />` |
| Resumen de reseñas (Manuel) | Página de reseñas (Manuel) | `/empresas/:id/resenas` |
| Página de reseñas (Manuel) | Oferta de origen | `navigate(-1)` |

Las props de estos componentes no cambian sin avisar.

## Recursos compartidos

Úsalos en vez de crear los tuyos, para que las tres pantallas se vean y se comporten igual
(heurística de consistencia).

- `utils/format.js`
  - `formatCLP(monto)`: `400000` → `$400.000`; `null` → `No informada`
  - `textoRemuneracion(monto)`: `$400.000 mensuales` o `Remuneración no informada` (para resúmenes de una línea)
  - `formatFecha(iso)`: `2026-11-15` → `15 nov 2026`
  - `diasParaCierre(iso)`, `estaCerrada(iso)`, `textoCierre(iso)` (`Cierra en 3 días`, `Cerrada`)
- `state/postulaciones.jsx`: `usePostulaciones()` entrega `postulaciones`, `postular`, `yaPostulo`, `obtener`, `retirar` y `reiniciar`.
- `stylesheets/base/`
  - Variables: `$color-primario`, `$color-alerta`, `$color-exito`, `$color-error`, `$espacio`, `$radio`…
  - Botones: `.boton`, `.boton--primario`, `.boton--bloque`, `.boton--peligro`, `.boton--texto`
  - Etiquetas: `.etiqueta`, `.etiqueta--alerta`

Los estilos siguen [BEM](https://getbem.com/): un bloque por carpeta en `stylesheets/`.

## Reglas de Git

1. **Configura tu correo antes del primer commit**, con el mismo de tu cuenta de GitHub:
   `git config user.email "<correo de GitHub>"`. Si no coincide, el commit no aparece asociado a
   ti, y el enunciado exige commits visibles de los 3 integrantes.
2. **Autenticación.** GitHub no acepta la contraseña de la cuenta al hacer push por HTTPS (da error
   403). Usa una de estas dos opciones:
   - GitHub CLI: `gh auth login` y luego `gh auth setup-git`.
   - Un token clásico con permiso `repo` (Settings → Developer settings → Personal access tokens),
     pegado como contraseña.
3. Antes de cada push: `git pull --rebase`, luego `npm run dev` y revisar que la consola no
   muestre errores.
4. Commits pequeños y con mensaje descriptivo: `feat(ofertas): filtros por área y modalidad`.
   Apunta a 3 o más commits propios, no uno solo al final.
5. No cambiar `package.json` ni agregar librerías sin acordarlo en el grupo.
6. Antes de subir datos nuevos, revisa [docs/datos.md](docs/datos.md). Antes de dar por
   terminada tu meta, completa su parte en [docs/flujos.md](docs/flujos.md) y
   [docs/prueba.md](docs/prueba.md).
