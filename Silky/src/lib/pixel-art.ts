const C = {
  paper: '#efece6',
  shade: '#b9b5ad',
  light: '#ffffff',
  silk: '#ad3043',
  silkHi: '#d4566a',
  silkLo: '#6b1a28',
  ink: '#0d0e1b',
  bezel: '#05060a',
  oled: '#e9f3ff',
  ground: '#090a14',
}

export type FaceName =
  | 'normal'
  | 'feliz'
  | 'triste'
  | 'sorprendida'
  | 'dormida'
  | 'enojada'
  | 'corazon'

type Plot = (x: number, y: number, w: number, h: number, on?: number) => void

function eye(p: Plot, x: number, y: number, w: number, h: number) {
  p(x + 1, y, w - 2, h)
  p(x, y + 1, w, h - 2)
}
function arc(p: Plot, cx: number, y: number) {
  p(cx - 2, y, 5, 1)
  p(cx - 3, y + 1, 1, 2)
  p(cx + 3, y + 1, 1, 2)
  p(cx - 4, y + 3, 1, 1)
  p(cx + 4, y + 3, 1, 1)
}
function ring(p: Plot, x: number, y: number, w: number, h: number) {
  p(x + 1, y, w - 2, 1)
  p(x + 1, y + h - 1, w - 2, 1)
  p(x, y + 1, 1, h - 2)
  p(x + w - 1, y + 1, 1, h - 2)
}
function heart(p: Plot, x: number, y: number) {
  p(x + 1, y, 2, 1)
  p(x + 5, y, 2, 1)
  p(x, y + 1, 8, 2)
  p(x + 1, y + 3, 6, 1)
  p(x + 2, y + 4, 4, 1)
  p(x + 3, y + 5, 2, 1)
}

const FACES: Record<FaceName, (p: Plot) => void> = {
  normal(p) {
    eye(p, 6, 4, 6, 7)
    eye(p, 20, 4, 6, 7)
  },
  feliz(p) {
    arc(p, 9, 6)
    arc(p, 23, 6)
    p(13, 12, 6, 1)
    p(12, 11, 1, 1)
    p(19, 11, 1, 1)
  },
  triste(p) {
    p(6, 7, 6, 3)
    p(8, 6, 4, 1)
    p(10, 5, 2, 1)
    p(20, 7, 6, 3)
    p(20, 6, 4, 1)
    p(20, 5, 2, 1)
    p(13, 13, 6, 1)
    p(12, 14, 1, 1)
    p(19, 14, 1, 1)
  },
  sorprendida(p) {
    ring(p, 5, 3, 8, 8)
    ring(p, 19, 3, 8, 8)
    p(8, 6, 2, 2)
    p(22, 6, 2, 2)
    ring(p, 14, 12, 4, 3)
  },
  dormida(p) {
    p(6, 8, 7, 1)
    p(5, 7, 1, 1)
    p(13, 7, 1, 1)
    p(19, 8, 7, 1)
    p(18, 7, 1, 1)
    p(26, 7, 1, 1)
    p(27, 1, 4, 1)
    p(29, 2, 1, 1)
    p(28, 3, 1, 1)
    p(27, 4, 4, 1)
  },
  enojada(p) {
    p(6, 6, 6, 5)
    p(20, 6, 6, 5)
    p(5, 3, 2, 1)
    p(7, 4, 2, 1)
    p(9, 5, 3, 1)
    p(25, 3, 2, 1)
    p(23, 4, 2, 1)
    p(20, 5, 3, 1)
    p(9, 6, 3, 1, 0)
    p(10, 7, 2, 1, 0)
    p(20, 6, 3, 1, 0)
    p(20, 7, 2, 1, 0)
  },
  corazon(p) {
    heart(p, 5, 4)
    heart(p, 19, 4)
  },
}

export function drawFace(
  ctx: CanvasRenderingContext2D,
  name: string,
  ox: number,
  oy: number,
  s: number,
  color = C.oled,
) {
  const fn = FACES[name as FaceName] ?? FACES.normal
  fn((x, y, w, h, on = 1) => {
    ctx.fillStyle = on ? color : '#000'
    ctx.fillRect(ox + x * s, oy + y * s, w * s, h * s)
  })
}

export function drawOledFace(canvas: HTMLCanvasElement, name: string) {
  canvas.width = 128
  canvas.height = 64
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, 128, 64)
  drawFace(ctx, name, 0, 0, 4)
}

