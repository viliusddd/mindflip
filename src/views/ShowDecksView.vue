<script setup lang="ts">
import {useDeckStore} from '@/stores/DeckStore'
import Deck from '@/components/DeckCard/index.vue'

const deckStore = useDeckStore()
</script>

<template>
  <main v-for="(deck, index) of deckStore.decks" :key="index">
    <Deck :id="deck.id" />
  </main>
</template>

<style scoped>
main {
  margin: 0 0 0 0;
}
</style>
