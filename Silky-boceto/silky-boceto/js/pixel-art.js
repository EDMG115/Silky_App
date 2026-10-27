/* =====================================================================
   Silky · arte pixel generado en el navegador
   - Iconos: <i class="pi" data-icon="nombre"></i>
   - Robot:  <canvas data-robot data-face="feliz"></canvas>
             <canvas data-robot data-face-img="assets/oled-silky.png"></canvas>
   - Caras:  <canvas data-face="triste"></canvas>  (128×64, como la OLED)
   Solo dibuja; no hay lógica de la aplicación todavía.
   ===================================================================== */
(function () {
  const C = {
    paper: '#efece6', shade: '#b9b5ad', light: '#ffffff',
    silk: '#ad3043', silkHi: '#d4566a', silkLo: '#6b1a28',
    ink: '#0d0e1b', bezel: '#05060a', oled: '#e9f3ff', ground: '#090a14'
  };

  /* ---------- Iconos ---------- */
  function renderIcons(root = document) {
    const icons = window.SILKY_ICONS || {};
    root.querySelectorAll('.pi[data-icon]').forEach((el) => {
      const body = icons[el.dataset.icon];
      if (!body) return;
      el.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
    });
  }

  /* ---------- Caras OLED en rejilla de 32×16 ---------- */
  const FACES = {
    normal(p) {
      eye(p, 6, 4, 6, 7); eye(p, 20, 4, 6, 7);
    },
    feliz(p) {
      arc(p, 9, 6); arc(p, 23, 6);
      p(13, 12, 6, 1); p(12, 11, 1, 1); p(19, 11, 1, 1);
    },
    triste(p) {
      p(6, 7, 6, 3); p(8, 6, 4, 1); p(10, 5, 2, 1);
      p(20, 7, 6, 3); p(20, 6, 4, 1); p(20, 5, 2, 1);
      p(13, 13, 6, 1); p(12, 14, 1, 1); p(19, 14, 1, 1);
    },
    sorprendida(p) {
      ring(p, 5, 3, 8, 8); ring(p, 19, 3, 8, 8);
      p(8, 6, 2, 2); p(22, 6, 2, 2);
      ring(p, 14, 12, 4, 3);
    },
    dormida(p) {
      p(6, 8, 7, 1); p(5, 7, 1, 1); p(13, 7, 1, 1);
      p(19, 8, 7, 1); p(18, 7, 1, 1); p(26, 7, 1, 1);
      p(27, 1, 4, 1); p(29, 2, 1, 1); p(28, 3, 1, 1); p(27, 4, 4, 1);
    },
    enojada(p) {
      p(6, 6, 6, 5); p(20, 6, 6, 5);
      p(5, 3, 2, 1); p(7, 4, 2, 1); p(9, 5, 3, 1);
      p(25, 3, 2, 1); p(23, 4, 2, 1); p(20, 5, 3, 1);
      p(9, 6, 3, 1, 0); p(10, 7, 2, 1, 0); p(20, 6, 3, 1, 0); p(20, 7, 2, 1, 0);
    },
    corazon(p) {
      heart(p, 5, 4); heart(p, 19, 4);
    }
  };
  function eye(p, x, y, w, h) { p(x + 1, y, w - 2, h); p(x, y + 1, w, h - 2); }
  function arc(p, cx, y) { p(cx - 2, y, 5, 1); p(cx - 3, y + 1, 1, 2); p(cx + 3, y + 1, 1, 2); p(cx - 4, y + 3, 1, 1); p(cx + 4, y + 3, 1, 1); }
  function ring(p, x, y, w, h) { p(x + 1, y, w - 2, 1); p(x + 1, y + h - 1, w - 2, 1); p(x, y + 1, 1, h - 2); p(x + w - 1, y + 1, 1, h - 2); }
  function heart(p, x, y) {
    p(x + 1, y, 2, 1); p(x + 5, y, 2, 1);
    p(x, y + 1, 8, 2); p(x + 1, y + 3, 6, 1); p(x + 2, y + 4, 4, 1); p(x + 3, y + 5, 2, 1);
  }

  /** Dibuja una cara de 32×16 en ctx, en (ox, oy) con escala s. */
  function drawFace(ctx, name, ox, oy, s, color = C.oled) {
    const fn = FACES[name] || FACES.normal;
    fn((x, y, w, h, on = 1) => {
      ctx.fillStyle = on ? color : '#000';
      ctx.fillRect(ox + x * s, oy + y * s, w * s, h * s);
    });
  }

  /* ---------- Robot Silky (rejilla 64×56, escala 4) ---------- */
  function drawRobot(canvas) {
    const S = 4, W = 64, H = 56;
    canvas.width = W * S; canvas.height = H * S;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    const r = (x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(x * S, y * S, w * S, h * S); };

    // sombra en el piso
    r(8, 52, 48, 2, C.ground); r(12, 54, 40, 1, C.ground);

    // patas: exteriores abiertas, interiores rectas
    const leg = (x, y, h, footX, footW) => {
      r(x, y, 4, h, C.paper); r(x + 3, y, 1, h, C.shade);
      r(footX, y + h, footW, 3, C.paper); r(footX, y + h + 2, footW, 1, C.shade);
    };
    leg(5, 40, 8, 2, 8);  leg(21, 40, 9, 20, 7);
    leg(39, 40, 9, 37, 7); leg(55, 40, 8, 54, 8);
    // servos de cadera
    [[4, 36], [20, 36], [38, 36], [54, 36]].forEach(([x, y]) => {
      r(x, y, 6, 5, C.silk); r(x, y, 6, 1, C.silkHi); r(x + 5, y, 1, 5, C.silkLo); r(x + 2, y + 2, 2, 1, C.silkLo);
    });

    // cuerpo
    r(9, 9, 46, 28, C.paper);
    r(10, 8, 44, 1, C.paper); r(10, 37, 44, 1, C.shade);
    r(9, 9, 46, 1, C.light);
    r(53, 9, 2, 28, C.shade); r(9, 35, 46, 2, C.shade);

    // cuernos (guiño al dragón del logo)
    [[13, 7], [12, 6], [12, 5], [11, 4], [11, 3], [10, 2]].forEach(([x, y]) => r(x, y, 2, 1, C.silk));
    [[49, 7], [50, 6], [50, 5], [51, 4], [51, 3], [52, 2]].forEach(([x, y]) => r(x, y, 2, 1, C.silk));

    // listón rojo bajo la pantalla (como la cinta del logo)
    r(9, 32, 46, 2, C.silk); r(9, 32, 46, 1, C.silkHi);

    // bisel y pantalla OLED 32×16 en (16,13)
    r(14, 11, 36, 20, C.bezel);
    const ox = 16 * S, oy = 13 * S;
    ctx.fillStyle = '#000'; ctx.fillRect(ox, oy, 32 * S, 16 * S);

    if (canvas.dataset.faceImg) {
      const img = new Image();
      img.onload = () => { ctx.imageSmoothingEnabled = false; ctx.drawImage(img, ox, oy, 32 * S, 16 * S); };
      img.src = canvas.dataset.faceImg;
    } else {
      drawFace(ctx, canvas.dataset.face || 'normal', ox, oy, S);
    }
    // tornillos
    [[11, 11], [51, 11], [11, 28], [51, 28]].forEach(([x, y]) => r(x, y, 1, 1, C.shade));
  }

  function renderCanvases(root = document) {
    root.querySelectorAll('canvas[data-robot]').forEach(drawRobot);
    root.querySelectorAll('canvas[data-face]:not([data-robot])').forEach((cv) => {
      cv.width = 128; cv.height = 64;
      const ctx = cv.getContext('2d');
      ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 128, 64);
      drawFace(ctx, cv.dataset.face, 0, 0, 4);
    });
  }

  window.SilkyPixel = { renderIcons, renderCanvases, drawFace, FACES };
  document.addEventListener('DOMContentLoaded', () => { renderIcons(); renderCanvases(); });
})();
