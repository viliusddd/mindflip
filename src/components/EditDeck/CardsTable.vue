<script setup lang="ts">
import {FilterMatchMode} from 'primevue/api'
import {ref, watch} from 'vue'
import {State} from 'ts-fsrs'
import {states} from './consts'
import {useDeckStore} from '@/stores/DeckStore'
import {useMediaQuery} from '@vueuse/core'

const deckStore = useDeckStore()

const biggerMq = useMediaQuery('(min-width: 45rem)')
const smallerMq = useMediaQuery('(min-width: 35rem)')

const filters = ref({
  global: {value: null, matchMode: FilterMatchMode.CONTAINS}
})
const editCard = (prod) => {
  deckStore.card = {...prod}
  deckStore.cardDialog = true
}

const dataTable = ref()

watch(dataTable, () => (deckStore.dataTable = dataTable.value))
</script>

<template>
  <DataTable
    :filters="filters"
    :paginator="true"
    :rows="15"
    :rowsPerPageOptions="[5, 10, 20, 40]"
    :value="deckStore.cards"
    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} cards"
    dataKey="id"
    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
    ref="dataTable"
    size="small"
    v-model:selection="deckStore.selectedCards"
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

    <Column selectionMode="multiple" :exportable="false" />
    <Column
      field="question"
      header="Question"
      sortable
      style="min-width: 5rem"
    />
    <Column field="answer" header="Answer" sortable style="min-width: 5rem" />
    <Column
      v-if="smallerMq"
      field="due"
      header="Due"
      sortable
      style="min-width: 7rem; width: 10rem"
    >
      <template #body="slotProps">
        {{
          new Date(slotProps.data.due).toLocaleString('Lt', {
            dateStyle: 'short',
            timeStyle: 'short'
          })
        }}
      </template>
    </Column>
    <Column v-if="biggerMq" field="state" header="State" sortable>
      <template #body="slotProps">
        <Tag
          :value="State[slotProps.data.state]"
          :severity="
            states.find((obj) => obj.value === slotProps.data.state).severity
          "
        />
      </template>
    </Column>
    <Column :exportable="false" style="width: 2rem">
      <template #body="slotProps">
        <PButton
          @click="editCard(slotProps.data)"
          icon="pi pi-pencil"
          rounded
          text
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
  padding: 3px 2px;
}
.p-datatable th {
  padding: 6px 2px;
}
.p-row-even:hover,
.p-row-odd:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
@media (min-width: 35rem) {
  .p-datatable .p-datatable-tbody > tr > td {
    padding: 6px 8px;
  }
  .p-datatable th {
    padding: 6px 8px;
  }
}
</style>
