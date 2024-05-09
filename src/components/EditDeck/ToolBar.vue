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

        const newData = parsedData.data.map((crd) => {
          if (!crd.status) crd.status = 'new'
          if (!crd.difficulty) crd.difficulty = 0
          if (!crd.due) crd.due = new Date()
          if (!crd.elapsed_days) crd.elapsed_days = 0
          if (!crd.lapses) crd.lapses = 0
          if (!crd.reps) crd.reps = 0
          if (!crd.scheduled_days) crd.scheduled_days = 0
          if (!crd.stability) crd.stability = 0
          if (!crd.state) crd.state = 0
          if (!crd.id) crd.id = createId()
          return crd
        })

        deckStore.addCards(newData)
      }
    }

    reader.onerror = () => null
  }
}
</script>

<template>
  <Toolbar class="toolbar">
    <template #start>
      <div class="btns-left">
        <PButton
          label="New"
          icon="pi pi-plus"
          severity="success"
          @click="openNew"
        />
        <PButton
          label="Delete"
          icon="pi pi-trash"
          severity="danger"
          @click="confirmDeleteSelected"
          :disabled="
            !deckStore.selectedCards || !deckStore.selectedCards.length
          "
        />
      </div>
    </template>

    <template #end>
      <dir class="btns-right">
        <FileUpload
          mode="basic"
          accept=".csv, text/csv"
          :maxFileSize="1000000"
          label="Import"
          chooseLabel="Import"
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
      </dir>
    </template>
  </Toolbar>
</template>

<style scoped>
.btns-left,
.btns-right {
  display: flex;
  column-gap: 5px;
}
.toolbar {
  margin-top: 15px;
  padding-top: 0;
  padding-bottom: 0;
}
</style>
