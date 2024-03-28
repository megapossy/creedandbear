import { useStore as useAuthStore } from '@/stores/auth'
import { useStore as useUsersStore } from '@/stores/users'
import { UserSchema } from '@/types/user'
import { waits } from '@/utils/helpers'

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

    const res = await Action.loginAPI(email)

    if (res.status == 'success') {
      const authStore = useAuthStore()
      authStore.user = {
        ...res.user,
        isLoggedIn: true
      }
    } else {
      throw new Error(`Invalid Credentials!`)
    }
  }

  private static async loginAPI(email: string) {
    // fake api
    if (email !== 'superuser@creedandbear.com')
      throw new Error(`Invalid Credentials! Try superuser@creedandbear.com`)
    await waits(2000)
    const user = {
      id: 1,
      email: 'superuser@creedandbear.com',
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      avatar: faker.image.avatar()
    }
    /////////////////////////////////

    return {
      status: 'success',
      user: {
        ...user
      }
    }
  }
}
