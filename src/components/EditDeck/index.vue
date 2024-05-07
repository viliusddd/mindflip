<script setup lang="ts" generic="T">
import {FilterMatchMode} from 'primevue/api'
import {ref, computed, onMounted} from 'vue'
import {useDeckStore} from '@/stores/DeckStore'
import {useTitle} from '@vueuse/core'
import Papa from 'papaparse'
import HoverButton from './HoverButton.vue'

import DeleteCardDialog from './DeleteCardDialog.vue'
import DeleteCardsDialog from './DeleteCardsDialog.vue'

import type {ParseResult} from 'papaparse'
import type {Ref, ComputedRef} from 'vue'
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

function updateCard(newCard: Card) {
  for (let card of deck.value.cards) {
    if (card.name === newCard.name) {
      deck.value.cards = deck.value.cards.filter(
        (card) => card.name !== newCard.name
      )
      deck.value.cards.push(newCard)
      break
    }
  }
}

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

const productDialog = ref(false)
const filters = ref({
  global: {value: null, matchMode: FilterMatchMode.CONTAINS}
})
const submitted = ref(false)

const openNew = () => {
  deckStore.card = {
    name: '',
    definition: '',
    status: 'new'
  }
  submitted.value = false
  productDialog.value = true
}
const hideDialog = () => {
  productDialog.value = false
  submitted.value = false
}
const saveCard = () => {
  submitted.value = true

  if (deckStore.card.name.trim()) {
    let existingCard = deck.value.cards.filter(
      (obj) => obj.name === deckStore.card.name
    )
    if (existingCard.length) {
      updateCard(deckStore.card)

      existingCard[0] = deckStore.card
    } else {
      deckStore.card.status = deckStore.card.status
        ? deckStore.card.status
        : 'new'
      deckStore.cards.push(deckStore.card)
    }

    productDialog.value = false
    deckStore.card = {
      name: '',
      definition: '',
      status: 'new'
    }
  }
}
const editCard = (prod) => {
  deckStore.card = {...prod}
  productDialog.value = true
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
const statuses = [
  {label: 'danger', value: 'new', severity: 'danger'},
  {label: 'warning', value: 'learning', severity: 'warning'},
  {label: 'success', value: 'learned', severity: 'success'}
]
</script>

<template>
  <div>
    <header>
      <HoverButton :id size="2.5ch" :isBold="true" attribute="name" />
      <HoverButton :id :isBold="false" attribute="description" />
    </header>
    selected: {{ deckStore.selectedCards }} card: {{ deckStore.card }}
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

    <PDialog
      v-model:visible="productDialog"
      :style="{width: '450px'}"
      header="Card Details"
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <label for="name">Name</label>
        <InputText
          id="name"
          v-model.trim="deckStore.card.name"
          required="true"
          autofocus
          :invalid="submitted && !deckStore.card.name"
        />
        <small class="p-error" v-if="submitted && !deckStore.card.name"
          >Name is required.</small
        >
      </div>
      <div class="field">
        <label for="definition">Definition</label>
        <PTextarea
          id="definition"
          v-model="deckStore.card.definition"
          required="true"
          rows="3"
          cols="20"
        />
      </div>

      <div class="field">
        <label for="status">Card Status</label>
        <Dropdown
          id="status"
          v-model="deckStore.card.status"
          :options="statuses"
          optionLabel="value"
          optionValue="value"
          placeholder="Select a Status"
        >
          <template #value="slotProps">
            <div v-if="slotProps.value">
              <Tag
                :value="slotProps.value"
                :severity="
                  statuses.find((obj) => obj.value === slotProps.value).severity
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
