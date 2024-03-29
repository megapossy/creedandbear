import { describe, test, expect, vi, beforeEach } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { mount, shallowMount, flushPromises } from '@vue/test-utils'

import Component from './login-form.vue'
import MyButton from '@/plugins/base/ui/MyButton.vue'
import MyInput from '@/plugins/base/ui/MyInput.vue'
import { Action as AuthActionMock } from '@/services/auth/Action'
import router from '@/router'

interface TestContext {
  wrapper: ReturnType<typeof mount>
}

describe('LoginForm.vue', () => {
  beforeEach<TestContext>((context) => {
    context.wrapper = mount(Component, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ],
        stubs: {
          MyButton: MyButton,
          MyInput: MyInput
        }
      }
    })
  })

  test('renders properly', async () => {
    const wrapper = shallowMount(Component)
    await flushPromises()
    expect(wrapper.html()).toContain('Sign-in')
    expect(wrapper.html()).toContain('Enter your email below to sign-in')
    expect(wrapper.html()).toContain('Login')
  })

  test<TestContext>('errors', async ({ wrapper }) => {
    const form = wrapper.find('[data-testid="form"]')
    const input = wrapper.find('[data-testid="input"] input')

    // blank email
    form.trigger('submit')
    await flushPromises()
    expect(wrapper.find('[data-testid="input"] p').html()).toContain('Email is invalid')

    // less than 9 characters email
    input.setValue('a@s.io')
    form.trigger('submit')
    await flushPromises()
    expect(wrapper.find('[data-testid="input"] p').html()).toContain(
      'Email is less than 9 characters'
    )

    // Invalid Credentials
    const mockLoginAPI = vi.spyOn(AuthActionMock as any, 'loginAPI').mockImplementationOnce(() => {
      throw new Error('Invalid Credentials')
    })
    input.setValue('notvalid@credentials.error')
    form.trigger('submit')
    await flushPromises()
    expect(mockLoginAPI).toHaveBeenCalled()
    expect(wrapper.find('[data-testid="input"] p').html()).toContain('Invalid Credentials')
  })

  test<TestContext>('login success', async ({ wrapper }) => {
    const form = wrapper.find('[data-testid="form"]')
    const input = wrapper.find('[data-testid="input"] input')

    vi.spyOn(AuthActionMock as any, 'login')
    .mockResolvedValueOnce(undefined)
    const spyRouterPush = vi.spyOn(router, 'push')

    await input.setValue('superuser@creedandbear.com')
    form.trigger('submit')
    await flushPromises()
    // should call router.push({ name: 'users' })
    expect(spyRouterPush).toHaveBeenCalledWith({ name: 'users' })
  })
})
