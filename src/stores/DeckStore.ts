import {defineStore} from 'pinia'
import {computed, watch, ref} from 'vue'
import type {Ref} from 'vue'

export const useDeckStore = defineStore('DeckStore', () => {
  const key = 'decks'
  const decks: Ref<Object[]> = ref([])

  watch(
    decks,
    newValue => {
      localStorage.setItem(key, JSON.stringify(newValue))
    },
    {deep: true}
  )

  function addDeck(deck: object) {
    decks.value.push(deck)
  }

  function deck(id) {
    return decks.value.find(obj => obj.id === id)
  }

  async function fill() {
    const storageVal = localStorage.getItem(key)
    if (storageVal) {
      decks.value = JSON.parse(storageVal)
    } else {
      localStorage.setItem(key, '')
    }
  }

  const newId = computed(() => {
    if (decks.value.length) {
      const lastId = decks.value[decks.value.length - 1].id
      return lastId + 1
    } else {
      return 1
    }
  })

  return {
    decks,
    deck,
    addDeck,
    fill,
    newId
  }
})
