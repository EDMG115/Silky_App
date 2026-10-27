<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import AppLayout from '@/components/AppLayout.vue'

const route = useRoute()
const isSplash = computed(() => route.meta.layout === 'splash')
</script>

<template>
  <RouterView v-if="isSplash" />
  <AppLayout v-else>
    <RouterView />
  </AppLayout>
</template>
