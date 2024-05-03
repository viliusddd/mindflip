<script setup>
import {ref} from 'vue'
import {useDeckStore} from '@/stores/DeckStore'

const props = defineProps({
  id: {
    type: Number
  },
  attribute: {
    type: String
  },
  size: {
    type: String,
    default: '2ch'
  },
  isBold: {
    type: Boolean,
    default: false
  }
})

const deckStore = useDeckStore()

const editable = ref(false)

const bold = props.isBold ? 'bold' : 'regular'

const vFocus = {
  mounted: elm => elm.focus()
}
</script>

<template>
  <div>
    <div class="pencil__wrapper" v-if="!editable">
      <h2 class="resting-text">{{ deckStore.deck(id)[attribute] }}</h2>
      <PButton
        class="icon"
        icon="pi pi-pencil"
        text
        @click="editable = !editable"
        :aria-label="`Edit ${attribute}`"
      />
    </div>
    <div class="pencil__wrapper" v-else>
      <InputText
        class="p-inputtext"
        v-focus
        v-model="deckStore.deck(id)[attribute]"
        @keyup.enter="editable = !editable"
        :placeholder="`${attribute}`"
      />
      <PButton
        icon="pi pi-check"
        text
        @click="editable = !editable"
        :aria-label="`Close edit of ${attribute}`"
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
