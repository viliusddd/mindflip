<script setup lang="ts">
import {useDeckStore} from '@/stores/DeckStore'

const deckStore = useDeckStore()
deckStore.fill()
</script>

<template>
  <RouterView v-if="$route.name === 'Deck'"></RouterView>
  <div v-else class="container">
    <header class="header">
      <RouterLink to="/">
        <h2 class="header__title">FlashyCards</h2>
      </RouterLink>
      <nav>
        <RouterLink to="/">
          <Button text>Courses</Button>
        </RouterLink>
        <RouterLink to="/create">
          <Button text>Create a course</Button>
        </RouterLink>
      </nav>
      <div class="settings-button">
        <Button
          icon="pi pi-user-edit"
          severity="info"
          text
          size="large"
          rounded
          v-tooltip.left="'Your profile settings'"
          aria-label="Cancel"
        />
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
  margin: 0 15px 0;
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
  background: lightblue;
  font-size: 1.5rem;
  padding: 1rem;
}
.header__title {
  margin: 0 30px 0 0;
}
a {
  text-decoration: none;
  color: inherit;
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
