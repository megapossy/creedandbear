import type { UserType } from '@/types/user'
import { waits } from '@/utils/helpers'

export class Fetch {
  async fetchUserById(userId: UserType['id']) {
    console.log('Fetching:', userId)
    
    // fake api
    await waits(2000)
    /////////////////////////////////
  }
}
