import { type UserType } from '@/types/user'

import { faker } from '@faker-js/faker'

import { waits } from '@/utils/helpers'
import { computed, type Ref } from 'vue'
import { useFetch } from '@vueuse/core'
import { Users } from '@/services/user/Users'

export class Fetch {
  static async userById(userId: UserType['id']) {
    const res = await Fetch.userByIdAPI(userId);
    return {
      ...res.user
    }
  }

  private static async userByIdAPI(userId: UserType['id']){
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
      return 'http://localhost:5173/' + options.page.value
      // return 'http://httpbin.org/status/500?' + options.page.value
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
          const users: UserType[] = faker.helpers.multiple(createFakeUser, {
            count: 12
          })
          ctx.data = {
            users: users,
            page: options.page.value,
            total: 120,
            total_pages: 10
          }
          await waits(2000)
          /////////////////////////////////

          // set to store
          Users.setUsersToStore(users)  
          
        }
        return ctx
      },
      refetch: true,
      immediate: false
    })
  }
}

function createFakeUser() {
  return {
    id: faker.number.int({ min: 2, max: 100 }),
    email: faker.internet.email(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    avatar: faker.image.avatar()
  }
}