export function drawRobot(
  canvas: HTMLCanvasElement,
  options: { face?: string; faceImg?: string } = {},
) {
  const S = 4
  const W = 64
  const H = 56
  canvas.width = W * S
  canvas.height = H * S
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.imageSmoothingEnabled = false
  const r = (x: number, y: number, w: number, h: number, c: string) => {
    ctx.fillStyle = c
    ctx.fillRect(x * S, y * S, w * S, h * S)
  }

  r(8, 52, 48, 2, C.ground)
  r(12, 54, 40, 1, C.ground)

  const leg = (x: number, y: number, h: number, footX: number, footW: number) => {
    r(x, y, 4, h, C.paper)
    r(x + 3, y, 1, h, C.shade)
    r(footX, y + h, footW, 3, C.paper)
    r(footX, y + h + 2, footW, 1, C.shade)
  }
  leg(5, 40, 8, 2, 8)
  leg(21, 40, 9, 20, 7)
  leg(39, 40, 9, 37, 7)
  leg(55, 40, 8, 54, 8)

  const hips: Array<[number, number]> = [
    [4, 36],
    [20, 36],
    [38, 36],
    [54, 36],
  ]
  hips.forEach(([x, y]) => {
    r(x, y, 6, 5, C.silk)
    r(x, y, 6, 1, C.silkHi)
    r(x + 5, y, 1, 5, C.silkLo)
    r(x + 2, y + 2, 2, 1, C.silkLo)
  })

  r(9, 9, 46, 28, C.paper)
  r(10, 8, 44, 1, C.paper)
  r(10, 37, 44, 1, C.shade)
  r(9, 9, 46, 1, C.light)
  r(53, 9, 2, 28, C.shade)
  r(9, 35, 46, 2, C.shade)

  const leftHorn: Array<[number, number]> = [
    [13, 7],
    [12, 6],
    [12, 5],
    [11, 4],
    [11, 3],
    [10, 2],
  ]
  const rightHorn: Array<[number, number]> = [
    [49, 7],
    [50, 6],
    [50, 5],
    [51, 4],
    [51, 3],
    [52, 2],
  ]
  leftHorn.forEach(([x, y]) => r(x, y, 2, 1, C.silk))
  rightHorn.forEach(([x, y]) => r(x, y, 2, 1, C.silk))

  r(9, 32, 46, 2, C.silk)
  r(9, 32, 46, 1, C.silkHi)

  r(14, 11, 36, 20, C.bezel)
  const ox = 16 * S
  const oy = 13 * S
  ctx.fillStyle = '#000'
  ctx.fillRect(ox, oy, 32 * S, 16 * S)

  if (options.faceImg) {
    const img = new Image()
    img.onload = () => {
      ctx.imageSmoothingEnabled = false
      ctx.drawImage(img, ox, oy, 32 * S, 16 * S)
    }
    img.src = options.faceImg
  } else {
    drawFace(ctx, options.face || 'normal', ox, oy, S)
  }

  const screws: Array<[number, number]> = [
    [11, 11],
    [51, 11],
    [11, 28],
    [51, 28],
  ]
  screws.forEach(([x, y]) => r(x, y, 1, 1, C.shade))
}

export function paintSplashFrame(canvas: HTMLCanvasElement, t: number) {
  const w = canvas.width
  const h = canvas.height
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.imageSmoothingEnabled = false
  ctx.fillStyle = '#05060f'
  ctx.fillRect(0, 0, w, h)

  const cell = 16
  for (let y = 0; y < h; y += cell) {
    for (let x = 0; x < w; x += cell) {
      const n = Math.sin((x + t * 40) * 0.01) + Math.cos((y - t * 20) * 0.012)
      if (n > 0.55) {
        ctx.fillStyle = n > 1.2 ? '#ad3043' : '#15172a'
        ctx.fillRect(x, y, 8, 8)
      }
    }
  }

  ctx.fillStyle = 'rgba(13,14,27,0.35)'
  for (let y = 0; y < h; y += 4) {
    if ((y + Math.floor(t * 30)) % 8 === 0) ctx.fillRect(0, y, w, 2)
  }

  const gx = w * (0.5 + Math.sin(t * 0.35) * 0.12)
  const gy = h * (0.42 + Math.cos(t * 0.28) * 0.08)
  const g = ctx.createRadialGradient(gx, gy, 20, gx, gy, Math.max(w, h) * 0.45)
  g.addColorStop(0, 'rgba(173,48,67,0.35)')
  g.addColorStop(1, 'rgba(5,6,15,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, w, h)
}
