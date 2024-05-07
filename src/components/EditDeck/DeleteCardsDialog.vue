<script setup lang="ts">
import {useDeckStore} from '@/stores/DeckStore'

const deckStore = useDeckStore()
</script>

<template>
  <PDialog
    v-model:visible="deckStore.deleteCardsDialog"
    :style="{width: '450px'}"
    header="Confirm"
    :modal="true"
  >
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <span v-if="deckStore.card"
        >Are you sure you want to delete the selected cards?</span
      >
    </div>
    <template #footer>
      <PButton
        label="No"
        icon="pi pi-times"
        text
        @click="deckStore.deleteCardsDialog = false"
      />
      <PButton
        label="Yes"
        icon="pi pi-check"
        text
        @click="deckStore.deleteSelectedCards"
      />
    </template>
  </PDialog>
</template>
