import { inject, provide } from 'vue'

export type Action = 'view' | 'edit' | 'delete'

export const provider = (cb: (userId: number, action: Action) => void) => {
  provide('showUserModal', (userId: number, action: Action) => {
    cb(userId, action)
  })
}

export const injector = () => inject<(userId: number, action: Action) => void>('showUserModal')
