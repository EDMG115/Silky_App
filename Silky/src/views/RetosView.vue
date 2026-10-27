<script setup lang="ts">
import { computed, ref } from 'vue'
import PixelIcon from '@/components/PixelIcon.vue'

type ChallengeStatus = 'done' | 'current' | 'open' | 'locked'

const filter = ref('Todos')
const tabs = ['Todos', 'Movimiento', 'Expresiones', 'Lógica', 'Funciones'] as const

const challenges = [
  { num: '01', title: 'Primeros pasos', text: 'Haz que Silky camine 3 pasos hacia adelante y se detenga.', pts: 50, diff: 1, cat: 'Movimiento', status: 'done' as ChallengeStatus, blocks: ['al iniciar', 'caminar', 'detener'] },
  { num: '02', title: 'Hola, mundo', text: 'Muestra la cara feliz y saluda a quien tenga enfrente.', pts: 50, diff: 1, cat: 'Expresiones', status: 'done' as ChallengeStatus, blocks: ['mostrar cara', 'hacer saludar'] },
  { num: '03', title: 'Ida y vuelta', text: 'Avanza 4 pasos, gira 180° y regresa al punto de partida.', pts: 75, diff: 1, cat: 'Movimiento', status: 'done' as ChallengeStatus, blocks: ['caminar', 'girar'] },
  { num: '04', title: 'La patrulla cuadrada', text: 'Recorre un cuadrado usando un solo ciclo y cuenta los lados en una variable.', pts: 100, diff: 2, cat: 'Lógica', status: 'current' as ChallengeStatus, blocks: ['repetir', 'caminar', 'girar', 'variables'] },
  { num: '05', title: 'Contador en la cara', text: 'Cuenta cada paso con una variable y muestra el total en la pantalla OLED.', pts: 100, diff: 2, cat: 'Lógica', status: 'open' as ChallengeStatus, blocks: ['variables', 'mostrar texto', 'repetir'] },
  { num: '06', title: '¿Batería baja?', text: 'Si la batería baja de 30 %, muestra la cara dormida y siéntate.', pts: 125, diff: 2, cat: 'Lógica', status: 'locked' as ChallengeStatus, blocks: ['si / si no', 'batería %', 'comparar'] },
  { num: '07', title: 'Semáforo de emociones', text: 'Cambia la expresión según el valor de una variable: tres casos distintos.', pts: 150, diff: 3, cat: 'Expresiones', status: 'locked' as ChallengeStatus, blocks: ['si / si no si', 'variables', 'mostrar cara'] },
  { num: '08', title: 'Coreografía', text: 'Crea la función «baile» con 5 movimientos y llámala dos veces.', pts: 150, diff: 3, cat: 'Funciones', status: 'locked' as ChallengeStatus, blocks: ['funciones', 'hacer', 'esperar'] },
  { num: '09', title: 'Mi propia cara', text: 'Sube una imagen tuya y muéstrala al terminar un recorrido completo.', pts: 200, diff: 3, cat: 'Expresiones', status: 'locked' as ChallengeStatus, blocks: ['mostrar imagen', 'funciones', 'repetir'] },
]

const visible = computed(() =>
  filter.value === 'Todos' ? challenges : challenges.filter((c) => c.cat === filter.value),
)
</script>

<template>
  <section class="px-box summary" aria-label="Resumen">
    <div class="summary__item"><span class="eyebrow">Completados</span><span class="data">3 / 9</span></div>
    <div class="summary__item"><span class="eyebrow">Puntos</span><span class="data">175 / 1000</span></div>
    <div class="summary__item"><span class="eyebrow">Sigue</span><span class="data">#04</span></div>
    <div class="summary__bar">
      <span class="eyebrow">Avance de retos · 33 %</span>
      <div class="px-progress" style="--val: 33" />
    </div>
  </section>

  <div class="px-tabs" role="tablist" aria-label="Filtrar retos">
    <button
      v-for="tab in tabs"
      :key="tab"
      type="button"
      :class="{ 'is-on': filter === tab }"
      @click="filter = tab"
    >
      {{ tab }}
    </button>
  </div>

  <div class="challenges">
    <article
      v-for="item in visible"
      :key="item.num"
      class="px-box challenge"
      :class="{
        'is-done': item.status === 'done',
        'is-current': item.status === 'current',
        'is-locked': item.status === 'locked',
      }"
    >
      <div class="challenge__top">
        <span class="challenge__num">#{{ item.num }}</span>
        <div class="difficulty" :title="`Dificultad ${item.diff} de 3`">
          <i v-for="n in 3" :key="n" :class="{ on: n <= item.diff }" />
        </div>
      </div>
      <h2>{{ item.title }}</h2>
      <p>{{ item.text }}</p>
      <div class="px-field">
        <span class="px-label">Bloques disponibles</span>
        <div class="chip-row">
          <span v-for="block in item.blocks" :key="block" class="px-chip">{{ block }}</span>
        </div>
      </div>
      <div class="challenge__foot">
        <span class="challenge__pts"><PixelIcon name="coin" />{{ item.pts }}</span>
        <span v-if="item.status === 'done'" class="status is-done"><PixelIcon name="check" />Completado</span>
        <RouterLink v-else-if="item.status === 'current'" class="px-btn is-primary is-sm" to="/editor">
          <PixelIcon name="play" />Continuar
        </RouterLink>
        <RouterLink v-else-if="item.status === 'open'" class="px-btn is-sm" to="/editor">
          <PixelIcon name="arrow-right" />Empezar
        </RouterLink>
        <span v-else class="status is-locked"><PixelIcon name="lock" />Bloqueado</span>
      </div>
    </article>
  </div>
</template>
