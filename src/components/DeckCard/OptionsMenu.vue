<script setup lang="ts">
import {items} from './consts'
import {computed, ref} from 'vue'
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

const deckIndex = computed(() =>
  deckStore.decks.map((dck: Deck) => dck.id).indexOf(props.id)
)

function deleteDeck() {
  deckStore.decks.splice(deckIndex.value, 1)
}

function resetStats() {
  deckStore.decks[deckIndex.value].cards.forEach((card: Card) => {
    card.state = 0
    card.difficulty = 0
    card.due = new Date()
    card.elapsed_days = 0
    card.lapses = 0
    card.reps = 0
    card.scheduled_days = 0
    card.stability = 0
    card.state = 0
  })
}

type MenuMap = {
  quit: () => void
  reset: () => void
}

const menuMap: MenuMap = {
  quit: () => deleteDeck(),
  reset: () => resetStats()
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
          <span> {{ item.label }}</span>
        </a>
      </router-link>
      <div v-else>
        <span v-bind="props.action" @click="menuMap[item.name]">
          <span :class="item.icon" />
          <span> {{ item.label }}</span>
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
