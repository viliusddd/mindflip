// @ts-nocheck
<script setup lang="ts">
import {FilterMatchMode} from 'primevue/api'
import {ref, computed, onMounted} from 'vue'
import {useDeckStore} from '@/stores/DeckStore'
import {useTitle} from '@vueuse/core'
import Papa from 'papaparse'
import HoverButton from './HoverButton.vue'
import type {Ref, ComputedRef} from 'vue'
import type {Card, Deck} from '@/stores/DeckStore'
import type {FileUploadUploaderEvent} from 'primevue/fileupload'

const props = defineProps({
  id: Number
})

const deckStore = useDeckStore()
const deck: ComputedRef<Deck> = computed(() =>
  deckStore.decks.find((obj) => obj.id === props.id)
)

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
  const file: any = event.files
  if (file) {
    const reader = new FileReader()
    reader.readAsText(file, 'UTF-8')
    reader.onload = (evt: Event) => {
      const parsedData = Papa.parse(evt?.target.result, {header: true})

      parsedData.data = parsedData.data.map((word) => {
        if (!word?.status) word.status = 'new'
        return word
      })

      cards.value = cards.value.concat(parsedData.data)
      deckStore.deck(props.id).cards = cards.value
    }
    reader.onerror = () => null
  }
}

onMounted(() => (cards.value = deck.value.cards))

const dt = ref()
const cards: Ref<Card[]> = ref()

const productDialog = ref(false)
const deleteCardDialog = ref(false)
const deleteCardsDialog = ref(false)
const card: Ref<Card> = ref()
const selectedCards = ref()
const filters = ref({
  global: {value: null, matchMode: FilterMatchMode.CONTAINS}
})
const submitted = ref(false)

const openNew = () => {
  card.value = {
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

  if (card?.value.name?.trim()) {
    let existingCard = deck.value.cards.filter(
      (obj) => obj.name === card.value.name
    )
    if (existingCard.length) {
      updateCard(card.value)

      existingCard[0] = card.value
    } else {
      card.value.status = card.value.status ? card.value.status : 'new'
      cards.value.push(card.value)
    }

    productDialog.value = false
    card.value = {
      name: '',
      definition: '',
      status: 'new'
    }
  }
}
const editCard = (prod) => {
  card.value = {...prod}
  productDialog.value = true
}
const confirmDeleteCard = (prod) => {
  card.value = prod
  deleteCardDialog.value = true
}
const deleteCard = () => {
  deck.value.cards = deck.value.cards.filter(
    (obj) => obj.name !== card.value.name
  )
  cards.value = cards.value.filter((val) => val.name !== card.value.name)

  deleteCardDialog.value = false
  card.value = {
    name: '',
    definition: '',
    status: 'new'
  }
}

const exportCSV = () => {
  dt.value.exportCSV()
}
const confirmDeleteSelected = () => {
  deleteCardsDialog.value = true
}
const deleteSelectedCards = () => {
  deck.value.cards = deck.value.cards.filter(
    (val) => !selectedCards.value.includes(val)
  )

  cards.value = cards.value.filter((val) => !selectedCards.value.includes(val))

  deleteCardsDialog.value = false
  selectedCards.value = null
}

const statuses = ref([
  {value: 'new', severity: 'danger'},
  {value: 'learning', severity: 'warning'},
  {value: 'learned', severity: 'success'}
])
</script>

<template>
  <div>
    <header>
      <HoverButton :id size="2.5ch" :isBold="true" attribute="name" />
      <HoverButton :id :isBold="false" attribute="description" />
    </header>
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
            :disabled="!selectedCards || !selectedCards.length"
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
            @click="exportCSV($event)"
          />
        </template>
      </Toolbar>

      <DataTable
        ref="dt"
        :value="cards"
        v-model:selection="selectedCards"
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
              :severity="slotProps.data.status"
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
          v-model.trim="card.name"
          required="true"
          autofocus
          :invalid="submitted && !card.name"
        />
        <small class="p-error" v-if="submitted && !card.name"
          >Name is required.</small
        >
      </div>
      <div class="field">
        <label for="definition">Definition</label>
        <PTextarea
          id="definition"
          v-model="card.definition"
          required="true"
          rows="3"
          cols="20"
        />
      </div>

      <div class="field">
        <label for="status">Card Status</label>
        <Dropdown
          id="status"
          v-model="card.status"
          :options="statuses"
          optionLabel="value"
          optionValue="value"
          placeholder="Select a Status"
        >
          <template #value="slotProps">
            <div v-if="slotProps.value">
              <Tag :value="slotProps.value" :severity="slotProps.severity" />
              <!-- @vue-ignore -->
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

    <PDialog
      v-model:visible="deleteCardDialog"
      :style="{width: '450px'}"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="card"
          >Are you sure you want to delete <b>{{ card.name }}</b
          >?</span
        >
      </div>
      <template #footer>
        <PButton
          label="No"
          icon="pi pi-times"
          text
          @click="deleteCardDialog = false"
        />
        <PButton label="Yes" icon="pi pi-check" text @click="deleteCard" />
      </template>
    </PDialog>

    <PDialog
      v-model:visible="deleteCardsDialog"
      :style="{width: '450px'}"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="card"
          >Are you sure you want to delete the selected cards?</span
        >
      </div>
      <template #footer>
        <PButton
          label="No"
          icon="pi pi-times"
          text
          @click="deleteCardsDialog = false"
        />
        <PButton
          label="Yes"
          icon="pi pi-check"
          text
          @click="deleteSelectedCards"
        />
      </template>
    </PDialog>
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
