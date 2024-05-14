<script setup lang="ts">
import {computed, ref} from 'vue'
import {useDeckStore} from '@/stores/DeckStore'
import type {Deck} from '@/stores/DeckStore'
import type {Ref, ComputedRef} from 'vue'

const deckStore = useDeckStore()

const deckName: Ref<string> = ref('')
const deckDescription: Ref<string> = ref('')

const icons = [
  {name: 'android'},
  {name: 'reddit'},
  {name: 'bitcoin'},
  {name: 'vimeo'},
  {name: 'slack'},
  {name: 'twitch'},
  {name: 'prime'}
]

const isMeetingRequirements = computed(() => {
  if (deckName.value.length >= 3 && deckDescription.value.length >= 3)
    return false
  else return true
})

const icon = ref(icons[Math.floor(Math.random() * icons.length)])

const id: number = deckStore.newId

const newDeck: ComputedRef<Deck> = computed(() => {
  return {
    cards: [],
    description: deckDescription.value,
    icon: icon.value.name,
    id,
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
        placeholder="Anatomy"
        v-model="deckName"
      />
      <label class="description" for="description-field">Description </label>
      <InputText
        @keyup.enter="addNewDeck"
        id="description-field"
        maxlength="200"
        placeholder="bones and muscles"
        v-model="deckDescription"
      />
      <label class="icon" for="icon-dropdown">Icon</label>
      <Dropdown
        :options="icons"
        id="icon-dropdown"
        v-model="icon"
        variant="filled"
        optionLabel="name"
      >
        <template #value="slotProps">
          <div v-if="slotProps.value" class="dropdown__option">
            <i :class="`icon-preview pi pi-${slotProps.value.name}`" />
            <div>{{ slotProps.value.name }}</div>
          </div>
        </template>
        <template #option="slotProps">
          <div class="dropdown__option">
            <i :class="`icon-preview pi pi-${slotProps.option.name}`" />
            <div>{{ slotProps.option.name }}</div>
          </div>
        </template>
      </Dropdown>
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
    </div>
  </div>
</template>

<style>
.dropdown__option {
  display: flex;
  align-items: center;
  column-gap: 5px;
}
.dropdown__option > i {
  font-size: 1.1rem;
}
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
