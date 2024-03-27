import { useStore } from '@/stores/auth'
export class Auth {
  private _store: ReturnType<typeof useStore>

  constructor() {
    this._store = useStore()
  }

  get data() {
    return this._store.user
  }

  get isUserLoggedIn() {
    return !!this._store.user?.isLoggedIn
  }
}
