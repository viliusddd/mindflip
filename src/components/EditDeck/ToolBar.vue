<script setup lang="ts">
import {useDeckStore} from '@/stores/DeckStore'
import type {FileUploadUploaderEvent} from 'primevue/fileupload'
import Papa from 'papaparse'
import {createId} from './utils'

import type {Card} from '@/stores/DeckStore'
import type {ParseResult} from 'papaparse'

const deckStore = useDeckStore()

const openNew = () => {
  deckStore.card = {
    name: '',
    definition: '',
    status: 'new',
    difficulty: 0,
    due: new Date(),
    elapsed_days: 0,
    lapses: 0,
    reps: 0,
    scheduled_days: 0,
    stability: 0,
    state: 0,
    id: createId()
  }
  deckStore.submitted = false
  deckStore.cardDialog = true
}

const exportCSV = () => {
  deckStore.dataTable.exportCSV()
}

const confirmDeleteSelected = () => {
  deckStore.deleteCardsDialog = true
}

function onUpload(event: FileUploadUploaderEvent) {
  const file = event.files

  if (file) {
    const reader = new FileReader()
    reader.readAsText(file[0], 'UTF-8')

    reader.onload = (evt) => {
      const rawData = evt?.target?.result
      if (typeof rawData === 'string') {
        const parsedData: ParseResult<Card> = Papa.parse<Card>(rawData, {
          header: true
        })

        const newData = parsedData.data.map((word) => {
          if (!word.status) word.status = 'new'
          if (!word.difficulty) word.difficulty = 0
          if (!word.due) word.due = new Date()
          if (!word.elapsed_days) word.elapsed_days = 0
          if (!word.lapses) word.lapses = 0
          if (!word.reps) word.reps = 0
          if (!word.scheduled_days) word.scheduled_days = 0
          if (!word.stability) word.stability = 0
          if (!word.state) word.state = 0
          if (!word.id) word.id = createId()
          return word
        })

        deckStore.addCards(newData)
      }
    }

    reader.onerror = () => null
  }
}
</script>

<template>
  <Toolbar class="mb-4">
    <template #start>
      <PButton
        label="New"
        icon="pi pi-plus"
        severity="success"
        class="mr-2"
        @click="openNew"
      />
      <PButton
        label="Delete"
        icon="pi pi-trash"
        severity="danger"
        @click="confirmDeleteSelected"
        :disabled="!deckStore.selectedCards || !deckStore.selectedCards.length"
      />
    </template>

    <template #end>
      <FileUpload
        mode="basic"
        accept=".csv, text/csv"
        :maxFileSize="1000000"
        label="Import"
        chooseLabel="Import"
        class="mr-2 inline-block"
        auto
        customUpload
        @uploader="onUpload"
      />
      <PButton
        label="Export"
        icon="pi pi-download"
        severity="help"
        @click="exportCSV"
      />
    </template>
  </Toolbar>
</template>
