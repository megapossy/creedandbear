import { createTestingPinia } from '@pinia/testing'
import { DOMWrapper, flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, test, vi, type Mock } from 'vitest'

import { User } from '@/services/user/User'
import { Action as UserAction } from '@/services/user/Action'
import Component from './delete.vue'
import MyButton from '@/plugins/base/ui/MyButton.vue'
import MyInput from '@/plugins/base/ui/MyInput.vue'
import * as useToastExports from '@/views/components/shadcn/ui/toast/use-toast'
import { computed } from 'vue'

interface TestContext {
  wrapper: ReturnType<typeof mount>
  btnYes: DOMWrapper<Element>
  btnNo: DOMWrapper<Element>
  toast: Mock<any, any>
}

const user = {
  id: 123,
  email: 'email@address.com',
  first_name: 'Megah',
  last_name: 'Posseh',
  avatar: 'https://someimage.com/image.jpg'
}

describe('Delete.vue', () => {
  beforeEach<TestContext>(async (context) => {
    context.toast = vi.fn()
    vi.spyOn(useToastExports, 'useToast').mockImplementation(() => {
      return {
        toast: context.toast,
        dismiss: vi.fn(),
        toasts: computed(() => [])
      }
    })

    context.wrapper = mount(Component, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ],
        renderStubDefaultSlot: true,
        stubs: {
          teleport: true,
          MyButton: MyButton,
          MyInput: MyInput
        }
      },
      props: {
        user: new User({ ...user })
      }
    })
    await context.wrapper.setProps({ action: 'delete' })
    context.btnYes = context.wrapper.find('[data-testid="yes-btn"]')
    context.btnNo = context.wrapper.find('[data-testid="no-btn"]')
    await flushPromises()
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
  })

  test<TestContext>('renders properly', async ({ wrapper }) => {
    expect(wrapper.html()).toContain('Delete User')
    expect(wrapper.html()).toContain('First Name')
    expect(wrapper.html()).toContain('Last Name')
    expect(wrapper.html()).toContain('Email')
    expect(wrapper.html()).toContain(user.first_name)
    expect(wrapper.html()).toContain(user.last_name)
    expect(wrapper.html()).toContain(user.email)
    expect(wrapper.html()).toContain(user.avatar)    
  })

  test<TestContext>('press no', async ({ wrapper,  btnNo, toast }) => {
    vi.spyOn(User.prototype, 'delete').mockResolvedValueOnce()
    await btnNo.trigger('click')
    await flushPromises()
    expect(wrapper.html()).not.toContain(user.first_name)
    expect(wrapper.html()).not.toContain(user.last_name)
    expect(wrapper.html()).not.toContain(user.email)
    expect(toast).not.toBeCalledWith({
      title: 'User deleted!',
      description: `${user.first_name} ${user.last_name} was removed.`
    })      
  })

  test<TestContext>('press yes', async ({ wrapper, btnYes, toast }) => {
    vi.spyOn(User.prototype, 'delete').mockResolvedValueOnce()
    await btnYes.trigger('click')
    await flushPromises()
    expect(wrapper.html()).not.toContain(user.first_name)
    expect(wrapper.html()).not.toContain(user.last_name)
    expect(wrapper.html()).not.toContain(user.email)

    expect(toast).toBeCalledWith({
      title: 'User deleted!',
      description: `${user.first_name} ${user.last_name} was removed.`
    })    
  })


})
