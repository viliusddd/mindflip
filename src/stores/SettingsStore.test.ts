import {afterEach, beforeEach, describe, expect, it} from 'vitest'
import {createPinia, setActivePinia} from 'pinia'
import {useSettingsStore} from './SettingsStore'

const key = 'settings'

describe('Settings Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  afterEach(() => {
    localStorage.clear()
  })

  it('gets default value', () => {
    const settingsStore = useSettingsStore()
    expect(settingsStore.cardsPerReview).toBe(10)
  })
  it('gets localStorage value', () => {
    const settings = '15'

    localStorage.setItem(key, settings)

    const settingsStore = useSettingsStore()

    settingsStore.fill()

    expect(settingsStore.cardsPerReview).toBe(15)
  })
})
