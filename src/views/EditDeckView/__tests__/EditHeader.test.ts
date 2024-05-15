import {mount} from '@vue/test-utils'
import {createPinia, setActivePinia} from 'pinia'
import {beforeEach, describe, expect, test} from 'vitest'
import EditHeader from '../EditHeader.vue'

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
