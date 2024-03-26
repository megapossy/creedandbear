import { ref } from 'vue'
import { defineStore } from 'pinia'



export const useStore = defineStore('user', () => {
  const users = ref<User[]>([])
  
  return { users }
})
