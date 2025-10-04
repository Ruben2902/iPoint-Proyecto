# iPoint-Proyecto — Descripción del Proyecto

Aplicación web estática (prototipo) para apoyar a iPoint en la identificación rápida de productos y una gestión básica de inventario. Está pensada para uso interno de ventas y soporte mientras se define una integración con una fuente de datos real.

## ¿Qué hace?

- Permite buscar productos por:
	- Serial
	- Nombre (modelo)
	- Part Number (en interfaz; requiere completar datos para funcionar al 100%)
- Muestra una ficha básica del producto encontrado: modelo, CPU, RAM, almacenamiento e imagen.
- Ofrece un módulo simple para agregar y eliminar ítems de un inventario en una tabla (sin persistencia).

## Páginas principales

- `Index.html`: Buscador de productos. Usa datos locales de ejemplo definidos en `script.js`.
- `Inventario.html`: Alta y tabla de inventario. La lógica de agregado/eliminación está en `script1.js`.

## Tecnologías

- HTML, CSS y JavaScript puro (sin frameworks, sin backend).

## Cómo usar

1. Abrir `Index.html` en el navegador para utilizar el buscador.
2. Abrir `Inventario.html` para agregar/eliminar productos en la tabla.

Sugerencia: durante el desarrollo, usar una extensión tipo “Live Server” (VS Code) para recarga en vivo.

## Estado actual

- Prototipo funcional con datos ficticios en `script.js`.
- No hay persistencia: el inventario se pierde al recargar.
- La búsqueda por Part Number está en la UI, pero los datos de ejemplo aún no incluyen `partNumber` en todos los registros, por lo que puede no devolver resultados.

## Próximos pasos sugeridos

1. Completar datos con `partNumber` y mejorar la búsqueda (parcial/insensible a mayúsculas).
2. Añadir persistencia (p. ej., `localStorage` o API ligera).
3. Unificar y corregir enlaces/rutas de imágenes (carpeta `img/`).
4. Mejoras de UX/validaciones (evitar duplicados, mensajes de error consistentes, responsive).

