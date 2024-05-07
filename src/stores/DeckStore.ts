import {defineStore} from 'pinia'
import {computed, watch, ref} from 'vue'
import type {Ref, ComputedRef} from 'vue'

export type Card = {
  name: string
  definition: string
  status: string
}

export type Deck = {
  id: number
  name: string
  description: string
  isHidden: boolean
  cards: Card[]
  icon: string
}

export const useDeckStore = defineStore('DeckStore', () => {
  const key: string = 'decks'
  const decks: Ref<Deck[]> = ref([])

  watch(
    decks,
    (newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue))
    },
    {deep: true}
  )

  function addDeck(deck: Deck) {
    decks.value.push(deck)
  }

  function deck(id: number) {
    return decks.value.find((obj) => obj.id === id)
  }

  async function fill() {
    const storageVal: string | null = localStorage.getItem(key)
    if (storageVal) {
      decks.value = JSON.parse(storageVal)
    } else {
      localStorage.setItem(key, '')
    }
  }

  const newId: ComputedRef<number> = computed((): number => {
    if (decks.value.length) {
      const lastId: number = decks.value[decks.value.length - 1].id
      return lastId + 1
    } else {
      return 1
    }
  })

  const deleteCardDialog = ref(false)
  const deleteCardsDialog = ref(false)

  return {
    decks,
    deck,
    addDeck,
    fill,
    newId,
    deleteCardDialog,
    deleteCardsDialog
  }
})
