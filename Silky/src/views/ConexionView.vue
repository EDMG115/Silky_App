<script setup lang="ts">
import PixelIcon from '@/components/PixelIcon.vue'

const pings = [38, 41, 35, 44, 52, 39, 31, 40, 47, 68, 42, 36, 39, 45, 41, 33, 62, 40, 38, 43]
</script>

<template>
  <section class="px-box is-strong link-hero" aria-label="Estado del enlace">
    <div class="link-hero__icon"><PixelIcon name="radio-signal" /></div>
    <div>
      <span class="eyebrow">Estado del enlace</span>
      <h2>Conectado por WiFi</h2>
      <span class="data">silky-esp32 · 192.168.4.1 · desde hace 12 min</span>
    </div>
    <button class="px-btn is-light" type="button"><PixelIcon name="close" />Desconectar</button>
  </section>

  <div class="conn-grid">
    <section class="px-box px-card" aria-label="Bluetooth">
      <div class="px-card__head">
        <h2><PixelIcon name="bluetooth" />Bluetooth (BLE)</h2>
        <span class="px-chip is-warn"><span class="led is-warn" />Sin emparejar</span>
      </div>
      <p class="muted">Usa Web Bluetooth. Disponible en Chrome y Edge de escritorio y en Android.</p>
      <dl class="kv">
        <dt>Nombre anunciado</dt>
        <dd>Silky-ESP32</dd>
        <dt>Servicio</dt>
        <dd>Nordic UART</dd>
        <dt>UUID</dt>
        <dd>6e400001-b5a3-f393-e0a9-e50e24dcca9e</dd>
        <dt>Alcance aprox.</dt>
        <dd>10 m</dd>
      </dl>
      <div class="px-btn-row">
        <button class="px-btn is-primary" type="button"><PixelIcon name="bluetooth" />Buscar robot</button>
      </div>
    </section>

    <section class="px-box px-card is-silk" aria-label="WiFi">
      <div class="px-card__head">
        <h2><PixelIcon name="radio-tower" />WiFi · API JSON</h2>
        <span class="px-chip is-ok"><span class="led is-ok" />Conectado</span>
      </div>
      <div class="field-row">
        <div class="px-field">
          <label for="ip">Dirección IP</label>
          <input class="px-input" id="ip" value="192.168.4.1" />
        </div>
        <div class="px-field">
          <label for="port">Puerto</label>
          <input class="px-input" id="port" value="80" />
        </div>
      </div>
      <dl class="kv is-list">
        <dt><span class="method-tag">POST</span></dt>
        <dd>/api/cmd — lista de comandos</dd>
        <dt><span class="method-tag">POST</span></dt>
        <dd>/api/face — mapa de bits 128×64</dd>
        <dt><span class="method-tag">GET</span></dt>
        <dd>/api/status — batería, señal</dd>
        <dt><span class="method-tag">GET</span></dt>
        <dd>/api/ping — prueba de latencia</dd>
      </dl>
      <div class="px-btn-row">
        <button class="px-btn" type="button"><PixelIcon name="sync" />Reconectar</button>
        <button class="px-btn is-ghost" type="button"><PixelIcon name="info-box" />Ver /api/status</button>
      </div>
    </section>
  </div>

  <section class="px-box px-card" aria-label="Prueba de latencia">
    <div class="px-card__head">
      <h2><PixelIcon name="zap" />Prueba de latencia</h2>
      <button class="px-btn is-primary is-sm" type="button"><PixelIcon name="play" />Probar (20 pings)</button>
    </div>
    <div class="latency">
      <div class="latency__stats">
        <div><span class="eyebrow">Promedio</span><div class="data">43 <small>ms</small></div></div>
        <div><span class="eyebrow">Pérdida</span><div class="data">0 <small>%</small></div></div>
        <div><span class="eyebrow">Mínimo</span><div class="data">31 <small>ms</small></div></div>
        <div><span class="eyebrow">Máximo</span><div class="data">68 <small>ms</small></div></div>
      </div>
      <div>
        <div class="pings" aria-label="Latencia de 20 pings, entre 31 y 68 ms">
          <i v-for="(ms, i) in pings" :key="i" :class="{ hi: ms >= 60 }" :style="{ '--ms': ms }" :title="`${ms} ms`" />
        </div>
        <div class="pings__axis">
          <span>ping 1</span>
          <span>escala 0–80 ms · amarillo ≥ 60 ms</span>
          <span>20</span>
        </div>
      </div>
    </div>
  </section>

  <div class="conn-grid">
    <section class="px-box px-card" aria-label="Dispositivo">
      <h2><PixelIcon name="monitor" />Dispositivo</h2>
      <dl class="kv">
        <dt>Placa</dt>
        <dd>ESP32</dd>
        <dt>Firmware</dt>
        <dd>silky-fw 0.3.1</dd>
        <dt>MAC</dt>
        <dd>3C:71:BF:··:··:A4</dd>
        <dt>Señal WiFi</dt>
        <dd>−58 dBm</dd>
        <dt>Batería</dt>
        <dd>78 % · 7.6 V</dd>
        <dt>Encendido</dt>
        <dd>34 min</dd>
      </dl>
    </section>
    <section class="px-box px-card" aria-label="Registro">
      <div class="px-card__head"><h2><PixelIcon name="script-text" />Registro</h2><span class="muted">últimos 6</span></div>
      <pre class="px-console" style="max-height: 220px"><span class="c">18:42:07</span> <span class="k">→</span> GET  /api/ping
<span class="c">18:42:07</span> <span class="n">←</span> 200  {"pong":true}  <span class="s">38 ms</span>
<span class="c">18:41:55</span> <span class="k">→</span> POST /api/cmd  14 comandos
<span class="c">18:41:55</span> <span class="n">←</span> 200  {"ok":true,"queued":14}
<span class="c">18:30:12</span> <span class="k">→</span> GET  /api/status
<span class="c">18:30:12</span> <span class="n">←</span> 200  {"bat":78,"rssi":-58}</pre>
    </section>
  </div>
</template>
