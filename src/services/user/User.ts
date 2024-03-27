import { useStore } from '@/stores/users'
import type { UserType } from '@/types/user'

export class User {
  private _userId: UserType['id']
  private _store: ReturnType<typeof useStore>

  constructor(userId: UserType['id']) {
    this._userId = userId
    this._store = useStore()
  }

  get data() {
    return this._store.getUserById(this._userId)
  }
}

