<script setup>
import {computed, ref} from 'vue'
import {useDeckStore} from '@/stores/DeckStore'

const deckStore = useDeckStore()

const name = ref('')
const description = ref('')

const icons = ['android', 'bitcoin', 'bolt', 'at', 'car', 'home', 'prime']

const icon = ref(icons[0])

const id = deckStore.newId

const newDeck = computed(() => {
  return {
    name,
    description,
    id,
    icon,
    isHidden: false,
    cards: []
  }
})
function addNewDeck() {
  if (name.value.length && description.value.length) {
    deckStore.addDeck(newDeck.value)
  }
}
</script>

<template>
  <div class="wrapper">
    <h2 class="title">Create a new course</h2>
    <div class="fields">
      <label class="name" for="name-field">Name</label>
      <InputText id="name-field" v-model="name" />
      <label class="description" for="description-field">Description </label>
      <InputText
        id="description-field"
        @keyup.enter="addNewDeck"
        v-model="description"
      />
      <label class="icon" for="icon-dropdown">Icon</label>
      <Dropdown
        id="icon-dropdown"
        v-model="icon"
        variant="filled"
        :placeholder="icons[0]"
        :options="icons"
      />
      <br />
      <RouterLink
        @click="addNewDeck"
        class="create-route"
        :to="{name: 'EditDeck', params: {id}}"
      >
        <PButton
          class="create-btn"
          label="Create Course"
          type="submit"
          :raised="true"
        />
      </RouterLink>
      <i :class="`icon-preview pi pi-${icon}`"></i>
    </div>
  </div>
</template>

<style>
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
