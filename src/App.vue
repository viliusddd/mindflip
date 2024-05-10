<script setup lang="ts">
import {useDeckStore} from '@/stores/DeckStore'
import AppLogo from '@/components/AppLogo.vue'
import AppNav from '@/components/AppNav.vue'

const deckStore = useDeckStore()
deckStore.fill()
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
          />
        </div>
      </div>
    </header>
    <main class="wrapper">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: 1fr min(80ch, 100%) 1fr;
  margin: 15px 0px;
}
.wrapper > * {
  grid-column: 2;
}
.full-bleed {
  width: 100%;
  grid-column: 1/4;
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
  padding-left: 9px;
}
@media (min-width: 40rem) {
  .header__tooltip {
    display: block;
  }
}
</style>
