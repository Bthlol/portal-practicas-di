# Guion de verificación

Verifica que el MVP cumple los lineamientos del enunciado antes de entregar. Conviene repetirlo
después de cada commit que cambie datos o pantallas compartidas.

Cada paso está marcado con el lineamiento que verifica:

- **[N]** navegación completa para cumplir la meta;
- **[C]** todo lo que se ve clickeable funciona;
- **[D]** datos cercanos a casos reales.

Los pasos con 📸 son los screenshots sugeridos para el informe.

## Preparación

1. `npm install` (solo la primera vez) y `npm run dev`; abrir http://localhost:5050.
2. Abrir las herramientas de desarrollo (`F12`) → *Consola*, ejecutar `localStorage.clear()` y
   recargar. Dejar la consola abierta durante toda la prueba.

## Criterio de aprobación

- Todos los pasos se completan sin recargar la página (salvo donde se indica).
- La consola no muestra errores en rojo. Sin conexión a internet, el error de la fuente de Google
  es aceptable.
- Ningún elemento que parece clickeable deja de responder.

## M1. Encontrar prácticas de su área

**A. Listado**

1. 📸 Abrir `/ofertas`: el contador dice «8 ofertas vigentes» y la oferta cerrada no aparece. Las
   tarjetas van ordenadas por cierre más próximo y las que cierran en 3 días o menos muestran el
   cierre en naranja. **[D]**
2. Revisar que las ofertas sin monto digan «Remuneración no informada» en naranja. **[D]**

**B. Filtrar**

3. 📸 Marcar «Ciberseguridad» en Área → queda 1 oferta y el contador dice «1 de 8 ofertas vigentes
   coincide con tus filtros». La URL cambia a `?area=Ciberseguridad`. **[N]**
4. Marcar además «Presencial» → 📸 mensaje «Ninguna oferta coincide con tus filtros» con el aviso
   de 1 oferta cerrada que sí coincide.
5. Pulsar «Mostrar también las cerradas» → aparece la oferta cerrada, atenuada y con «Cerrada» en
   rojo. La casilla «Solo ofertas vigentes» queda desmarcada. **[C]**
6. Pulsar «Limpiar filtros» → vuelve el listado completo de vigentes. **[C]**
7. Escribir «analisis» (sin tilde) en Buscar → aparece «Práctica en análisis de datos».
8. Pulsar «Ver todas» en Tecnología → se despliega la lista completa. «Ver menos» la recoge, pero
   una tecnología marcada sigue visible. **[C]**
9. Elegir «Profesional» en Tipo de práctica y luego «Todas» → el listado cambia en cada caso. **[C]**
10. Cambiar el orden a «Mayor remuneración» → las ofertas sin monto quedan al final. **[C]**

**C. Llegar a la oferta**

11. Con «Ciencia de datos» marcado, pulsar una tarjeta → abre su ficha (M2). **[N]**
12. Pulsar «Atrás» en el navegador → los filtros y el orden siguen como estaban. **[N]**
13. Achicar la ventana a ancho de celular → el panel de filtros queda arriba del listado.

## M2. Decidir si una oferta le conviene

**A. Oferta con información completa**

1. En `/ofertas`, pulsar una tarjeta con remuneración informada → abre su ficha. **[N]**
2. 📸 El panel derecho muestra el monto, «Cierra en N días» con la fecha, y los datos de modalidad,
   ubicación, jornada, duración, tipo y fecha de publicación. Al centro: tareas, requisitos y
   tecnologías como etiquetas. **[D]**
3. Al hacer scroll, el panel derecho queda fijo a la vista.
4. Pulsar el correo de contacto → abre el cliente de correo. **[C]**
5. Pulsar «Ofertas» en la ruta de navegación → vuelve al listado. **[C]**

**B. Oferta con remuneración no informada**

6. 📸 Abrir una oferta con `remuneracion: null`: aparece el aviso naranja «No informada…». Si
   cierra en 3 días o menos, el cierre aparece en naranja.
7. Pulsar «Ver todas las reseñas» y luego «← Volver a la oferta». **[C]**

**C. Postular**

8. Pulsar «Postular a esta práctica» → paso «1. Completar» con el resumen de la oferta. **[N]**
9. 📸 Pulsar «Revisar postulación» sin llenar nada → dos errores junto a sus campos.
10. Escribir un mensaje corto: el contador indica «Faltan N caracteres». Adjuntar un archivo que
    no sea PDF → error indicando que debe ser PDF.
11. Completar al menos 50 caracteres, adjuntar un PDF y pulsar «Revisar postulación».
12. 📸 En «2. Revisar», pulsar «Editar» → el texto se conserva. Volver a revisar. **[C]**
13. 📸 Pulsar «Confirmar y enviar» → «¡Postulación enviada!» y contador **1** en la barra. **[N]**
14. Probar también «Seguir viendo ofertas» y, en otra postulación, «Cancelar» del paso 1. **[C]**

**D. Seguimiento**

15. 📸 «Ver mis postulaciones» → la oferta con fecha, remuneración, cierre y etiqueta «Enviada».
16. «Ver oferta» → el panel muestra «✓ Ya postulaste el…» en vez del botón. **[N]**
17. Escribir a mano `/ofertas/<id>/postular` → dice «Ya postulaste a esta práctica».
18. Recargar con `F5` → la postulación sigue ahí.
19. En Mis postulaciones: «Retirar» → «No» → «Retirar» → «Sí, retirar» → aviso de retiro y
    estado vacío con «Ver ofertas». **[C]**

**E. Casos borde**

20. 📸 Abrir una oferta cerrada: «Cerrada» en rojo y el botón desactivado con su explicación. Para
    simularla, fijar `FECHA_REFERENCIA` en `src/utils/format.js` a una fecha posterior al cierre y
    revertir después con `git checkout src/utils/format.js` (no subir ese cambio).
21. Abrir `/ofertas/no-existe` y `/cualquier-cosa` → mensaje con botón para volver. **[C]**

## M3. Saber cómo les fue a compañeros

> Manuel: completa esta sección cuando termines tu meta.

## Revisión final conjunta

- [ ] Las 3 metas se completan de punta a punta.
- [ ] Los datos de ofertas, empresas y reseñas son los definitivos, basados en el portal real.
- [ ] No hay nombres reales de alumnos en ninguna parte.
- [ ] La consola queda limpia en todas las rutas.
- [ ] Se tomaron los screenshots 📸 de las tres metas.
