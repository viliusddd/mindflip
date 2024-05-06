<template>
  <PButton class="logo-container flip-horizontal-bottom" text>
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

.flip-horizontal-bottom:hover {
  animation: flip-horizontal-bottom 0.8s cubic-bezier(0.455, 0.03, 0.515, 0.955)
    both;
}
.flip-horizontal-bottom:not(:hover) {
  animation: flip-horizontal-top 0.8s cubic-bezier(0.455, 0.03, 0.515, 0.955)
    reverse both;
}

@keyframes flip-horizontal-bottom {
  0% {
    transform: rotateX(0);
  }
  100% {
    transform: rotateX(-360deg);
  }
}

@keyframes flip-horizontal-top {
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
