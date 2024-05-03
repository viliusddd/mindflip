<script setup lang="ts">
import {useDeckStore} from '@/stores/DeckStore'

const deckStore = useDeckStore()

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

const deckName = deckStore.deck(props.id)?.name
const deckDesc = deckStore.deck(props.id)?.description
</script>

<template>
  <Inplace class="name__inplace" :closable="true">
    <template #display>
      <span class="name__display">{{ deckName }}</span>
    </template>
    <template #content>
      <InputText class="name__content" v-model="deckName" autofocus />
    </template>
  </Inplace>
  <Inplace class="description__inplace" :closable="true">
    <template #display>
      <span class="description__display">{{ deckDesc }}</span>
    </template>
    <template #content>
      <PTextarea class="description__content" v-model="deckDesc" autofocus />
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
