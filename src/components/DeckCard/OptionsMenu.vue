<script setup lang="ts">
import {items} from './consts'
import {ref} from 'vue'
import {useDeckStore} from '@/stores/DeckStore'
import type {Card, Deck} from '@/stores/DeckStore'
import type {OptionsItem} from './consts'

const props = defineProps<{
  id: number
}>()

const deckStore = useDeckStore()

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
  quit: () => void
  reset: () => void
  toggle: () => void
}

const menuMap: MenuMap = {
  quit: () => deleteDeck(),
  reset: () => resetStats(),
  toggle: () => toggleVisibility()
}
</script>

<template>
  <PButton
    @click="toggleMenu"
    aria-controls="overlay_menu"
    aria-haspopup="true"
    aria-label="Deck options"
    icon="pi pi-ellipsis-v"
    severity="contrast"
    size="large"
    text
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
