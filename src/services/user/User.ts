import { useStore } from '@/stores/users'
import type { UserType } from '@/types/user'

export class User {
  private _userId: UserType['id'] | undefined
  private _store: ReturnType<typeof useStore>

  constructor(user: UserType['id'] | UserType) {
    this._store = useStore()

    if (typeof user === 'number') {
      this._userId = user
    } else if (user) {
      if (this._store.getUserById(user.id)) {
        this._userId = user.id
      } else {
        this._store.users = [...this._store.users, user]
        this._userId = user.id
      }
    }
  }

  get data() {
    if (!this._userId) return
    else return this._store.getUserById(this._userId)
  }

  edit() {
    console.log(`EDITING: ${this.data?.id} ${this.data?.first_name} ${this.data?.last_name}`)
  }
}
