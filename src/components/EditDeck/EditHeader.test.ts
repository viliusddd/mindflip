import {mount} from '@vue/test-utils'
import {test, expect} from 'vitest'
import EditHeader from './EditHeader.vue'
import {createPinia, setActivePinia} from 'pinia'

describe('EditHeader component', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('component mount', async () => {
    expect(EditHeader).toBeTruthy()

    const wrapper = mount(EditHeader, {
      props: {
        id: 1
      }
    })
    expect(wrapper.props().id).toBe(1)
  })
})
