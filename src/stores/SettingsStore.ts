import {watch, ref} from 'vue'
import {defineStore} from 'pinia'
import type {Ref} from 'vue'

export const useSettingsStore = defineStore('SettingsStore', () => {
  const key: string = 'settings'
  const cardsPerReview: Ref<number> = ref(10)

  watch(
    cardsPerReview,
    (newValue) => {
      localStorage.setItem(key, newValue.toString())
    },
    {deep: true}
  )

  async function fill() {
    const storageVal: string | null = localStorage.getItem(key)
    if (storageVal) {
      cardsPerReview.value = JSON.parse(storageVal)
      console.log(cardsPerReview.value)
    } else {
      localStorage.setItem(key, cardsPerReview.value.toString())
    }
  }

  return {cardsPerReview, fill}
})
