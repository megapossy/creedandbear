import { createTestingPinia } from '@pinia/testing'
import { flushPromises, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import { User } from '@/services/user/User'
import Component from './view.vue'

interface TestContext {
  wrapper: ReturnType<typeof mount>
}

describe.skip('View.vue', () => {
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
    wrapper.setProps({ action: 'view' })
    await flushPromises()
    expect(wrapper.html()).toContain('View Profile')
    expect(wrapper.html()).toContain('First Name')
    expect(wrapper.html()).toContain('faker.person.firstName()')
    expect(wrapper.html()).toContain('Last Name')
    expect(wrapper.html()).toContain('faker.person.lastName()')
    expect(wrapper.html()).toContain('Email')
    expect(wrapper.html()).toContain('faker.internet.email()')
  })

  test<TestContext>('should not show', async ({ wrapper }) => {
    wrapper.setProps({ action: 'edit' })
    await flushPromises()
    expect(wrapper.html()).not.toContain('View Profile')
    expect(wrapper.html()).not.toContain('First Name')
    expect(wrapper.html()).not.toContain('faker.person.firstName()')
    expect(wrapper.html()).not.toContain('Last Name')
    expect(wrapper.html()).not.toContain('faker.person.lastName()')
    expect(wrapper.html()).not.toContain('Email')
    expect(wrapper.html()).not.toContain('faker.internet.email()')
  })
})
