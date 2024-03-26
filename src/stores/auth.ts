import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { Auth } from '@/services/Auth'

interface AuthUser extends User {
  isLoggedIn: boolean
}

export const useStore = defineStore('auth', () => {
  const user = ref<AuthUser | undefined>()

  user.value = {
    id: 2,
    email: 'janet.weaver@reqres.in',
    first_name: 'Janet',
    last_name: 'Weaver',
    avatar: 'https://reqres.in/img/faces/2-image.jpg',
    isLoggedIn: false
  }

  const login = async (user: { email: string }) => {
    await Auth.login(user.email)
  }

  return { user, login }
})
