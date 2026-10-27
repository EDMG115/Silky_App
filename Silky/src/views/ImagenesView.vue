<script setup lang="ts">
import silkyLogo from '@/assets/silky-logo.png'
import oledSilky from '@/assets/oled-silky.png'
import PixelIcon from '@/components/PixelIcon.vue'
import FaceCanvas from '@/components/FaceCanvas.vue'
import RobotCanvas from '@/components/RobotCanvas.vue'

const faces = [
  { id: 'feliz', caption: 'feliz', tag: 'en uso', on: true },
  { id: 'normal', caption: 'normal', tag: 'base', on: false },
  { id: 'triste', caption: 'triste', tag: 'base', on: false },
  { id: 'sorprendida', caption: 'sorprendida', tag: 'base', on: false },
  { id: 'dormida', caption: 'dormida', tag: 'base', on: false },
  { id: 'enojada', caption: 'enojada', tag: 'base', on: false },
  { id: 'corazon', caption: 'corazón', tag: 'base', on: false },
]
</script>

<template>
  <div class="steps">
    <section class="px-box px-card" aria-label="Subir y ajustar">
      <h2><span class="step-num">1</span> Sube una imagen</h2>
      <div class="dropzone">
        <PixelIcon name="upload" />
        <p>Arrastra un PNG o JPG aquí</p>
        <button class="px-btn is-sm" type="button">Elegir archivo</button>
      </div>
      <div class="px-box is-sunk file-loaded">
        <img :src="silkyLogo" alt="Imagen cargada: logo de Silky" />
        <div>
          <div class="data">silky-logo.png</div>
          <div class="muted">906 × 425 px · 109 KB</div>
        </div>
      </div>

      <h2><span class="step-num">2</span> Ajusta a 128 × 64</h2>
      <div class="controls-grid">
        <div class="px-field">
          <span class="px-label">Encuadre</span>
          <div class="px-seg"><span class="is-on">Contener</span><span>Rellenar</span><span>Estirar</span></div>
        </div>
        <div class="px-field">
          <span class="px-label">Umbral blanco / negro</span>
          <div class="px-slider" style="--val: 43">
            <div class="px-slider__track" />
            <span class="data">110</span>
          </div>
        </div>
        <div class="px-field">
          <span class="px-label">Tramado</span>
          <div class="px-seg"><span class="is-on">Ninguno</span><span>Floyd–Steinberg</span><span>Bayer 4×4</span></div>
        </div>
        <div class="inline-field">
          <span class="px-label">Invertir colores</span>
          <span class="px-switch" role="switch" aria-checked="false" />
        </div>
      </div>
    </section>

    <section class="px-box px-card" aria-label="Vista previa">
      <div class="px-card__head">
        <h2><span class="step-num">3</span> Vista previa</h2>
        <span class="px-chip">SSD1306 · 128 × 64</span>
      </div>
      <div class="oled-frame">
        <div class="ruler"><span>0</span><span>32</span><span>64</span><span>96</span><span>127</span></div>
        <div class="oled-screen">
          <img :src="oledSilky" alt="Logo de Silky convertido a 1 bit, 128 × 64" />
        </div>
        <div class="oled-meta">
          <span>1 bit por píxel</span><span>1 024 bytes</span><span>1 928 píxeles encendidos</span>
        </div>
      </div>
      <div class="preview-pair">
        <div class="px-card" style="padding: 0">
          <h3>Así se verá en Silky</h3>
          <p class="muted">
            La imagen se envía como un mapa de bits de 1 024 bytes a <span class="data">POST /api/face</span>.
          </p>
          <div class="px-btn-row">
            <button class="px-btn is-primary" type="button">
              <PixelIcon name="android" />Mostrar en la cara
            </button>
            <button class="px-btn" type="button"><PixelIcon name="save" />Guardar</button>
          </div>
        </div>
        <div class="robot-stage">
          <RobotCanvas :face-img="oledSilky" aria-label="Silky mostrando el logo en su cara" />
        </div>
      </div>
    </section>
  </div>

  <section class="px-box px-card" aria-label="Galería de caras">
    <div class="px-card__head">
      <h2><PixelIcon name="image-gallery" />Galería de caras</h2>
      <span class="px-chip">8 guardadas · localStorage</span>
    </div>
    <div class="gallery">
      <figure v-for="face in faces" :key="face.id" class="px-box is-sunk face-tile" :class="{ 'is-on': face.on }">
        <FaceCanvas :face="face.id" :aria-label="`Cara ${face.caption}`" />
        <figcaption>
          <span>{{ face.caption }}</span>
          <span :class="face.on ? 'px-chip is-silk' : 'muted'">{{ face.tag }}</span>
        </figcaption>
      </figure>
      <figure class="px-box is-sunk face-tile">
        <img class="oled" :src="oledSilky" alt="Cara: logo de Silky" />
        <figcaption><span>logo_silky</span><span class="muted">tuya</span></figcaption>
      </figure>
    </div>
  </section>
</template>
