import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { UserType } from '@/types/user'

export const useStore = defineStore('users', () => {
  const users = ref<UserType[]>([])

  const getUserById = (id: UserType['id']) => {
    return users.value.find((e) => e.id === id)
  }

  return { users, getUserById }
})
