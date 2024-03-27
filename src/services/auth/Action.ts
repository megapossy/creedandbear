import { waits } from '@/utils/helpers'
import { UserSchema } from '@/types/user'
import { useStore as useAuthStore } from '@/stores/auth'
import { useStore as useUsersStore } from '@/stores/users'

import { faker } from '@faker-js/faker'

export class Action {
  static async logout() {
    const authStore = useAuthStore()
    authStore.user = undefined
    
    const usersStore = useUsersStore()
    usersStore.users = []
  }
  
  static async login(email: string) {
    UserSchema.shape.email.parse(email)

    // fake api
    await waits(2000)
    if (email !== 'superuser@creedandbear.com')
      throw new Error(`[{"message":"Invalid Login Credentials! Try superuser@creedandbear.com"}]`)
    const authStore = useAuthStore()
    const fakeAuthUser = {
      id: 1,
      email: 'superuser@creedandbear.com',
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      avatar: faker.image.avatar(),
      isLoggedIn: true
    }
    authStore.user = fakeAuthUser
    /////////////////////////////////
  }
}
