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
  const cardDialog = ref(false)
  const selectedCards = ref() // with checkbox
  const selectedDeckId: Ref<number> = ref()
  const card: Ref<Card> = ref()
  const cards: Ref<Card[]> = ref()
  const submitted = ref(false)
  const dataTable = ref()

  const deleteSelectedCards = () => {
    deck(selectedDeckId.value).cards = deck(selectedDeckId.value).cards.filter(
      (val) => !selectedCards.value.includes(val)
    )

    cards.value = cards.value.filter(
      (val) => !selectedCards.value.includes(val)
    )

    deleteCardsDialog.value = false
    selectedCards.value = null
  }

  const deleteCard = () => {
    deck(selectedDeckId.value).cards = deck(selectedDeckId.value).cards.filter(
      (obj) => obj.name !== card.value.name
    )
    cards.value = cards.value.filter((val) => val.name !== card.value.name)

    deleteCardDialog.value = false
    card.value = {
      name: '',
      definition: '',
      status: 'new'
    }
  }

  return {
    decks,
    deck,
    addDeck,
    fill,
    newId,
    deleteCardDialog,
    deleteCardsDialog,
    cardDialog,
    selectedCards,
    selectedDeckId,
    deleteSelectedCards,
    deleteCard,
    submitted,
    dataTable,
    card,
    cards
  }
})
