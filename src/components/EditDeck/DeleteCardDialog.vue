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
      <i class="pi pi-exclamation-triangle" />
      <p v-if="deckStore.card">
        Are you sure you want to delete&#32;<b>{{ deckStore.card.question }}</b
        >?
      </p>
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
        severity="danger"
        icon="pi pi-check"
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
