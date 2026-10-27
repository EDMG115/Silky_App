import { createRouter, createWebHistory } from 'vue-router'
import SplashView from '@/views/SplashView.vue'
import EditorView from '@/views/EditorView.vue'
import RetosView from '@/views/RetosView.vue'
import ImagenesView from '@/views/ImagenesView.vue'
import DashboardView from '@/views/DashboardView.vue'
import ConexionView from '@/views/ConexionView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'splash',
      component: SplashView,
      meta: { layout: 'splash', title: 'Silky' },
    },
    {
      path: '/editor',
      name: 'editor',
      component: EditorView,
      meta: { title: 'Editor de bloques', eyebrow: 'Módulo · Editor' },
    },
    {
      path: '/retos',
      name: 'retos',
      component: RetosView,
      meta: { title: 'Retos', eyebrow: 'Módulo · Retos' },
    },
    {
      path: '/imagenes',
      name: 'imagenes',
      component: ImagenesView,
      meta: { title: 'Imágenes para la cara', eyebrow: 'Módulo · Cara OLED' },
    },
    {
      path: '/puntuacion',
      name: 'puntuacion',
      component: DashboardView,
      meta: { title: 'Tu puntuación', eyebrow: 'Módulo · Dashboard' },
    },
    {
      path: '/conexion',
      name: 'conexion',
      component: ConexionView,
      meta: { title: 'Conexión con el robot', eyebrow: 'Módulo · Conexión' },
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} · Silky` : 'Silky'
})

export default router
