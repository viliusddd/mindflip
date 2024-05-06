<template>
  <div class="nav-wrapper">
    <RouterLink to="/">
      <PButton label="decks" text />
    </RouterLink>
    <RouterLink to="/create">
      <PButton label="create a deck" text />
    </RouterLink>
  </div>
</template>

<style scoped>
.nav-wrapper {
  display: flex;
  column-gap: 30px;
}

* {
  font-size: 1.2rem;
  font-weight: 100;
}
.p-button {
  color: white;
  border: 0;
  padding: 0;
  margin: 0;
}
.p-button:hover {
  color: rgb(209, 209, 209);
  font-weight: 100;
}
.active {
  border-bottom: 3px solid white;
}
</style>
