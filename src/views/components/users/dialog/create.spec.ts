import { createTestingPinia } from '@pinia/testing'
import { DOMWrapper, flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, test, vi, type Mock } from 'vitest'

import { User } from '@/services/user/User'
import { Action as UserAction } from '@/services/user/Action'
import Component from './create.vue'
import MyButton from '@/plugins/base/ui/MyButton.vue'
import MyInput from '@/plugins/base/ui/MyInput.vue'
import * as useToastExports from '@/views/components/shadcn/ui/toast/use-toast'
import { computed } from 'vue'

interface TestContext {
  wrapper: ReturnType<typeof mount>
  btn: DOMWrapper<Element>
  toast: Mock<any, any>
}

const user = {
  id: 123,
  email: 'email@address.com',
  first_name: 'Megah',
  last_name: 'Posseh',
  avatar: 'https://someimage.com/image.jpg'
}

describe('Create.vue', () => {
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
    await context.wrapper.setProps({ action: 'create' })
    context.btn = context.wrapper.find('[data-testid="submit-btn"]')
    await flushPromises()
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
  })

  test<TestContext>('renders properly', async ({ wrapper }) => {
    expect(wrapper.html()).toContain('Create User')
    expect(wrapper.html()).toContain('First Name')
    expect(wrapper.html()).toContain('Last Name')
    expect(wrapper.html()).toContain('Email')
  })

  test<TestContext>('field errors first name', async ({ wrapper, btn }) => {
    const input = wrapper.find('[data-testid="first_name"] input')
    await input.setValue('as')
    await btn.trigger('click')
    await flushPromises()
    expect(wrapper.find('[data-testid="first_name"]').html()).toContain(
      'First name is less than 3 characters'
    )
  })

  test<TestContext>('field errors last name', async ({ wrapper, btn }) => {
    const input = wrapper.find('[data-testid="last_name"] input')
    await input.setValue('as')
    await btn.trigger('click')
    await flushPromises()
    expect(wrapper.find('[data-testid="last_name"]').html()).toContain(
      'Last name is less than 3 characters'
    )
  })

  test<TestContext>('field errors email', async ({ wrapper, btn }) => {
    const input = wrapper.find('[data-testid="email"] input')
    await input.setValue('emailasd')
    await btn.trigger('click')
    await flushPromises()
    expect(wrapper.find('[data-testid="email"]').html()).toContain('Email is invalid')
  })

  test<TestContext>('error not complete fields', async ({ wrapper, btn }) => {
    vi.spyOn(UserAction as any, 'createUserAPI').mockResolvedValueOnce({
      status: 'success',
      user: {
        ...user
      }
    })
    const input = wrapper.find('[data-testid="first_name"] input')
    await input.setValue(user.first_name)
    await btn.trigger('click')
    await flushPromises()
    expect(wrapper.find('[data-testid="last_name"]').html()).toContain(
      'Last name is less than 3 characters'
    )
    expect(wrapper.find('[data-testid="email"]').html()).toContain('Email is invalid')
  })

  test<TestContext>('success', async ({ wrapper, btn, toast }) => {
    vi.spyOn(UserAction as any, 'createUserAPI').mockResolvedValueOnce({
      status: 'success',
      user: {
        ...user
      }
    })
    await wrapper.find('[data-testid="first_name"] input').setValue(user.first_name)
    await wrapper.find('[data-testid="last_name"] input').setValue(user.last_name)
    await wrapper.find('[data-testid="email"] input').setValue(user.email)
    await btn.trigger('click')
    await flushPromises()
    expect(toast).toBeCalledWith({
      title: 'User Created!',
      description: `${user.first_name} ${user.last_name} was added.`
    })
  })
})
