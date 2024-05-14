<template>
  <div class="nav-wrapper">
    <RouterLink class="router-lnk" to="/">
      <PButton label="decks" text />
    </RouterLink>
    <RouterLink class="router-lnk" to="/create">
      <PButton label="create a deck" text />
    </RouterLink>
  </div>
</template>

<style scoped>
.nav-wrapper {
  display: flex;
  align-items: center;
  column-gap: 10px;
}
* {
  font-size: 1.2rem;
  font-weight: 100;
}
.p-button {
  color: white;
  padding: 0;
}
.router-lnk {
  border-bottom: 3px solid transparent;
}
.p-button:hover {
  color: rgb(209, 209, 209);
  font-weight: 100;
}
.active {
  border-bottom: 3px solid white;
}
@media (min-width: 40rem) {
  .nav-wrapper {
    display: flex;
    align-items: center;
    column-gap: 30px;
  }
}
</style>
