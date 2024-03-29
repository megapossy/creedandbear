import { createTestingPinia } from '@pinia/testing'
import { flushPromises, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import { User } from '@/services/user/User'
import Component from './edit.vue'

interface TestContext {
  wrapper: ReturnType<typeof mount>
}

describe('Edit.vue', () => {
  beforeEach<TestContext>((context) => {
    context.wrapper = mount(Component, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ],
        renderStubDefaultSlot: true,
        stubs: {
          teleport: true
        }
      },
      props: {
        user: new User({
          id: 123,
          email: 'faker.internet.email()',
          first_name: 'faker.person.firstName()',
          last_name: 'faker.person.lastName()',
          avatar: 'faker.image.avatar()'
        })
      }
    })
  })

  test<TestContext>('renders properly', async ({ wrapper }) => {
    wrapper.setProps({ action: 'edit' })
    await flushPromises()
    expect(wrapper.html()).toContain('Edit Profile')
    expect(wrapper.html()).toContain('First Name')
    expect(wrapper.html()).toContain('faker.person.firstName()')
    expect(wrapper.html()).toContain('Last Name')
    expect(wrapper.html()).toContain('faker.person.lastName()')
    expect(wrapper.html()).toContain('Email')
    expect(wrapper.html()).toContain('faker.internet.email()')
  })

  test('field errors', async () => {
    // first name


    // last name
    // email
  })
})
