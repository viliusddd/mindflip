<script setup lang="ts">
import {computed} from 'vue'
import type {ComputedRef} from 'vue'
import type {Deck, Card} from '@/stores/DeckStore'
import {useDeckStore} from '@/stores/DeckStore'

const props = defineProps<{
  deck: Deck
}>()

const deckStore = useDeckStore()

const cardsDue: ComputedRef<Card[]> = computed(() => {
  const cardsArray = []
  for (const crd of props.deck.cards) {
    if (new Date(crd.due) <= new Date()) cardsArray.push(crd)
  }
  return cardsArray
})

const dueCardsCount = computed(() => cardsDue.value.length)
const reviewDueMsg = `Review ${dueCardsCount.value} due cards`
const reviewAllMsg = `Review all ${props.deck.cards.length} cards`
const emptyDeckMsg = "Add new cards to the deck, since it's empty"
</script>

<template>
  <nav v-if="!deck.cards.length">
    <RouterLink
      class="deck__button"
      :to="{name: 'EditDeck', params: {id: deck.id}}"
    >
      <PButton
        label="Add New Cards"
        size="large"
        :raised="true"
        v-tooltip.top="emptyDeckMsg"
      />
    </RouterLink>
  </nav>
  <nav v-else-if="dueCardsCount === deck.cards.length">
    <RouterLink
      class="deck__button"
      :to="{name: 'Deck', params: {id: deck.id}}"
    >
      <PButton
        label="Review"
        size="large"
        :raised="true"
        :badge="dueCardsCount.toString()"
        @click="deckStore.dueReview = true"
        v-tooltip.top="reviewDueMsg"
      />
    </RouterLink>
  </nav>
  <nav
    v-else-if="dueCardsCount && dueCardsCount !== deck.cards.length"
    class="deck__buttons"
  >
    <RouterLink
      class="deck__button"
      :to="{name: 'Deck', params: {id: deck.id}}"
    >
      <PButton
        label="Review"
        size="large"
        :raised="true"
        :badge="dueCardsCount.toString()"
        @click="deckStore.dueReview = true"
        v-tooltip.top="reviewDueMsg"
      />
    </RouterLink>
    <RouterLink
      class="deck__button"
      :to="{name: 'Deck', params: {id: deck.id}}"
    >
      <PButton
        icon="pi pi-hammer"
        size="large"
        :raised="true"
        v-tooltip.top="reviewAllMsg"
      />
    </RouterLink>
  </nav>
  <nav v-else>
    <RouterLink
      class="deck__button"
      :to="{name: 'Deck', params: {id: deck.id}}"
    >
      <PButton
        label="Learn all cards"
        icon="pi pi-hammer"
        size="large"
        :raised="true"
        v-tooltip.top="reviewAllMsg"
      />
    </RouterLink>
  </nav>
</template>

<style scoped>
.deck__buttons {
  display: flex;
  column-gap: 5px;
}
</style>
