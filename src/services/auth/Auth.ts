import { useStore } from '@/stores/auth'
export class Auth {

  static get data() {
    const store = useStore()
    return store.user
  }

  static get isUserLoggedIn() {
    const store = useStore()
    return !!store.user?.isLoggedIn
  }
}
