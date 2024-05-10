<script setup lang="ts">
import {createEmptyCard, State} from 'ts-fsrs'
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
    :modal="true"
    :style="{width: '450px'}"
    class="p-fluid"
    header="Card Details"
    v-model:visible="deckStore.cardDialog"
  >
    <div class="field">
      <label for="name">Name</label>
      <InputText
        :invalid="deckStore.submitted && !deckStore.card.name"
        autofocus
        id="name"
        required="true"
        v-model.trim="deckStore.card.name"
      />
      <small class="p-error" v-if="deckStore.submitted && !deckStore.card.name"
        >Name is required.</small
      >
    </div>
    <div class="field">
      <label for="definition">Definition</label>
      <PTextarea
        cols="20"
        id="definition"
        required="true"
        rows="3"
        v-model="deckStore.card.definition"
      />
    </div>

    <div class="field">
      <label for="state">State</label>
      <Dropdown
        :options="states"
        :placeholder="State[0]"
        id="state"
        optionLabel="label"
        optionValue="value"
        v-model="deckStore.card.state"
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
