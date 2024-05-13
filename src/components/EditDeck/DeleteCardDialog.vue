<script setup lang="ts">
import {useDeckStore} from '@/stores/DeckStore'

const deckStore = useDeckStore()
</script>

<template>
  <PDialog
    :modal="true"
    :style="{width: '450px'}"
    header="Confirm"
    v-model:visible="deckStore.deleteCardDialog"
  >
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <span v-if="deckStore.card"
        >Are you sure you want to delete <b>{{ deckStore.card.question }}</b
        >?</span
      >
    </div>
    <template #footer>
      <PButton
        @click="deckStore.deleteCardDialog = false"
        icon="pi pi-times"
        label="No"
        text
      />
      <PButton
        @click="deckStore.deleteCard"
        icon="pi pi-check"
        label="Yes"
        text
      />
    </template>
  </PDialog>
</template>
