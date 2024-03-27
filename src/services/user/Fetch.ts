import { type UserType } from '@/types/user'

import { useStore } from '@/stores/users'
import { faker } from '@faker-js/faker'

import { waits } from '@/utils/helpers'
import { computed, type Ref } from 'vue'
import { useFetch } from '@vueuse/core'

export class Fetch {
  static async fetchUserById(userId: UserType['id']) {
    console.log('Fetching:', userId)

    // fake api
    const createFakeUser = () => ({
      id: userId,
      email: faker.internet.email(),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      avatar: faker.image.avatar()
    })
    await waits(2000)
    return createFakeUser()
    /////////////////////////////////
  }

  static async fetchUsers() {
    console.log('Fetching USERS')

    // fake api
    const createFakeUser = () => ({
      id: faker.number.int({ min: 2, max: 100 }),
      email: faker.internet.email(),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      avatar: faker.image.avatar()
    })
    const users: UserType[] = faker.helpers.multiple(createFakeUser, {
      count: 50
    })
    await waits(2000)
    return users
    /////////////////////////////////
  }

  static createUseFetch(options: { page: Ref<number> }) {
    const url = computed(() => {
      return 'http://localhost:5173/' + options.page.value
    })
    return useFetch<{
      users: UserType[],
      page: number,
      total: number,
      total_pages: number,
    }>(url, {
      // fake api
      async afterFetch(ctx) {
        const createFakeUser = () => ({
          id: faker.number.int({ min: 2, max: 100 }),
          email: faker.internet.email(),
          first_name: faker.person.firstName(),
          last_name: faker.person.lastName(),
          avatar: faker.image.avatar()
        })
        const users: UserType[] = faker.helpers.multiple(createFakeUser, {
          count: 12
        })
        ctx.data = {
          users: users,
          page: options.page.value,
          total: 12,
          total_pages: 2
        }
        await waits(2000)
        return ctx
      },
      /////////////////////////////////
      refetch: true,
      immediate: false
    })
  }


}
