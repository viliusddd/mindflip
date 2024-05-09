<script setup lang="ts">
import {useDeckStore} from '@/stores/DeckStore'
import {computed} from 'vue'

const deckStore = useDeckStore()

defineProps({
  id: {
    type: Number,
    required: true
  }
})

const dueWordsCount = computed(() => deckStore.cardsDue.length)

const reviewAllMsg = `Review all ${deckStore.cards.length} cards`
const reviewDueMsg = `Review ${dueWordsCount.value} due cards`
</script>

<template>
  <nav v-if="dueWordsCount" class="deck__buttons">
    <RouterLink class="deck__button" :to="{name: 'Deck', params: {id}}">
      <PButton
        label="Review"
        size="large"
        :raised="true"
        :badge="dueWordsCount.toString()"
        @click="deckStore.dueReview = true"
        v-tooltip.top="reviewDueMsg"
      />
    </RouterLink>
    <RouterLink class="deck__button" :to="{name: 'Deck', params: {id}}">
      <PButton
        icon="pi pi-hammer"
        size="large"
        :raised="true"
        v-tooltip.top="reviewAllMsg"
      />
    </RouterLink>
  </nav>
  <nav v-else>
    <RouterLink class="deck__button" :to="{name: 'Deck', params: {id}}">
      <PButton
        label="Learn all words"
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
