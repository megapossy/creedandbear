import type { UserType } from '@/types/user'
import { waits } from '@/utils/helpers'

export class Action {
  static async create(newUser: UserType) {
    console.log('Creating:', newUser)

    // fake api
    await waits(2000)
    /////////////////////////////////
  }
}