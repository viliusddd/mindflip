<script setup lang="ts" generic="T">
import {computed, onMounted} from 'vue'
import {useDeckStore} from '@/stores/DeckStore'
import {useTitle} from '@vueuse/core'
import CardDialog from './CardDialog.vue'
import CardsTable from './CardsTable.vue'
import DeleteCardDialog from './DeleteCardDialog.vue'
import DeleteCardsDialog from './DeleteCardsDialog.vue'
import HoverButton from './HoverButton.vue'
import ToolBar from './ToolBar.vue'
import type {ComputedRef} from 'vue'
import type {Deck} from '@/stores/DeckStore'

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

const deckStore = useDeckStore()

const deck: ComputedRef<Deck> = computed(() =>
  deckStore.decks.find((obj) => obj.id === props.id)
)

deckStore.selectedDeckId = props.id

const title = computed(() => `Edit: ${deck.value.name}`)
useTitle(title)

onMounted(() => (deckStore.cards = deck.value.cards))
</script>

<template>
  <div>
    <header>
      <HoverButton :id size="2.5ch" :isBold="true" attribute="name" />
      <HoverButton :id :isBold="false" attribute="description" />
    </header>
    <div class="card">
      <ToolBar />
      <CardsTable />
    </div>

    <CardDialog />
    <DeleteCardDialog />
    <DeleteCardsDialog />
  </div>
</template>

<style scoped>
header {
  margin: 0 0 20px 0;
}
.cards__title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
