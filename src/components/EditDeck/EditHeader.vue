<script setup>
import { useDeckStore } from '@/stores/DeckStore'

const deckStore = useDeckStore()

const props = defineProps({
  id: Number
})

const deck = deckStore.deck(props.id)
</script>

<template>
  <Inplace class="name__inplace" :closable="true">
    <template #display>
      <span class="name__display">{{ deck.name }}</span>
    </template>
    <template #content>
      <InputText class="name__content" v-model="deck.name" autofocus />
    </template>
  </Inplace>
  <Inplace class="description__inplace" :closable="true">
    <template #display>
      <span class="description__display">{{ deck.description }}</span>
    </template>
    <template #content>
      <Textarea class="description__content" v-model="deck.description" autofocus />
    </template>
  </Inplace>
</template>

<style scoped>
.name__inplace {
  font-size: 2.5ch;
  font-weight: bold;
  margin: 20px 0 0 0;
}
.description__inplace {
  margin: 20px 0 0 0;
}
.name__display {
  margin-top: 10px;
}
.name__content {
  margin: 0;
}
</style>
