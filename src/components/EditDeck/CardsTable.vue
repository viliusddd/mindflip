<script setup lang="ts">
import {FilterMatchMode} from 'primevue/api'
import {ref, watch} from 'vue'
import {states} from './consts'
import {useDeckStore} from '@/stores/DeckStore'
import {State} from 'ts-fsrs'

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
    size="small"
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

    <Column selectionMode="multiple" style="width: 1rem" :exportable="false" />
    <Column field="name" header="Question" sortable style="min-width: 5rem" />
    <Column
      field="definition"
      header="Answer"
      sortable
      style="min-width: 5rem"
    />
    <Column field="due" header="Due">
      <template #body="slotProps">
        {{
          new Date(slotProps.data.due).toLocaleString('Lt', {
            dateStyle: 'short',
            timeStyle: 'short'
          })
        }}
      </template>
    </Column>
    <Column field="state" header="State" sortable style="min-width: 3rem">
      <template #body="slotProps">
        <Tag
          :value="State[slotProps.data.state]"
          :severity="
            states.find((obj) => obj.value === slotProps.data.state).severity
          "
        />
      </template>
    </Column>
    <Column :exportable="false" style="min-width: 7rem">
      <template #body="slotProps">
        <PButton
          icon="pi pi-pencil"
          rounded
          text
          @click="editCard(slotProps.data)"
        />
        <PButton
          icon="pi pi-trash"
          rounded
          text
          severity="danger"
          @click="confirmDeleteCard(slotProps.data)"
        />
      </template>
    </Column>
  </DataTable>
</template>

<style>
.cards__title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.p-datatable .p-datatable-tbody > tr > td {
  padding-top: 0px;
  padding-bottom: 0px;
}
.p-row-even:hover,
.p-row-odd:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
