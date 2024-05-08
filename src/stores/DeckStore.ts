import {defineStore} from 'pinia'
import {computed, watch, ref} from 'vue'
import type {Ref, ComputedRef} from 'vue'

export type Card = {
  name: string
  definition: string
  status: string
  id: string
  difficulty: number
  due: Date
  elapsed_days: number
  lapses: number
  reps: number
  scheduled_days: number
  stability: number
  state: number
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

  const deleteCardDialog = ref(false)
  const deleteCardsDialog = ref(false)
  const cardDialog = ref(false)
  const selectedCards = ref() // with checkbox
  const deckId: Ref<number> = ref()
  const card: Ref<Card> = ref()
  const submitted = ref(false)
  const dataTable = ref()

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

  function replaceCard(crd) {
    const pos = cards.value.map((e) => e.id).indexOf(crd.id)
    deck.value.cards.splice(pos, 1)
    deck.value.cards.push(crd)
  }

  const deleteCard = (cardToDelete) => {
    if (!cardToDelete) cardToDelete = card.value

    deck.value.cards = deck.value.cards.filter(
      (obj) => obj.id !== cardToDelete.id
    )

    deleteCardDialog.value = false
    card.value = null
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
    deckId,
    deleteSelectedCards,
    deleteCard,
    submitted,
    dataTable,
    card,
    cards,
    addCards,
    cardsDue,
    replaceCard
  }
})
