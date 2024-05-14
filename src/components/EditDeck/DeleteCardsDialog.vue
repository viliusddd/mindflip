<script setup lang="ts">
import {useDeckStore} from '@/stores/DeckStore'

const deckStore = useDeckStore()
</script>

<template>
  <PDialog
    :modal="true"
    :style="{width: '370px'}"
    header="Confirm"
    v-model:visible="deckStore.deleteCardsDialog"
  >
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle" style="font-size: 2rem" />
      <p>Are you sure you want to delete the selected cards?</p>
    </div>
    <template #footer>
      <PButton
        @click="deckStore.deleteCardsDialog = false"
        icon="pi pi-times"
        label="No"
        text
      />
      <PButton
        @click="deckStore.deleteSelectedCards"
        icon="pi pi-check"
        severity="danger"
        label="Yes"
        text
      />
    </template>
  </PDialog>
</template>

<style scoped>
.confirmation-content {
  display: flex;
  align-items: center;
  justify-content: center;
}
.confirmation-content i {
  font-size: 2rem;
  margin-right: 10px;
}
.confirmation-content p {
  margin: 0;
}
</style>
