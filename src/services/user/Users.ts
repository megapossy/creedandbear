import { useStore } from '@/stores/users'
import type { UserType } from '@/types/user'
import { User } from './User'

export class Users {
  private _store: ReturnType<typeof useStore>

  constructor() {
    this._store = useStore()
  }

  get data() {
    return this._store.users
  }

  get dataAsUsers(): User[]{
    const retVal:User[] = []
    this._store.users?.forEach(e=>{
      retVal.push(new User(e.id))
    })
    return retVal
  }

  get hasUsers() {
    return this._store.users?.length
  }

  getUser(userId: number){
    return new User(userId)
  }

  setUsersToStore(users: UserType[]) {
    this._store.users = [...users]
  }  
}

