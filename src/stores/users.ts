import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { UserType } from '@/types/user'

const useStore = defineStore('users', () => {
  const users = ref<UserType[]>([])
  return { users }
})

// For localStorage
// const store = useStore()
// store.$subscribe(
//   (mutation, state) => {
//     localStorage.setItem('users', JSON.stringify(state))
//   },
//   { detached: true }
// )

export { useStore }
