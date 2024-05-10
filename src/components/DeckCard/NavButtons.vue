<script setup lang="ts">
import {computed, ref} from 'vue'
import type {ComputedRef} from 'vue'
import type {Deck, Card} from '@/stores/DeckStore'

const props = defineProps<{
  deck: Deck
}>()

const cardsDue: ComputedRef<Card[]> = computed(() => {
  const cardsArray = []
  for (const crd of props.deck.cards) {
    if (new Date(crd.due) <= new Date()) cardsArray.push(crd)
  }
  return cardsArray
})

const dueReview = ref(false)
const dueCardsCount = computed(() => cardsDue.value.length)
const reviewDueMsg = `Review ${dueCardsCount.value} due cards`
const reviewAllMsg = `Review all ${props.deck.cards.length} cards`
</script>

<template>
  <nav v-if="dueCardsCount" class="deck__buttons">
    <RouterLink
      class="deck__button"
      :to="{name: 'Deck', params: {id: deck.id}}"
    >
      <PButton
        label="Review"
        size="large"
        :raised="true"
        :badge="dueCardsCount.toString()"
        @click="dueReview = true"
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
