<script setup>
import { ref } from 'vue'
import { items } from './consts.ts'
import { useDeckStore } from '@/stores/DeckStore.ts'

const deckStore = useDeckStore()

const props = defineProps({
  id: Number
})

const menu = ref()

const toggleMenu = (event) => {
  menu.value.toggle(event)
}

function deleteDeck() {
  deckStore.decks = deckStore.decks.filter((obj) => obj.id !== props.id)
}

function resetStats() {
  deckStore.decks[props.id].cards.forEach((card) => {
    card.isDifficult = false
    card.isLearned = false
    card.isReadyForReview = false
  })
}

function toggleVisibility() {
  const deck = deckStore.decks.find((obj) => obj.id === props.id)
  deck.isHidden = !deck.isHidden
}

const menuMap = {
  toggle: () => toggleVisibility(),
  reset: () => resetStats(),
  delete: () => deleteDeck()
}
</script>

<template>
  <Button
    @click="toggleMenu"
    icon="pi pi-ellipsis-v"
    text
    severity="info"
    size="large"
    aria-label="Deck options"
    aria-haspopup="true"
    aria-controls="overlay_menu"
  />
  <Menu ref="menu" id="overlay_menu" :model="items" :popup="true">
    <template #item="{ item, props }">
      <router-link
        v-if="item.name === 'edit'"
        #="{ navigate }"
        custom
        :to="{
          name: 'EditDeck',
          params: { id }
        }"
      >
        <a href="" v-bind="props.action" @click="navigate">
          <span :class="item.icon" />
          <span class="ml-2"> {{ item.label }}</span>
        </a>
      </router-link>
      <div v-else>
        <span v-bind="props.action" @click="menuMap[item.name]">
          <span :class="item.icon" />
          <span class="ml-2"> {{ item.label }}</span>
        </span>
      </div>
    </template>
  </Menu>
</template>

<style scoped>
Button {
  margin: 0 0 0 auto;
  height: 10px;
}
</style>
