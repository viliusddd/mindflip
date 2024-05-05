<script setup lang="ts">
import {ref} from 'vue'
import {items} from './consts'
import {useDeckStore} from '@/stores/DeckStore'

import type {Card, Deck} from '@/stores/DeckStore'
import type {OptionsItem} from './consts'

const deckStore = useDeckStore()

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

const menu = ref()

const toggleMenu = (evt: Event): void => {
  menu.value.toggle(evt)
}

function deleteDeck() {
  deckStore.decks = deckStore.decks.filter((obj) => obj.id !== props.id)
}

function resetStats() {
  deckStore.decks[props.id].cards.forEach((card: Card) => {
    card.status = 'new'
  })
}

function toggleVisibility() {
  const deck: Deck | undefined = deckStore.decks.find(
    (obj) => obj.id === props.id
  )
  if (deck) deck.isHidden = !deck.isHidden
}

type MenuMap = {
  toggle: () => void
  reset: () => void
  quit: () => void
}

const menuMap: MenuMap = {
  toggle: () => toggleVisibility(),
  reset: () => resetStats(),
  quit: () => deleteDeck()
}
</script>

<template>
  <PButton
    @click="toggleMenu"
    icon="pi pi-ellipsis-v"
    text
    severity="info"
    size="large"
    aria-label="Deck options"
    aria-haspopup="true"
    aria-controls="overlay_menu"
  />
  <PMenu ref="menu" id="overlay_menu" :model="items" :popup="true">
    <template #item="{item, props}: {item: OptionsItem; props: any}">
      <router-link
        v-if="item.name === 'edit'"
        #="{navigate}"
        custom
        :to="{name: 'EditDeck', params: {id}}"
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
  </PMenu>
</template>

<style scoped>
PButton {
  margin: 0 0 0 auto;
  height: 10px;
}
</style>
