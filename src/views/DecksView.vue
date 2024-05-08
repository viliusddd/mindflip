<script setup lang="ts">
import Deck from '@/components/DeckCard/index.vue'
import {useDeckStore} from '@/stores/DeckStore'
const deckStore = useDeckStore()
</script>

<template>
  <main v-for="(deck, index) of deckStore.decks" :key="index">
    <Deck :deck :id="deck.id" />
  </main>
</template>

<style scoped>
main {
  margin: 20px 0 0 0;
}
</style>
