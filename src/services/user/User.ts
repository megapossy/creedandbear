import { useStore } from '@/stores/users'
import type { UserType } from '@/types/user'
import { EditUserSchema } from '@/types/user'
import { waits } from '@/utils/helpers'

export class User {
  private _userId: UserType['id'] | undefined
  private _store: ReturnType<typeof useStore>

  constructor(user: UserType['id'] | UserType) {
    this._store = useStore()

    if (typeof user === 'number') {
      this._userId = user
    } else if (user) {
      const _user = this._store.users.find((e) => e.id === user.id)
      if (_user) {
        this._userId = user.id
      } else {
        this._store.users = [user, ...this._store.users]
        this._userId = user.id
      }
    }
  }

  get data() {
    if (!this._userId) return
    else return this._store.users.find((e) => e.id === this._userId)
  }

  async edit(updateUser: { first_name: string; last_name: string; email: string }) {
    if (!this._userId || !this.data) return

    const toParse = {
      email: updateUser.email == '' ? undefined : updateUser.email,
      first_name: updateUser.first_name == '' ? undefined : updateUser.first_name,
      last_name: updateUser.last_name == '' ? undefined : updateUser.last_name
    }
    const parse = EditUserSchema.parse(toParse)
    await User.editAPI(updateUser)
    this.data.first_name = parse.first_name || this.data.first_name
    this.data.last_name = parse.last_name || this.data.last_name
    this.data.email = parse.email || this.data.email
  }

  private static async editAPI(user: { first_name: string; last_name: string; email: string }) {
    // fake api
    await waits(2000)
    return {
      status: 'success'
    }
    /////////////////////////////////
  }

  async delete() {
    if (!this._userId || !this.data) return

    await User.deleteAPI(this._userId)
    const fdIdx = this._store.users.findIndex((e) => e.id === this._userId)
    this._store.users.splice(fdIdx, 1)
  }

  
  private static async deleteAPI(userId: number) {
    // fake api
    await waits(2000)
    return {
      status: 'success'
    }
    /////////////////////////////////
  }

}
