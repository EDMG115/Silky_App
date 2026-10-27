export {}

declare module 'vue-router' {
  interface RouteMeta {
    layout?: 'splash' | 'app'
    title?: string
    eyebrow?: string
  }
}
