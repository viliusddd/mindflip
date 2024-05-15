<script setup lang="ts">
import {ref} from 'vue'
import {useDeckStore} from '@/stores/DeckStore'

type Props = {
  id: number
  attribute: string
  size: string
  isBold: boolean
}

const props = defineProps<Props>()

const deckStore = useDeckStore()

deckStore.deckId = props.id

const editable = ref(false)

const bold = props.isBold ? 'bold' : 'regular'

const vFocus = {
  mounted: (elm: HTMLElement) => elm.focus()
}
</script>

<template>
  <div>
    <div class="pencil__wrapper" v-if="!editable">
      <h2 class="resting-text">{{ deckStore.deck[attribute] }}</h2>
      <PButton
        :aria-label="`Edit ${attribute}`"
        @click="editable = !editable"
        class="icon"
        icon="pi pi-pencil"
        text
      />
    </div>
    <div class="pencil__wrapper" v-else>
      <InputText
        :placeholder="`${attribute}`"
        @keyup.enter="editable = !editable"
        class="p-inputtext"
        v-focus
        v-model="deckStore.deck[attribute]"
      />
      <PButton
        :aria-label="`Close edit of ${attribute}`"
        @click="editable = !editable"
        icon="pi pi-check"
        text
      />
    </div>
  </div>
</template>

<style scoped>
.p-inputtext {
  font-weight: v-bind(bold);
  font-size: v-bind(size);
  width: 100%;
}
.resting-text {
  font-weight: v-bind(bold);
  font-size: v-bind(size);
  margin: 0;
  padding: 8px 12px;
  border: 1px solid transparent;
}

.pencil__wrapper {
  display: flex;
}
.icon {
  /* background: transparent; */
  cursor: pointer;
  outline: 0;
  border: 0;
  max-width: 100%;
  margin: 0 0 0 auto;
}
.pencil__wrapper > .icon {
  display: flex;
  visibility: hidden;
}
.pencil__wrapper:hover > .icon {
  visibility: visible;
}
</style>
