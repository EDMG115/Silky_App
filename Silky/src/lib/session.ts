export const session = {
  name: 'Estudiante',
  level: 2,
  levelName: 'Aprendiz',
  points: 175,
  nextLevel: 250,
  progress: 70,
  battery: 78,
  ping: 42,
}

export const navItems = [
  { to: '/editor', icon: 'code', label: 'Editor de bloques' },
  { to: '/retos', icon: 'flag', label: 'Retos' },
  { to: '/imagenes', icon: 'image', label: 'Imágenes cara' },
  { to: '/puntuacion', icon: 'trophy', label: 'Puntuación' },
  { to: '/conexion', icon: 'radio-signal', label: 'Conexión' },
] as const
