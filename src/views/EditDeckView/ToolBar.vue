<script setup lang="ts">
import {useMediaQuery} from '@vueuse/core'
import {createId} from './utils'
import {useDeckStore} from '@/stores/DeckStore'
import Papa from 'papaparse'
import type {Card} from '@/stores/DeckStore'
import type {FileUploadUploaderEvent} from 'primevue/fileupload'
import type {ParseResult} from 'papaparse'

const deckStore = useDeckStore()

const biggerMq = useMediaQuery('(min-width: 32rem)')
const smallerMq = useMediaQuery('(min-width: 28.5rem)')

const openNew = () => {
  deckStore.card = {
    answer: '',
    difficulty: 0,
    due: new Date(),
    elapsed_days: 0,
    id: createId(),
    lapses: 0,
    question: '',
    reps: 0,
    scheduled_days: 0,
    stability: 0,
    state: 0
  }
  deckStore.cardDialog = true
  deckStore.submitted = false
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
          if (!crd.difficulty) crd.difficulty = 0
          if (!crd.due) crd.due = new Date()
          if (!crd.elapsed_days) crd.elapsed_days = 0
          if (!crd.id) crd.id = createId()
          if (!crd.lapses) crd.lapses = 0
          if (!crd.reps) crd.reps = 0
          if (!crd.scheduled_days) crd.scheduled_days = 0
          if (!crd.stability) crd.stability = 0
          if (!crd.state) crd.state = 0
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
          @click="openNew"
          icon="pi pi-plus"
          :label="biggerMq ? 'New' : null"
          severity="success"
        />
        <PButton
          :disabled="
            !deckStore.selectedCards || !deckStore.selectedCards.length
          "
          @click="confirmDeleteSelected"
          icon="pi pi-trash"
          :label="smallerMq ? 'Delete' : null"
          severity="danger"
        />
      </div>
    </template>

    <template #end>
      <div class="btns-right">
        <FileUpload
          :maxFileSize="1000000"
          @uploader="onUpload"
          accept=".csv, text/csv"
          auto
          chooseLabel="Import"
          customUpload
          label="Import"
          mode="basic"
        />
        <PButton
          label="Export"
          icon="pi pi-download"
          severity="help"
          @click="exportCSV"
        />
      </div>
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
}
</style>
