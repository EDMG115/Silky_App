<script setup lang="ts">
import PixelIcon from '@/components/PixelIcon.vue'
import RobotCanvas from '@/components/RobotCanvas.vue'
</script>

<template>
  <section class="px-box is-silk mission" aria-label="Reto en curso">
    <div class="mission__badge">04</div>
    <div class="mission__text">
      <span class="eyebrow">Reto en curso</span>
      <h2>La patrulla cuadrada</h2>
      <p class="muted">
        Haz que Silky recorra un cuadrado con un ciclo <b>repetir</b> y cuenta los lados con una
        variable.
      </p>
    </div>
    <div class="mission__pts">
      <span class="eyebrow">Recompensa</span>
      <div class="data">+100 pts</div>
    </div>
  </section>

  <div class="editor">
    <section class="px-box workspace" aria-label="Espacio de trabajo">
      <div class="workspace__bar">
        <div class="px-btn-row">
          <span class="px-label">Programa</span>
          <span class="data">patrulla_cuadrada</span>
        </div>
        <div class="px-btn-row">
          <button class="px-btn is-sm is-ghost" type="button" aria-label="Alejar">
            <PixelIcon name="zoom-out" />
          </button>
          <button class="px-btn is-sm is-ghost" type="button" aria-label="Acercar">
            <PixelIcon name="zoom-in" />
          </button>
          <button class="px-btn is-sm is-ghost" type="button">
            <PixelIcon name="trash" />Limpiar
          </button>
          <button class="px-btn is-sm is-ghost" type="button">
            <PixelIcon name="download" />Exportar
          </button>
          <button class="px-btn is-sm" type="button"><PixelIcon name="save" />Guardar</button>
        </div>
      </div>
      <div class="workspace__stage">
        <p>El editor de bloques (Blockly) se conectará en un siguiente paso. El espacio ya está listo.</p>
      </div>
      <div class="workspace__foot">
        <span>15 bloques · 1 variable · 1 función</span>
        <span><PixelIcon name="save" /> guardado en localStorage hace 2 min</span>
      </div>
    </section>

    <aside class="side">
      <section class="px-box px-card" aria-label="Robot">
        <div class="px-card__head">
          <h2><PixelIcon name="android" />Silky</h2>
          <span class="px-chip is-warn"><span class="led is-warn is-blink" />Ejecutando</span>
        </div>
        <div class="robot-stage">
          <RobotCanvas face="feliz" aria-label="Silky con cara feliz" />
        </div>
        <div class="robot-state"><span class="muted">Instrucción</span><span>caminar adelante 2</span></div>
        <div class="px-progress is-thin" style="--val: 36" />
        <div class="robot-state"><span class="muted">Paso</span><span>5 / 14</span></div>
        <div class="run-controls">
          <button class="px-btn is-primary is-lg is-wide" type="button">
            <PixelIcon name="play" />Ejecutar
          </button>
          <button class="px-btn" type="button"><PixelIcon name="next" />Paso</button>
          <button class="px-btn is-light" type="button"><PixelIcon name="debug-stop" />Detener</button>
        </div>
        <p class="muted">Se envía por WiFi a <span class="data">192.168.4.1</span></p>
      </section>

      <section class="px-box px-card" aria-label="Comandos generados">
        <div class="px-card__head">
          <h2><PixelIcon name="script-text" />Comandos</h2>
          <span class="px-chip">JSON</span>
        </div>
        <pre class="px-console" style="max-height: 250px"><span class="c">// POST /api/cmd · 14 comandos</span>
[
 {<span class="k">"cmd"</span>:<span class="s">"face"</span>, <span class="k">"name"</span>:<span class="s">"feliz"</span>},
 {<span class="k">"cmd"</span>:<span class="s">"walk"</span>, <span class="k">"dir"</span>:<span class="s">"fwd"</span>, <span class="k">"steps"</span>:<span class="n">2</span>},
 {<span class="k">"cmd"</span>:<span class="s">"turn"</span>, <span class="k">"dir"</span>:<span class="s">"R"</span>, <span class="k">"deg"</span>:<span class="n">90</span>},
 {<span class="k">"cmd"</span>:<span class="s">"walk"</span>, <span class="k">"dir"</span>:<span class="s">"fwd"</span>, <span class="k">"steps"</span>:<span class="n">2</span>},
 {<span class="k">"cmd"</span>:<span class="s">"turn"</span>, <span class="k">"dir"</span>:<span class="s">"R"</span>, <span class="k">"deg"</span>:<span class="n">90</span>},
 <span class="c">  … ×2 más</span>
 {<span class="k">"cmd"</span>:<span class="s">"text"</span>, <span class="k">"value"</span>:<span class="s">"¡Cuadrado!"</span>},
 {<span class="k">"cmd"</span>:<span class="s">"dance"</span>},
 {<span class="k">"cmd"</span>:<span class="s">"blink"</span>, <span class="k">"times"</span>:<span class="n">2</span>},
 {<span class="k">"cmd"</span>:<span class="s">"face"</span>, <span class="k">"name"</span>:<span class="s">"corazon"</span>}
]</pre>
      </section>
    </aside>
  </div>
</template>
