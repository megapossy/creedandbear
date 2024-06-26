import { createTestingPinia } from '@pinia/testing'
import { DOMWrapper, flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { User } from '@/services/user/User'
import Component from './edit.vue'
import MyButton from '@/plugins/base/ui/MyButton.vue'
import MyInput from '@/plugins/base/ui/MyInput.vue'

interface TestContext {
  wrapper: ReturnType<typeof mount>,
  btn: DOMWrapper<Element>,
}

const user = {
  id: 123,
  email: 'email@address.com',
  first_name: 'Megah',
  last_name: 'Posseh',
  avatar: 'https://someimage.com/image.jpg'
}

describe('Edit.vue', () => {
  beforeEach<TestContext>(async (context) => {
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
    await context.wrapper.setProps({ action: 'edit' })
    context.btn = context.wrapper.find('[data-testid="update-btn"]')
    await flushPromises()
  })

  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  test<TestContext>('renders properly', async ({ wrapper, btn }) => {
    expect(wrapper.html()).toContain('Edit Profile')
    expect(wrapper.html()).toContain('First Name')
    expect(wrapper.html()).toContain('Last Name')
    expect(wrapper.html()).toContain('Email')
    expect(wrapper.html()).toContain(user.first_name)
    expect(wrapper.html()).toContain(user.last_name)
    expect(wrapper.html()).toContain(user.email)
    expect(wrapper.html()).toContain(user.avatar)
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
    await input.setValue('zx')
    await btn.trigger('click')
    await flushPromises()
    expect(wrapper.find('[data-testid="last_name"]').html()).toContain(
      'Last name is less than 3 characters'
    )
  })

  test<TestContext>('field errors email', async ({ wrapper, btn }) => {
    const input = wrapper.find('[data-testid="email"] input')
    await input.setValue('asdd')
    await btn.trigger('click')
    await flushPromises()
    expect(wrapper.find('[data-testid="email"]').html()).toContain('Email is invalid')
  })

  // edit success
  test<TestContext>('success first name', async ({ wrapper, btn }) => {
    const mockUser = vi.spyOn(User.prototype, 'edit').mockResolvedValueOnce()
    const input = wrapper.find('[data-testid="first_name"] input')
    await input.setValue(user.first_name)
    await btn.trigger('click')
    await flushPromises()
    expect(mockUser).toHaveBeenCalledWith({
      first_name: user.first_name,
      last_name: '',
      email: ''
    })
  })
  test<TestContext>('success last name', async ({ wrapper, btn }) => {
    const mockUser = vi.spyOn(User.prototype, 'edit').mockResolvedValueOnce()
    const input = wrapper.find('[data-testid="last_name"] input')
    await input.setValue(user.last_name)
    await btn.trigger('click')
    await flushPromises()
    expect(mockUser).toHaveBeenCalledWith({
      first_name: '',
      last_name: user.last_name,
      email: ''
    })
  })
  test<TestContext>('success email', async ({ wrapper, btn }) => {
    const mockUser = vi.spyOn(User.prototype, 'edit').mockResolvedValueOnce()
    const input = wrapper.find('[data-testid="email"] input')
    await input.setValue(user.email)
    await btn.trigger('click')
    await flushPromises()
    expect(mockUser).toHaveBeenCalledWith({
      first_name: '',
      last_name: '',
      email: user.email
    })
  })
  test<TestContext>('success all', async ({ wrapper, btn }) => {
    const mockUser = vi.spyOn(User.prototype, 'edit').mockResolvedValueOnce()
    await wrapper.find('[data-testid="email"] input').setValue(user.email)
    await wrapper.find('[data-testid="first_name"] input').setValue(user.first_name)
    await wrapper.find('[data-testid="last_name"] input').setValue(user.last_name)
    await btn.trigger('click')
    await flushPromises()
    expect(mockUser).toHaveBeenCalledWith({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email
    })
  })
})
