<script setup lang="ts">
import {useDeckStore} from '@/stores/DeckStore'
import {useSettingsStore} from '@/stores/SettingsStore'
import AppLogo from '@/components/AppLogo.vue'
import AppNav from '@/components/AppNav.vue'
import SettingsDialog from '@/components/SettingsDialog.vue'

const deckStore = useDeckStore()
const settingsStore = useSettingsStore()
deckStore.fill()
settingsStore.fill()
</script>

<template>
  <RouterView v-if="$route.name === 'Deck'"></RouterView>
  <div v-else class="container">
    <header class="header">
      <div class="header__container">
        <RouterLink to="/"><AppLogo /></RouterLink>
        <AppNav />
        <div class="settings-button">
          <PButton
            icon="pi pi-cog"
            text
            size="large"
            rounded
            v-tooltip.left="'Your profile settings'"
            aria-label="Cancel"
            @click="deckStore.settingsDialog = true"
          />
        </div>
      </div>
    </header>
    <main class="wrapper">
      <RouterView />
      <SettingsDialog />
    </main>
  </div>
</template>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: 1fr min(80ch, 100%) 1fr;
  margin: 15px 7px;
}
.wrapper > * {
  grid-column: 2;
}
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  background: hsl(0, 0%, 5%);
  padding: 1rem;
}
a {
  text-decoration: none;
}
.header__container {
  display: flex;
  max-width: 1024px;
  align-items: center;
  flex-grow: 1;
}
.header__tooltip {
  display: none;
}
.settings-button {
  margin: 0 0 0 auto;
}
@media (min-width: 40rem) {
  .header__tooltip {
    display: block;
  }
}
</style>
