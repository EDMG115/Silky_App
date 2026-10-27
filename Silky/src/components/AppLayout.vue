<script setup lang="ts">
import { useRoute } from 'vue-router'
import { navItems, session } from '@/lib/session'
import silkyLogo from '@/assets/silky-logo.png'
import PixelIcon from '@/components/PixelIcon.vue'

const route = useRoute()
</script>

<template>
  <div class="app">
    <aside class="sidebar">
      <div class="sidebar__logo">
        <img :src="silkyLogo" alt="Silky" width="906" height="425" />
        <p class="sidebar__tag">programa · mira · aprende</p>
      </div>
      <nav class="nav" aria-label="Módulos">
        <RouterLink v-for="item in navItems" :key="item.to" :to="item.to">
          <PixelIcon :name="item.icon" />
          <span>{{ item.label }}</span>
        </RouterLink>
      </nav>
      <div class="px-box player">
        <div class="player__row">
          <div class="player__avatar"><PixelIcon name="user" /></div>
          <div>
            <div class="player__name">{{ session.name }}</div>
            <div class="player__lvl">Nivel {{ session.level }} · {{ session.levelName }}</div>
          </div>
        </div>
        <div
          class="px-progress is-thin"
          :style="{ '--val': session.progress }"
          :title="`${session.points} de ${session.nextLevel} pts para nivel 3`"
        />
        <div class="player__lvl">{{ session.points }} / {{ session.nextLevel }} pts → nivel 3</div>
      </div>
    </aside>

    <div class="main">
      <header class="topbar">
        <div class="topbar__title">
          <span class="eyebrow">{{ route.meta.eyebrow }}</span>
          <h1>{{ route.meta.title }}</h1>
        </div>
        <div class="topbar__status">
          <span class="px-chip is-ok">
            <span class="led is-ok is-blink" />WiFi · {{ session.ping }} ms
          </span>
          <span class="px-chip"><PixelIcon name="battery-2" />{{ session.battery }}%</span>
          <span class="px-chip is-silk"><PixelIcon name="coin" />{{ session.points }} pts</span>
        </div>
      </header>
      <main class="content">
        <slot />
      </main>
    </div>
  </div>
</template>
