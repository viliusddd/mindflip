import {computed, watch, ref} from 'vue'
import {defineStore} from 'pinia'
import type {Ref, ComputedRef} from 'vue'

export type Card = {
  answer: string
  difficulty: number
  due: Date
  elapsed_days: number
  id: string
  lapses: number
  question: string
  reps: number
  scheduled_days: number
  stability: number
  state: number
}

export type Deck = {
  cards: Card[]
  description: string
  icon: string
  id: number
  name: string
}

export const useDeckStore = defineStore('DeckStore', () => {
  const decks: Ref<Deck[]> = ref([])
  const key: string = 'decks'

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

  const cardsDue: ComputedRef<Card[]> = computed(() => {
    const cardsArray = []
    for (const crd of cards.value) {
      if (new Date(crd.due) <= new Date()) cardsArray.push(crd)
    }
    return cardsArray
  })

  const _getDeck: Ref<Deck> = ref(null)
  _getDeck.value = decks.value.find((obj) => obj.id === deckId.value)

  const deck = computed({
    get() {
      return decks.value.find((obj) => obj.id === deckId.value)
    },
    set(newVal) {
      _getDeck.value = newVal
    }
  })

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

  const card: Ref<Card> = ref()
  const cardDialog = ref(false)
  const dataTable = ref()
  const deckId: Ref<number> = ref()
  const deleteCardDialog = ref(false)
  const deleteCardsDialog = ref(false)
  const selectedCards = ref() // with checkbox
  const submitted = ref(false)

  const cards: Ref<Card[]> = computed(() => {
    if (deckId.value) return deck.value.cards
    else return null
  })

  const addCards = (crds: Card[]) => {
    deck.value.cards = deck.value.cards.concat(crds)
  }

  const deleteSelectedCards = () => {
    deck.value.cards = deck.value.cards.filter(
      (val) => !selectedCards.value.includes(val)
    )

    deleteCardsDialog.value = false
    selectedCards.value = null
  }

  /** Add new or update existing card */
  function addCard(crd: Card) {
    const pos = cards.value.map((e) => e.id).indexOf(crd.id)
    if (pos === -1) deck.value.cards.push(crd)
    else deck.value.cards[pos] = crd
  }

  const deleteCard = () => {
    deck.value.cards = deck.value.cards.filter(
      (obj) => obj.id !== card.value.id
    )
    cardDialog.value = false
    deleteCardDialog.value = false
    card.value = null
  }

  const dueReview = ref(false)
  const settingsDialog = ref(false)

  return {
    addCard,
    addCards,
    addDeck,
    card,
    cardDialog,
    cards,
    cardsDue,
    dataTable,
    deck,
    deckId,
    decks,
    deleteCard,
    deleteCardDialog,
    deleteCardsDialog,
    deleteSelectedCards,
    dueReview,
    fill,
    newId,
    selectedCards,
    settingsDialog,
    submitted
  }
})
