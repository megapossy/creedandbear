import { waits } from '@/utils/helpers'
export class User {
  static async create(newUser: User) {
    console.log('Creating:', newUser)
    await waits(2000)
  }
}
