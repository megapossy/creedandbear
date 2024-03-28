import { Auth } from '@/services/auth/Auth'
import type { NavigationGuard } from 'vue-router'

export const auth: NavigationGuard = (to, from, next) => {
  if (to.meta?.authentication) {
    if (!Auth.isUserLoggedIn) {
      next({ name: 'login' })
      return
    }
  }
  next()
}
