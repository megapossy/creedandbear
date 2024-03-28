import type { NavigationGuard } from 'vue-router'

export const redirect: NavigationGuard = (to, from, next) => {
  const redirectTo = to.matched[to.matched.length-1].meta?.redirectTo;
  if (typeof redirectTo === 'string') {
      next({ name: redirectTo })
      return
  }
  next()
}
