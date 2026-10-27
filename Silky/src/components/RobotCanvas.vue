<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { drawRobot } from '@/lib/pixel-art'

const props = defineProps<{
  face?: string
  faceImg?: string
}>()

const canvas = ref<HTMLCanvasElement | null>(null)

function paint() {
  if (canvas.value) drawRobot(canvas.value, { face: props.face, faceImg: props.faceImg })
}

onMounted(paint)
watch(() => [props.face, props.faceImg], paint)
</script>

<template>
  <canvas ref="canvas" />
</template>
