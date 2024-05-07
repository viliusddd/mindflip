<script setup lang="ts" generic="T">
import {FilterMatchMode} from 'primevue/api'
import {ref, computed, onMounted} from 'vue'
import {useDeckStore} from '@/stores/DeckStore'
import {useTitle} from '@vueuse/core'
import Papa from 'papaparse'
import HoverButton from './HoverButton.vue'
import {statuses} from './consts'
import DeleteCardDialog from './DeleteCardDialog.vue'
import DeleteCardsDialog from './DeleteCardsDialog.vue'
import CardDialog from './CardDialog.vue'

import type {ParseResult} from 'papaparse'
import type {ComputedRef} from 'vue'
import type {Card, Deck} from '@/stores/DeckStore'
import type {FileUploadUploaderEvent} from 'primevue/fileupload'

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

const deckStore = useDeckStore()

const deck: ComputedRef<Deck> = computed(() =>
  deckStore.decks.find((obj) => obj.id === props.id)
)

deckStore.selectedDeckId = props.id

const title = computed(() => `Edit: ${deck.value.name}`)
useTitle(title)

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
          return word
        })

        deckStore.cards = deckStore.cards.concat(newData)
        deckStore.deck(props.id).cards = deckStore.cards
      }
    }

    reader.onerror = () => null
  }
}

onMounted(() => (deckStore.cards = deck.value.cards))

const dt = ref()

const filters = ref({
  global: {value: null, matchMode: FilterMatchMode.CONTAINS}
})
const openNew = () => {
  deckStore.card = {
    name: '',
    definition: '',
    status: 'new'
  }
  deckStore.submitted = false
  deckStore.cardDialog = true
}

const editCard = (prod) => {
  deckStore.card = {...prod}
  deckStore.cardDialog = true
}
const confirmDeleteCard = (prod) => {
  deckStore.card = prod
  deckStore.deleteCardDialog = true
}
const exportCSV = () => {
  dt.value.exportCSV()
}
const confirmDeleteSelected = () => {
  deckStore.deleteCardsDialog = true
}
</script>

<template>
  <div>
    <header>
      <HoverButton :id size="2.5ch" :isBold="true" attribute="name" />
      <HoverButton :id :isBold="false" attribute="description" />
    </header>
    submitted: {{ deckStore.submitted }} card: {{ deckStore.card }}
    <div class="card">
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
            :disabled="
              !deckStore.selectedCards || !deckStore.selectedCards.length
            "
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

      <DataTable
        ref="dt"
        :value="deckStore.cards"
        v-model:selection="deckStore.selectedCards"
        dataKey="id"
        :paginator="true"
        :rows="10"
        :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} cards"
      >
        <template #header>
          <div class="cards__title">
            <h4>Manage Cards</h4>
            <IconField iconPosition="left">
              <InputIcon><i class="pi pi-search" /></InputIcon>
              <InputText
                v-model="filters['global'].value"
                placeholder="Search..."
              />
            </IconField>
          </div>
        </template>

        <Column
          selectionMode="multiple"
          style="width: 1rem"
          :exportable="false"
        ></Column>
        <Column
          field="name"
          header="Name"
          sortable
          style="min-width: 5rem"
        ></Column>
        <Column
          field="definition"
          header="Definition"
          sortable
          style="min-width: 5rem"
        ></Column>
        <Column field="status" header="Status" sortable style="min-width: 3rem">
          <template #body="slotProps">
            <Tag
              :value="slotProps.data.status"
              :severity="
                statuses.find((obj) => obj.value === slotProps.data.status)
                  .severity
              "
            />
          </template>
        </Column>
        <Column :exportable="false" style="min-width: 7rem">
          <template #body="slotProps">
            <PButton
              icon="pi pi-pencil"
              outlined
              rounded
              class="mr-2"
              @click="editCard(slotProps.data)"
            />
            <PButton
              icon="pi pi-trash"
              outlined
              rounded
              severity="danger"
              @click="confirmDeleteCard(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>

    <CardDialog />
    <DeleteCardDialog />
    <DeleteCardsDialog />
  </div>
</template>

<style scoped>
header {
  margin: 0 0 20px 0;
}
.cards__title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
