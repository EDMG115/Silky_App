<script setup lang="ts">
import PixelIcon from '@/components/PixelIcon.vue'

const concepts = [
  { name: 'Movimiento', val: 100, ok: true },
  { name: 'Expresiones', val: 50, ok: false },
  { name: 'Ciclos', val: 40, ok: false },
  { name: 'Variables', val: 20, ok: false },
  { name: 'Condiciones', val: 0, ok: false },
  { name: 'Funciones', val: 0, ok: false },
]

const bars = [6, 9, 12, 11, 18, 14, 22, 26]

const activity = [
  { icon: 'check', text: 'Completaste ', strong: '#03 Ida y vuelta', time: 'hoy 18:42', pts: '+75' },
  { icon: 'play', text: 'Ejecutaste ', strong: 'patrulla_cuadrada', extra: ' (15 bloques)', time: 'hoy 18:10', pts: '' },
  { icon: 'image', text: 'Guardaste la cara ', strong: 'logo_silky', time: 'ayer 17:31', pts: '' },
  { icon: 'check', text: 'Completaste ', strong: '#02 Hola, mundo', time: 'ayer 17:05', pts: '+50' },
  { icon: 'check', text: 'Completaste ', strong: '#01 Primeros pasos', time: '22 oct', pts: '+50' },
]

const badges = [
  { icon: 'human-run', label: 'Primer paso', locked: false },
  { icon: 'mood-happy', label: 'Saludador', locked: false },
  { icon: 'speed-fast', label: 'Racha de 3', locked: false },
  { icon: 'image', label: 'Artista OLED', locked: false },
  { icon: 'lock', label: 'Maestro de ciclos', locked: true },
  { icon: 'lock', label: 'Lógico', locked: true },
  { icon: 'lock', label: 'Coreógrafo', locked: true },
  { icon: 'lock', label: 'Silky total', locked: true },
]
</script>

<template>
  <div class="kpis">
    <section class="px-box kpi is-hero">
      <div class="kpi__top"><span class="eyebrow">Puntos</span><PixelIcon name="coin" /></div>
      <div class="kpi__value">175 <small>/ 1000</small></div>
    </section>
    <section class="px-box kpi">
      <div class="kpi__top"><span class="eyebrow">Retos completados</span><PixelIcon name="flag" /></div>
      <div class="kpi__value">3 <small>/ 9</small></div>
    </section>
    <section class="px-box kpi">
      <div class="kpi__top"><span class="eyebrow">Racha</span><PixelIcon name="speed-fast" /></div>
      <div class="kpi__value">4 <small>días</small></div>
    </section>
    <section class="px-box kpi">
      <div class="kpi__top"><span class="eyebrow">Nivel</span><PixelIcon name="trophy" /></div>
      <div class="kpi__value">2 <small>Aprendiz</small></div>
    </section>
  </div>

  <div class="dash-grid">
    <div class="side">
      <section class="px-box px-card" aria-label="Avance">
        <div class="px-card__head"><h2>Avance del curso</h2><span class="data">33 %</span></div>
        <div class="px-progress" style="--val: 33" />
        <p class="muted">Siguiente reto: <b>#04 La patrulla cuadrada</b> · faltan 75 pts para el nivel 3.</p>
      </section>

      <section class="px-box px-card" aria-label="Avance por concepto">
        <h2>Avance por concepto</h2>
        <div class="concepts">
          <div v-for="c in concepts" :key="c.name" class="concept">
            <span class="concept__name">{{ c.name }}</span>
            <div class="px-progress is-thin" :class="{ 'is-ok': c.ok }" :style="{ '--val': c.val }" />
            <span class="concept__pct">{{ c.val }}%</span>
          </div>
        </div>
      </section>

      <section class="px-box px-card" aria-label="Bloques por sesión">
        <div class="px-card__head"><h2>Bloques usados por sesión</h2><span class="muted">últimas 8</span></div>
        <div class="bars">
          <div class="bars__axis"><span>30</span><span>20</span><span>10</span><span>0</span></div>
          <div class="bars__plot">
            <div
              v-for="(v, i) in bars"
              :key="i"
              class="bars__bar"
              :class="{ 'is-last': i === bars.length - 1 }"
              :style="{ '--v': v }"
            >
              <span>{{ v }}</span>
            </div>
          </div>
          <div class="bars__labels">
            <span v-for="n in 8" :key="n">S{{ n }}</span>
          </div>
        </div>
      </section>
    </div>

    <div class="side">
      <section class="px-box px-card" aria-label="Actividad reciente">
        <h2>Actividad reciente</h2>
        <ul class="plain activity">
          <li v-for="(row, i) in activity" :key="i">
            <PixelIcon :name="row.icon" />
            <span>{{ row.text }}<b>{{ row.strong }}</b>{{ row.extra }}<br /><time>{{ row.time }}</time></span>
            <span class="pts">{{ row.pts }}</span>
          </li>
        </ul>
      </section>

      <section class="px-box px-card" aria-label="Insignias">
        <div class="px-card__head"><h2>Insignias</h2><span class="data">4 / 8</span></div>
        <div class="badges">
          <div v-for="b in badges" :key="b.label" class="badge" :class="{ 'is-locked': b.locked }">
            <div class="badge__icon"><PixelIcon :name="b.icon" /></div>
            <span>{{ b.label }}</span>
          </div>
        </div>
      </section>

      <section class="px-box px-card" aria-label="Datos guardados">
        <div class="px-card__head">
          <h2><PixelIcon name="server" />Datos guardados</h2>
          <span class="px-chip">1.3 KB</span>
        </div>
        <pre class="px-console"><span class="c">localStorage["silky.progreso.v1"]</span>
{
  <span class="k">"puntos"</span>: <span class="n">175</span>,
  <span class="k">"nivel"</span>: <span class="n">2</span>,
  <span class="k">"racha"</span>: <span class="n">4</span>,
  <span class="k">"retos"</span>: { <span class="k">"01"</span>:<span class="s">"ok"</span>, <span class="k">"02"</span>:<span class="s">"ok"</span>,
             <span class="k">"03"</span>:<span class="s">"ok"</span>, <span class="k">"04"</span>:<span class="s">"en_curso"</span> },
  <span class="k">"actualizado"</span>: <span class="s">"2026-10-24T18:42"</span>
}</pre>
        <div class="px-btn-row">
          <button class="px-btn is-sm" type="button"><PixelIcon name="download" />Exportar JSON</button>
          <button class="px-btn is-sm is-ghost" type="button"><PixelIcon name="trash" />Reiniciar progreso</button>
        </div>
      </section>
    </div>
  </div>
</template>
