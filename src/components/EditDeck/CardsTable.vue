<script setup lang="ts">
import {FilterMatchMode} from 'primevue/api'
import {ref, watch} from 'vue'
import {statuses} from './consts'
import {useDeckStore} from '@/stores/DeckStore'

const deckStore = useDeckStore()

const filters = ref({
  global: {value: null, matchMode: FilterMatchMode.CONTAINS}
})
const editCard = (prod) => {
  deckStore.card = {...prod}
  deckStore.cardDialog = true
}
const confirmDeleteCard = (prod) => {
  deckStore.card = prod
  deckStore.deleteCardDialog = true
}

const dataTable = ref()

watch(dataTable, () => (deckStore.dataTable = dataTable.value))
</script>

<template>
  <DataTable
    ref="dataTable"
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
            statuses.find((obj) => obj.value === slotProps.data.status).severity
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
</template>
