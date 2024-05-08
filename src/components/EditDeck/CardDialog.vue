<script setup lang="ts">
import {statuses} from './consts'
import {useDeckStore} from '@/stores/DeckStore'
import type {Card} from '@/stores/DeckStore'
import {createId} from './utils'

const deckStore = useDeckStore()

const hideDialog = () => {
  deckStore.cardDialog = false
  deckStore.submitted = false
}

function updateCard(newCard: Card) {
  for (let card of deckStore.deck.cards) {
    if (card.name === newCard.name) {
      deckStore.deck.cards = deckStore.deck.cards.filter(
        (card) => card.name !== newCard.name
      )
      deckStore.deck.cards.push(newCard)
      break
    }
  }
}

const saveCard = () => {
  deckStore.submitted = true

  if (deckStore.card.name.trim()) {
    deckStore.card.status = deckStore.card.status
      ? deckStore.card.status
      : 'new'

    // check if card with same name exists. override/update if exists

    // save card
    deckStore.card['id'] = createId()
    deckStore.cards.push(
      Object.assign({}, deckStore.card, createEmptyCard(new Date()))
    )

    // reset values
    deckStore.cardDialog = false
    deckStore.card = null
  }
}
</script>

<template>
  <PDialog
    v-model:visible="deckStore.cardDialog"
    :style="{width: '450px'}"
    header="Card Details"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="name">Name</label>
      <InputText
        id="name"
        v-model.trim="deckStore.card.name"
        required="true"
        autofocus
        :invalid="deckStore.submitted && !deckStore.card.name"
      />
      <small class="p-error" v-if="deckStore.submitted && !deckStore.card.name"
        >Name is required.</small
      >
    </div>
    <div class="field">
      <label for="definition">Definition</label>
      <PTextarea
        id="definition"
        v-model="deckStore.card.definition"
        required="true"
        rows="3"
        cols="20"
      />
    </div>

    <div class="field">
      <label for="status">Card Status</label>
      <Dropdown
        id="status"
        v-model="deckStore.card.status"
        :options="statuses"
        optionLabel="value"
        optionValue="value"
        placeholder="Select a Status"
      >
        <template #value="slotProps">
          <div v-if="slotProps.value">
            <Tag
              :value="slotProps.value"
              :severity="
                statuses.find((obj) => obj.value === slotProps.value).severity
              "
            />
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
      </Dropdown>
    </div>

    <template #footer>
      <PButton label="Cancel" icon="pi pi-times" text @click="hideDialog" />
      <PButton label="Save" icon="pi pi-check" text @click="saveCard" />
    </template>
  </PDialog>
</template>
