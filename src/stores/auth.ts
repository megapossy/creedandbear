import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { UserType } from '@/types/user'
import { faker } from '@faker-js/faker'

interface AuthUser extends UserType {
  isLoggedIn: boolean
}

const useStore = defineStore('auth', () => {
  const user = ref<AuthUser | undefined>()

  // TODO: Remove this, testing only
  user.value = {
    id: 1,
    email: 'superuser@creedandbear.com',
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    avatar: faker.image.avatar(),
    isLoggedIn: true
  }
  ///////////////////

  return { user }
})

// For localStorage
// const store = useStore()
// store.$subscribe(
//   (mutation, state) => {
//     localStorage.setItem('auth', JSON.stringify(state))
//   },
//   { detached: true }
// )

export { useStore }
