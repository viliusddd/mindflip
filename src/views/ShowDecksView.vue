<script setup lang="ts">
import {useDeckStore} from '@/stores/DeckStore'
import Deck from '@/components/DeckCard/index.vue'

const deckStore = useDeckStore()
</script>

<template>
  <p v-if="!deckStore.decks.length" class="nodecks-msg">
    There are no decks to show
  </p>
  <main v-else v-for="deck of deckStore.decks" :key="deck.id">
    <Deck :id="deck.id" />
  </main>
</template>

<style scoped>
main {
  margin: 0 0 0 0;
}
.nodecks-msg {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
}
</style>
