<script setup lang="ts">
import {createEmptyCard, State} from 'ts-fsrs'
import {createId} from './utils'
import {states} from './consts'
import {useDeckStore} from '@/stores/DeckStore'

const deckStore = useDeckStore()

const hideDialog = () => {
  deckStore.cardDialog = false
  deckStore.submitted = false
}

const saveCard = () => {
  deckStore.submitted = true

  if (deckStore.card.name.trim()) {
    deckStore.addCard(
      Object.assign({}, createEmptyCard(new Date()), deckStore.card)
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
      <label for="state">State</label>
      <Dropdown
        id="state"
        v-model="deckStore.card.state"
        :options="states"
        optionLabel="label"
        optionValue="value"
        :placeholder="State[0]"
      >
        <template #value="slotProps">
          <div v-if="slotProps.value">
            <Tag
              :value="State[slotProps.value]"
              :severity="
                states.find((obj) => obj.value === slotProps.value).severity
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
