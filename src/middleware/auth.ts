import type { NavigationGuard } from 'vue-router'

export const auth: NavigationGuard = (to, from, next) => {
  if (to.meta?.authentication) {
    console.log('NEEDS AUTH!')
    next({ name: 'login' })
    return
  }
  next()
}
