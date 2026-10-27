<script setup lang="ts">
import { computed } from 'vue'
import { iconSvg } from '@/lib/icons'

const props = defineProps<{ name: string }>()
const markup = computed(() => iconSvg(props.name))
</script>

<template>
  <i class="pi" :data-icon="name" v-html="markup" />
</template>
