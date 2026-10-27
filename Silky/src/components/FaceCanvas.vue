<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { drawOledFace } from '@/lib/pixel-art'

const props = defineProps<{
  face: string
}>()

const canvas = ref<HTMLCanvasElement | null>(null)

function paint() {
  if (canvas.value) drawOledFace(canvas.value, props.face)
}

onMounted(paint)
watch(() => props.face, paint)
</script>

<template>
  <canvas class="oled" ref="canvas" />
</template>
