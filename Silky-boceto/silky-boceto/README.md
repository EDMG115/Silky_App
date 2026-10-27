# Silky · boceto de interfaz (HTML + CSS + JS)

Boceto estático de las 5 vistas de la app para programar al robot Silky con bloques.
Solo diseño: los botones no hacen nada todavía. Es la base para pasarlo a Vue.

## Cómo verlo
Abre `index.html` en el navegador (necesita internet para cargar Blockly y las fuentes).
Si el navegador bloquea algo por abrirlo como archivo, sirve la carpeta:

    python3 -m http.server 8080   →   http://localhost:8080

## Vistas
| Archivo          | Módulo                        |
|------------------|-------------------------------|
| index.html       | Editor de bloques (Blockly)   |
| retos.html       | Retos                         |
| imagenes.html    | Imágenes para la cara (OLED)  |
| dashboard.html   | Dashboard de puntuación       |
| conexion.html    | Conexión con el robot         |

## Estructura
- `css/pixel.css` – kit de componentes pixel (`px-btn`, `px-box`, `px-chip`, `px-progress`,
  `px-seg`, `px-switch`, `px-console`, `px-tabs`). Ocupa el lugar de Pixelium Design mientras
  se integra en Vue; los nombres están pensados para cambiarse por sus componentes.
- `css/app.css` – layout (barra lateral + contenido) y estilos de cada vista.
- `js/blockly-silky.js` – tema pixel de Blockly, bloques propios (movimiento, expresiones,
  sensores), paleta y un programa de ejemplo (reto 04).
- `js/pixel-art.js` – dibuja el robot, las caras OLED de 128×64 y los iconos.
- `js/icons-data.js` – iconos de pixelarticons (MIT).
- `assets/` – logo y su versión de 1 bit para la OLED.

## Dependencias por CDN
- Blockly 11.2.1 (`unpkg.com/blockly@11.2.1/blockly.min.js` + `msg/es.js`)
- Google Fonts: Silkscreen, Pixelify Sans, VT323

Colores: #ad3043 (principal), blanco #efece6, negro #0d0e1b.
Los datos de ejemplo (puntos, retos, latencia) son ficticios.
