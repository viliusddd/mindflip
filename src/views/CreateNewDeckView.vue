<script setup lang="ts">
import {computed, ref} from 'vue'
import {useDeckStore} from '@/stores/DeckStore'
import type {Deck} from '@/stores/DeckStore'
import type {Ref, ComputedRef} from 'vue'

const deckStore = useDeckStore()

const deckName: Ref<string> = ref('')
const deckDescription: Ref<string> = ref('')

const icons: string[] = [
  'android',
  'reddit',
  'bitcoin',
  'vimeo',
  'slack',
  'twitch',
  'prime'
]

const isMeetingRequirements = computed(() => {
  if (deckName.value.length >= 3 && deckDescription.value.length >= 3)
    return false
  else return true
})

const icon: Ref<string> = ref(icons[0])

const id: number = deckStore.newId

const newDeck: ComputedRef<Deck> = computed(() => {
  return {
    cards: [],
    description: deckDescription.value,
    icon: icon.value,
    id,
    isHidden: false,
    name: deckName.value
  }
})

function addNewDeck() {
  deckStore.addDeck(newDeck.value)
}
</script>

<template>
  <div class="wrapper">
    <h2 class="title">Create a new deck</h2>
    <div class="fields">
      <label class="name" for="name-field">Name</label>
      <InputText
        id="name-field"
        maxlength="50"
        placeholder="World Capitals"
        v-model="deckName"
      />
      <label class="description" for="description-field">Description </label>
      <InputText
        @keyup.enter="addNewDeck"
        id="description-field"
        maxlength="200"
        placeholder="Deck of whole world capitals"
        v-model="deckDescription"
      />
      <label class="icon" for="icon-dropdown">Icon</label>
      <Dropdown
        :options="icons"
        :placeholder="icons[0]"
        id="icon-dropdown"
        v-model="icon"
        variant="filled"
      />
      <br />
      <RouterLink
        :class="{disabled: isMeetingRequirements}"
        :to="{name: 'EditDeck', params: {id}}"
        class="create-route"
      >
        <PButton
          :raised="true"
          @click="addNewDeck"
          class="create-btn"
          label="Create Deck"
          type="submit"
        />
      </RouterLink>
      <i :class="`icon-preview pi pi-${icon}`"></i>
    </div>
  </div>
</template>

<style>
.disabled {
  opacity: 0.5;
  pointer-events: none;
}
.title {
  text-align: center;
}
.name {
  grid-area: name_label;
}
#name-field {
  grid-area: name_field;
}
.description {
  grid-area: desc_label;
}
#description-field {
  grid-area: desc_field;
}
.icon {
  grid-area: icon_label;
}
#icon-dropdown {
  grid-area: icon_field;
}
.create-btn {
  width: 100%;
}
.create-route {
  grid-area: btn;
}
.wrapper {
  display: flex;
  flex-direction: column;
}
.fields {
  display: grid;
  gap: 5px 5px;
  grid-template-columns: auto 1fr auto;
  grid-template-areas:
    '. icon'
    'name_label name_field'
    'desc_label desc_field'
    'icon_label icon_field'
    '. btn';
  grid: 1px solid red;
}
.name,
.description,
.icon {
  display: flex;
  align-items: center;
  margin-left: auto;
}
.icon-preview {
  display: flex;
  justify-content: center;
  font-size: 6ch;
  grid-area: icon;
}
@media (min-width: 30rem) {
  .fields {
    gap: 7px 5px;
    grid-template-columns: auto 1fr auto;
    grid-template-areas:
      'name_label name_field icon'
      'desc_label desc_field icon'
      'icon_label icon_field icon'
      '. btn .';
  }
  .icon-preview {
    font-size: 10ch;
  }
}
</style>
