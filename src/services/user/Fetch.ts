import { UsersSchema, UserSchema, type UserType } from '@/types/user'

import { faker } from '@faker-js/faker'

import { waits } from '@/utils/helpers'
import { computed, type Ref } from 'vue'
import { useFetch } from '@vueuse/core'
import { Users } from '@/services/user/Users'

export class Fetch {
  static async userById(userId: UserType['id']) {
    const res = await Fetch.userByIdAPI(userId)
    const parsed = UserSchema.parse(res.user)
    return { ...parsed }
  }

  private static async userByIdAPI(userId: UserType['id']) {
    // fake api
    await waits(2000)
    const user = {
      id: userId,
      email: faker.internet.email(),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      avatar: faker.image.avatar()
    }
    /////////////////////////////////

    return {
      user: user
    }
  }

  static createUseFetchUsers(options: { page: Ref<number> }) {
    const url = computed(() => {
      // return 'https://httpbin.org/get?page=' + options.page.value
      return 'https://httpbin.org/delay/2?page=' + options.page.value
      // return 'http://httpbin.org/status/500?' + options.page.value // simulate error url
    })
    return useFetch<{
      users: UserType[]
      page: number
      total: number
      total_pages: number
    }>(url, {
      async afterFetch(ctx) {
        if (ctx.response.ok) {
          // fake DATA
          const users: UserType[] = faker.helpers.multiple(
            () => ({
              id: faker.number.int({ min: 2, max: 100 }),
              email: faker.internet.email(),
              first_name: faker.person.firstName(),
              last_name: faker.person.lastName(),
              avatar: faker.image.avatar()
            }),
            {
              count: 12
            }
          )
          ctx.data = {
            users: users,
            page: options.page.value,
            total: 120,
            total_pages: 10
          }
          /////////////////////////////////

          // set to store
          const parsed = UsersSchema.parse(users)
          Users.setUsersToStore(parsed)
        }
        return ctx
      },
      refetch: true,
      immediate: false
    })
  }
}
