<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import silkyLogo from '@/assets/silky-logo.png'
import silkyVideo from '@/assets/IA-EVA2-Silky_Video_3.mp4'
import { paintSplashFrame } from '@/lib/pixel-art'

const router = useRouter()
const video = ref<HTMLVideoElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
let raf = 0
let timer = 0

function enter() {
  router.push('/editor')
}

function loop(start: number) {
  const cv = canvas.value
  if (!cv) return
  const step = (now: number) => {
    paintSplashFrame(cv, (now - start) / 1000)
    raf = requestAnimationFrame(step)
  }
  raf = requestAnimationFrame(step)
}

onMounted(() => {
  const cv = canvas.value
  const vid = video.value
  if (!cv) return
  cv.width = 320
  cv.height = 180
  loop(performance.now())

  const stream = cv.captureStream(30)
  if (vid) {
    vid.srcObject = stream
    void vid.play()
  }

  timer = window.setTimeout(enter, 8200)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  window.clearTimeout(timer)
  const vid = video.value
  if (vid) vid.srcObject = null
})
</script>

<template>
  <section class="splash" @click="enter" @keydown.enter="enter" tabindex="0">
    <video
      ref="video"
      :src="silkyVideo"
      class="splash__video"
      autoplay
      muted
      loop
      playsinline
      aria-hidden="true"
    />
    <canvas ref="canvas" class="splash__canvas" aria-hidden="true" />
    <div class="splash__veil" />
    <div class="splash__content">
      <img class="splash__logo" :src="silkyLogo" alt="Silky" width="906" height="425" />
      <p class="eyebrow">programa · mira · aprende</p>
      <button class="px-btn is-primary is-lg" type="button" @click.stop="enter">Entrar</button>
    </div>
  </section>
</template>

<style scoped>
.splash {
  position: relative;
  isolation: isolate;
  min-height: 100%;
  display: grid;
  place-items: center;
  overflow: hidden;
  cursor: pointer;
  background: var(--ink);
}
.splash__video,
.splash__canvas,
.splash__veil {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.splash__video {
  object-fit: cover;
  z-index: 0;
  image-rendering: pixelated;
}
.splash__canvas {
  z-index: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  image-rendering: pixelated;
}
.splash__video {
  z-index: 1;
}
.splash__canvas {
  z-index: 0;
}
.splash__veil {
  z-index: 2;
  background: radial-gradient(ellipse at center, transparent 30%, #05060f 78%);
}
.splash__content {
  position: relative;
  z-index: 3;
  display: grid;
  justify-items: center;
  gap: var(--space-6);
  padding: var(--space-7);
  text-align: center;
}
.splash__logo {
  width: min(82vw, 720px);
  height: auto;
  image-rendering: auto;
  filter: drop-shadow(0 8px 0 #090a14);
}
.splash .eyebrow {
  color: var(--paper);
  letter-spacing: 0.18em;
}
</style>
