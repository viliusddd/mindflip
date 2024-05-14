<template>
  <PButton class="logo-container flip" text>
    <span class="first-word">Mind</span>
    <span cl class="second-word">Flip</span>
  </PButton>
</template>

<style scoped>
span {
  color: white;
  font-size: 1.5rem;
}
.logo-container {
  margin: 0 15px 0 0;
  padding: 0;
}
.first-word {
  font-weight: 100;
}
.second-word {
  font-weight: 300;
}

.flip:hover .first-word,
.flip:hover .second-word {
  animation: flip-bottom 0.8s cubic-bezier(0.455, 0.03, 0.515, 0.955) both;
}
.flip:not(:hover) {
  animation: flip-top 0.8s cubic-bezier(0.455, 0.03, 0.515, 0.955) reverse both;
}

@keyframes flip-bottom {
  0% {
    transform: rotateX(0);
  }
  100% {
    transform: rotateX(-360deg);
  }
}

@keyframes flip-top {
  0% {
    transform: rotateX(0);
  }
  100% {
    transform: rotateX(-360deg);
  }
}
@media (min-width: 40rem) {
  span {
    font-size: 2rem;
  }
  .logo-container {
    margin: 0 30px 0 0;
  }
}
</style>
