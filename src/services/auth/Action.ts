import { waits } from '@/utils/helpers'
import { UserSchema } from '@/types/user'
import { useStore } from '@/stores/auth'

import { faker } from '@faker-js/faker'

export class Action {
  static async logout() {
    const userStore = useStore()
    userStore.user = undefined
  }
  
  static async login(email: string) {
    UserSchema.shape.email.parse(email)

    // fake api
    await waits(2000)
    if (email !== 'superuser@creedandbear.com')
      throw new Error(`[{"message":"Invalid Login Credentials! Try superuser@creedandbear.com"}]`)
    const userStore = useStore()
    const fakeAuthUser = {
      id: 1,
      email: 'superuser@creedandbear.com',
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      avatar: faker.image.avatar(),
      isLoggedIn: true
    }
    userStore.user = fakeAuthUser
    /////////////////////////////////
  }
}
