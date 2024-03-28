import { useStore } from '@/stores/users'
import type { UserType } from '@/types/user'
import { User } from './User'

export class Users {


  static get data() {
    const store = useStore()
    return store.users
  }

  static get dataAsUsers(): User[]{
    const store = useStore()
    const retVal:User[] = []
    store.users?.forEach(e=>{
      retVal.push(new User(e.id))
    })
    return retVal
  }

  static get hasUsers() {
    const store = useStore()
    return store.users?.length
  }

  static getUser(userId: number){
    return new User(userId)
  }

  static setUsersToStore(users: UserType[]) {
    const store = useStore()
    store.users = [...users]
  }  
}

