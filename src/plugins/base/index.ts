import { type App } from 'vue'

export default {
  install: (app: App) => {
    const ui = import.meta.glob('./ui/**/*.vue', { eager: true })
    const transitions = import.meta.glob('./transitions/**/*.vue', { eager: true })

    const comps = {
      ...ui,
      ...transitions
    }

    Object.entries(comps).forEach(([path, component]) => {
      if (!path || !path.split('/').length) return
      const componentName = path
        .split('/')
        .pop()
        ?.replace(/\.\w+$/, '')
      if (!componentName) return
      app.component(componentName, (component as any).default)
    })
  }
}
