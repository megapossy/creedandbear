import type { UserType } from '@/types/user'
import { waits } from '@/utils/helpers'
import { CreateUserSchema } from '@/types/user'
import { useStore } from '@/stores/users'

import { faker } from '@faker-js/faker'

export class Action {
  static async createUser(newUser: { first_name: string; last_name: string; email: string }) {
    const parsed = CreateUserSchema.parse(newUser)
    const res = await Action.createUserAPI(parsed)
    const store = useStore()
    store.users = [
      {
        id: res.user.id,
        email: res.user.email,
        first_name: res.user.first_name,
        last_name: res.user.last_name,
        avatar: res.user.avatar
      },
      ...store.users
    ]
  }

  private static async createUserAPI(newUser: {
    first_name: string
    last_name: string
    email: string
  }) {
    // fake api
    await waits(2000)
    const user = {
      id: faker.number.int({ min: 100, max: 200 }),
      email: newUser.email,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
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
