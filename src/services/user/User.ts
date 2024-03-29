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
      // throw error if not found in store
      if (!this._store.users.find((e) => e.id === user)) throw new Error('User not found!')

      this._userId = user
    }
    // if object then search ins store
    else if (user) {
      const _user = this._store.users.find((e) => e.id === user.id)
      if (_user) {
        this._userId = user.id
      }
      // if not exist add to store
      else {
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
    const res = await User.editAPI(updateUser)

    // update store
    if (res.status == 'success') {
      if (parse.first_name) this.data.first_name = parse.first_name
      if (parse.last_name) this.data.last_name = parse.last_name
      if (parse.email) this.data.email = parse.email
    }
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

    const res = await User.deleteAPI(this._userId)

    // delete from store
    if (res.status == 'success') {
      const fdIdx = this._store.users.findIndex((e) => e.id === this._userId)
      this._store.users.splice(fdIdx, 1)
    }
  }

  static getUserFromStoreById(userId: number) {
    const store = useStore()
    return store.users.find((e) => e.id === userId)
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
