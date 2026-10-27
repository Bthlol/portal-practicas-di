# Flujos por meta de usuario

Cada meta describe qué quiere lograr el alumno, la hipótesis que apoya y los pasos para lograrlo
en el MVP. Estos pasos son la base de los screenshots del informe y de las tareas de la fase de
testing. Cada dueño mantiene su sección al día.

## Mapa de navegación

```
/ ──► /ofertas  (M1: listado + filtros)
          │
          ▼
     /ofertas/:id  (M2: detalle) ─────────────┐
          │      └─ Resumen de reseñas (M3)   │
          │              │                    │
          │              ▼                    │
          │      /empresas/:id/resenas (M3) ──┘ «Volver a la oferta»
          ▼
     /ofertas/:id/postular  (M2: completar → revisar → enviada)
          │
          ▼
     /postulaciones  (M2: estado y retiro) ──► /ofertas/:id  «Ver oferta»
```

La barra superior lleva siempre a **Ofertas** y **Mis postulaciones** (con contador).

---

## M1. Encontrar prácticas de su área de interés (Seba)

- **Hipótesis:** H4. Filtros por área o conocimientos.
- **Punto de entrada:** `/ofertas`.
- **Estado:** pendiente (el listado actual es el esqueleto del primer commit).

> Seba: reemplaza estos pasos previstos por los definitivos cuando termines.

1. El alumno entra a Ofertas y ve todas las ofertas vigentes con área, tecnologías, modalidad,
   remuneración y fecha de cierre.
2. Filtra por área (ej. Ciberseguridad), tecnología o modalidad, o busca por texto.
3. El contador muestra cuántas ofertas coinciden; si ninguna coincide, puede limpiar los filtros.
4. Abre la oferta que le interesa.

**Resultado esperado:** el alumno llega a una oferta de su área sin recorrer el listado completo.

---

## M2. Decidir si una oferta le conviene antes de postular (Benjamín)

- **Hipótesis:** H2. Remuneración obligatoria y visible; incluye la vigencia visible pedida en
  las entrevistas.
- **Punto de entrada:** cualquier tarjeta de `/ofertas`.
- **Estado:** implementado.

### Decidir

1. En la ficha de la oferta, el panel lateral muestra lo necesario para decidir sin buscar fuera
   del portal:
   - la remuneración, o un aviso explícito si la empresa no la informó;
   - cuántos días faltan para el cierre (en naranja si son 3 o menos);
   - modalidad, ubicación, jornada, duración, tipo de práctica y contacto.
2. El cuerpo de la ficha detalla la descripción, las tareas concretas, los requisitos, las
   tecnologías y el resumen de reseñas (M3).

### Postular

3. Pulsa **«Postular a esta práctica»**.
4. **Paso 1, Completar:** escribe por qué le interesa (mínimo 50 caracteres) y adjunta su CV en
   PDF. Los errores se explican junto a cada campo.
5. **Paso 2, Revisar:** ve el resumen de lo que enviará. Puede volver con «Editar» sin perder lo
   escrito.
6. **Paso 3, Enviada:** confirmación y contador en la barra superior.

### Hacer seguimiento

7. En **Mis postulaciones** ve cada postulación con fecha, remuneración, cierre y estado.
8. Si se arrepiente, la retira (con confirmación en la misma fila).
9. La ficha de una oferta a la que ya postuló muestra «Ya postulaste el…» en vez del botón.

**Resultado esperado:** el alumno decide con la información en la ficha y sabe en todo momento
el estado de sus postulaciones, sin revisar el portal a diario ni llevar una planilla propia
(rutinas de compensación de las entrevistas).

**Estados alternativos:**

- **Oferta cerrada:** el botón se desactiva y se explica por qué.
- **Oferta inexistente:** mensaje con enlace a Ofertas.
- **Sin postulaciones:** estado vacío con enlace a Ofertas.

---

## M3. Saber cómo les fue a compañeros en esa empresa (Manuel)

- **Hipótesis:** H1. Reseñas expuestas desde la oferta, no solo desde el listado de empresas.
- **Punto de entrada:** sección «Reseñas de compañeros» en el detalle de una oferta.
- **Estado:** pendiente (el resumen actual es el esqueleto del primer commit).

> Manuel: reemplaza estos pasos previstos por los definitivos cuando termines.

1. En la ficha de la oferta, el alumno ve el promedio de calificación, cuántas prácticas
   anteriores hubo y qué porcentaje dice que la práctica coincidió con lo publicado.
2. Pulsa **«Ver todas las reseñas»**.
3. Filtra por área u ordena por fecha o calificación.
4. Vuelve a la oferta para decidir si postula.

**Resultado esperado:** el alumno conoce la experiencia de compañeros en el momento en que decide
postular, sin tener que saber que existe una sección de empresas.
