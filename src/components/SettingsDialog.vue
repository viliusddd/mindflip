<script setup lang="ts">
import {useDeckStore} from '@/stores/DeckStore'
import {useSettingsStore} from '@/stores/SettingsStore'

const deckStore = useDeckStore()
const settingsStore = useSettingsStore()
</script>

<template>
  <PDialog
    :modal="true"
    :style="{width: '370px'}"
    header="Settings"
    v-model:visible="deckStore.settingsDialog"
  >
    <div class="cards-number">
      <label for="num-per-review">Number of cards per review:</label>
      <InputNumber
        class="form-control"
        v-model="settingsStore.cardsPerReview"
        inputId="num-per-review"
        mode="decimal"
        showButtons
        :step="5"
        :min="5"
        :max="30"
      />
    </div>
  </PDialog>
</template>

<style>
.cards-number {
  display: grid;
  grid-template-columns: auto 80px;
  align-items: center;
}
.cards-number .p-inputtext {
  display: inline-block;
  width: 80px;
}
</style>
