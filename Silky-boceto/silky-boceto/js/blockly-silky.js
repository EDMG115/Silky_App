/* =====================================================================
   Silky · espacio de trabajo de Blockly (solo boceto visual)
   - Bloques a la medida: movimiento, expresiones y sensores.
   - Lógica de control con los bloques estándar de Blockly
     (variables, ciclos, condiciones y funciones).
   - Carga un programa de ejemplo (reto 4: "La patrulla cuadrada").
   Aún no genera ni envía comandos: eso llegará con la versión Vue.
   ===================================================================== */
(function () {
  if (!window.Blockly) {
    const el = document.getElementById('blocklyDiv');
    if (el) el.innerHTML = '<p class="muted" style="padding:24px">No se pudo cargar Blockly desde el CDN. Revisa tu conexión.</p>';
    return;
  }

  /* ---------- Tema pixel ---------- */
  const style = (p, s, t) => ({ colourPrimary: p, colourSecondary: s, colourTertiary: t });
  const theme = Blockly.Theme.defineTheme('silky', {
    base: Blockly.Themes.Classic,
    blockStyles: {
      evento_blocks:     style('#23263f', '#34385a', '#efece6'),
      movimiento_blocks: style('#ad3043', '#d4566a', '#6b1a28'),
      expresion_blocks:  style('#93395f', '#b85a83', '#5a1f3a'),
      sensor_blocks:     style('#5d6283', '#7a80a6', '#3a3e5e'),
      loop_blocks:       style('#7c2232', '#a03447', '#4d1420'),
      logic_blocks:      style('#4b4f6e', '#6a6f94', '#2f3248'),
      math_blocks:       style('#3e4260', '#585d86', '#272a40'),
      text_blocks:       style('#5d6283', '#7a80a6', '#3a3e5e'),
      variable_blocks:   style('#8a5a63', '#a87781', '#5a3940'),
      variable_dynamic_blocks: style('#8a5a63', '#a87781', '#5a3940'),
      procedure_blocks:  style('#5a2d3a', '#7b4252', '#3a1b25'),
      list_blocks:       style('#4b4f6e', '#6a6f94', '#2f3248'),
      colour_blocks:     style('#4b4f6e', '#6a6f94', '#2f3248')
    },
    categoryStyles: {
      evento_category:     { colour: '#efece6' },
      movimiento_category: { colour: '#ad3043' },
      expresion_category:  { colour: '#93395f' },
      sensor_category:     { colour: '#5d6283' },
      logic_category:      { colour: '#4b4f6e' },
      loop_category:       { colour: '#7c2232' },
      math_category:       { colour: '#3e4260' },
      variable_category:   { colour: '#8a5a63' },
      procedure_category:  { colour: '#5a2d3a' }
    },
    componentStyles: {
      workspaceBackgroundColour: '#11132a',
      toolboxBackgroundColour: '#0b0c18',
      toolboxForegroundColour: '#efece6',
      flyoutBackgroundColour: '#1b1e36',
      flyoutForegroundColour: '#efece6',
      flyoutOpacity: 0.97,
      scrollbarColour: '#34385a',
      scrollbarOpacity: 1,
      insertionMarkerColour: '#ffffff',
      insertionMarkerOpacity: 0.35,
      cursorColour: '#d4566a',
      selectedGlowColour: '#ffffff'
    },
    fontStyle: { family: '"Pixelify Sans", "Trebuchet MS", sans-serif', weight: '500', size: 12 },
    startHats: true
  });

  /* ---------- Bloques propios de Silky ---------- */
  Blockly.defineBlocksWithJsonArray([
    { type: 'silky_al_iniciar', message0: '▶ al iniciar', nextStatement: null, style: 'evento_blocks',
      tooltip: 'Aquí empieza el programa del robot.' },

    // Movimiento
    { type: 'silky_caminar', message0: 'caminar %1 %2 pasos',
      args0: [
        { type: 'field_dropdown', name: 'DIR', options: [['adelante', 'FWD'], ['atrás', 'BACK']] },
        { type: 'input_value', name: 'STEPS', check: 'Number' }],
      inputsInline: true, previousStatement: null, nextStatement: null, style: 'movimiento_blocks' },
    { type: 'silky_girar', message0: 'girar %1 %2 °',
      args0: [
        { type: 'field_dropdown', name: 'DIR', options: [['a la derecha', 'R'], ['a la izquierda', 'L']] },
        { type: 'input_value', name: 'ANGLE', check: 'Number' }],
      inputsInline: true, previousStatement: null, nextStatement: null, style: 'movimiento_blocks' },
    { type: 'silky_accion', message0: 'hacer %1',
      args0: [{ type: 'field_dropdown', name: 'ACTION', options: [
        ['saludar', 'wave'], ['bailar', 'dance'], ['sentarse', 'sit'], ['levantarse', 'stand'], ['estirarse', 'stretch']] }],
      previousStatement: null, nextStatement: null, style: 'movimiento_blocks' },
    { type: 'silky_esperar', message0: 'esperar %1 segundos',
      args0: [{ type: 'input_value', name: 'SECS', check: 'Number' }],
      inputsInline: true, previousStatement: null, nextStatement: null, style: 'movimiento_blocks' },
    { type: 'silky_detener', message0: '■ detener motores',
      previousStatement: null, nextStatement: null, style: 'movimiento_blocks' },

    // Expresiones
    { type: 'silky_cara', message0: 'mostrar cara %1',
      args0: [{ type: 'field_dropdown', name: 'FACE', options: [
        ['feliz', 'feliz'], ['triste', 'triste'], ['sorprendida', 'sorprendida'],
        ['dormida', 'dormida'], ['enojada', 'enojada'], ['corazón', 'corazon']] }],
      previousStatement: null, nextStatement: null, style: 'expresion_blocks' },
    { type: 'silky_parpadear', message0: 'parpadear %1 veces',
      args0: [{ type: 'input_value', name: 'TIMES', check: 'Number' }],
      inputsInline: true, previousStatement: null, nextStatement: null, style: 'expresion_blocks' },
    { type: 'silky_texto', message0: 'mostrar texto %1',
      args0: [{ type: 'input_value', name: 'TEXT' }],
      inputsInline: true, previousStatement: null, nextStatement: null, style: 'expresion_blocks' },
    { type: 'silky_imagen', message0: 'mostrar imagen %1',
      args0: [{ type: 'field_dropdown', name: 'IMG', options: [['logo_silky', 'logo_silky'], ['mi_cara', 'mi_cara']] }],
      previousStatement: null, nextStatement: null, style: 'expresion_blocks' },

    // Sensores
    { type: 'silky_bateria', message0: 'batería %', output: 'Number', style: 'sensor_blocks' },
    { type: 'silky_tiempo', message0: 'segundos desde el inicio', output: 'Number', style: 'sensor_blocks' }
  ]);

  /* ---------- Paleta (toolbox) ---------- */
  const num = (n) => ({ shadow: { type: 'math_number', fields: { NUM: n } } });
  const toolbox = {
    kind: 'categoryToolbox',
    contents: [
      { kind: 'category', name: 'Eventos', categorystyle: 'evento_category', contents: [
        { kind: 'block', type: 'silky_al_iniciar' }] },
      { kind: 'category', name: 'Movimiento', categorystyle: 'movimiento_category', contents: [
        { kind: 'block', type: 'silky_caminar', inputs: { STEPS: num(2) } },
        { kind: 'block', type: 'silky_girar', inputs: { ANGLE: num(90) } },
        { kind: 'block', type: 'silky_accion' },
        { kind: 'block', type: 'silky_esperar', inputs: { SECS: num(1) } },
        { kind: 'block', type: 'silky_detener' }] },
      { kind: 'category', name: 'Expresiones', categorystyle: 'expresion_category', contents: [
        { kind: 'block', type: 'silky_cara' },
        { kind: 'block', type: 'silky_parpadear', inputs: { TIMES: num(2) } },
        { kind: 'block', type: 'silky_texto', inputs: { TEXT: { shadow: { type: 'text', fields: { TEXT: '¡Hola!' } } } } },
        { kind: 'block', type: 'silky_imagen' }] },
      { kind: 'category', name: 'Sensores', categorystyle: 'sensor_category', contents: [
        { kind: 'block', type: 'silky_bateria' },
        { kind: 'block', type: 'silky_tiempo' }] },
      { kind: 'sep' },
      { kind: 'category', name: 'Condiciones', categorystyle: 'logic_category', contents: [
        { kind: 'block', type: 'controls_if' },
        { kind: 'block', type: 'logic_compare' },
        { kind: 'block', type: 'logic_operation' },
        { kind: 'block', type: 'logic_negate' },
        { kind: 'block', type: 'logic_boolean' }] },
      { kind: 'category', name: 'Ciclos', categorystyle: 'loop_category', contents: [
        { kind: 'block', type: 'controls_repeat_ext', inputs: { TIMES: num(4) } },
        { kind: 'block', type: 'controls_whileUntil' },
        { kind: 'block', type: 'controls_for' }] },
      { kind: 'category', name: 'Números', categorystyle: 'math_category', contents: [
        { kind: 'block', type: 'math_number' },
        { kind: 'block', type: 'math_arithmetic' },
        { kind: 'block', type: 'math_random_int', inputs: { FROM: num(1), TO: num(10) } }] },
      { kind: 'category', name: 'Variables', categorystyle: 'variable_category', custom: 'VARIABLE' },
      { kind: 'category', name: 'Funciones', categorystyle: 'procedure_category', custom: 'PROCEDURE' }
    ]
  };

  /* ---------- Programa de ejemplo ---------- */
  const chain = (...blocks) => {
    for (let i = 0; i < blocks.length - 1; i++) blocks[i].next = { block: blocks[i + 1] };
    return blocks[0];
  };
  const lados = { id: 'v_lados' };

  const programa = chain(
    { type: 'silky_al_iniciar', x: 24, y: 24 },
    { type: 'silky_cara', fields: { FACE: 'feliz' } },
    { type: 'variables_set', fields: { VAR: lados }, inputs: { VALUE: { block: { type: 'math_number', fields: { NUM: 0 } } } } },
    { type: 'controls_repeat_ext', inputs: {
        TIMES: num(4),
        DO: { block: chain(
          { type: 'silky_caminar', fields: { DIR: 'FWD' }, inputs: { STEPS: num(2) } },
          { type: 'silky_girar', fields: { DIR: 'R' }, inputs: { ANGLE: num(90) } },
          { type: 'math_change', fields: { VAR: lados }, inputs: { DELTA: num(1) } }
        ) } } },
    { type: 'controls_if', inputs: {
        IF0: { block: { type: 'logic_compare', fields: { OP: 'EQ' }, inputs: {
          A: { block: { type: 'variables_get', fields: { VAR: lados } } },
          B: { block: { type: 'math_number', fields: { NUM: 4 } } } } } },
        DO0: { block: chain(
          { type: 'silky_texto', inputs: { TEXT: { shadow: { type: 'text', fields: { TEXT: '¡Cuadrado!' } } } } },
          { type: 'procedures_callnoreturn', extraState: { name: 'festejar' } }
        ) } } }
  );

  const festejar = {
    type: 'procedures_defnoreturn', x: 400, y: 40, fields: { NAME: 'festejar' },
    inputs: { STACK: { block: chain(
      { type: 'silky_accion', fields: { ACTION: 'dance' } },
      { type: 'silky_parpadear', inputs: { TIMES: num(2) } },
      { type: 'silky_cara', fields: { FACE: 'corazon' } }
    ) } }
  };

  const estado = {
    blocks: { languageVersion: 0, blocks: [programa, festejar] },
    variables: [{ name: 'lados', id: 'v_lados' }]
  };

  /* ---------- Inyección ---------- */
  function init() {
    const ws = Blockly.inject('blocklyDiv', {
      toolbox, theme,
      renderer: 'geras',
      grid: { spacing: 24, length: 2, colour: '#2a2e4d', snap: true },
      zoom: { controls: false, wheel: true, startScale: 0.95, maxScale: 2, minScale: 0.4 },
      trashcan: false,
      move: { scrollbars: true, drag: true, wheel: false },
      sounds: false
    });
    Blockly.serialization.workspaces.load(estado, ws);
    window.silkyWorkspace = ws;
  }

  // Blockly mide el texto al dibujar: esperamos a que cargue la fuente pixel.
  const ready = document.fonts && document.fonts.load
    ? Promise.all([document.fonts.load('500 12px "Pixelify Sans"'), document.fonts.ready])
    : Promise.resolve();
  ready.then(init, init);
})();
