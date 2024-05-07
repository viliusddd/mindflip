<script setup lang="ts">
import {computed, ref} from 'vue'
import {useDeckStore} from '@/stores/DeckStore'
import {useRouter} from 'vue-router'

const router = useRouter()

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

const deckStore = useDeckStore()

deckStore.deckId = props.id

const value = ref('')

const buttonLabel = ref('Next Card')
const activeCardIndex = ref(0)

const cards = deckStore?.deck(props.id)?.cards

const progressBarValue = computed(() => {
  return (100 / cards.length) * activeCardIndex.value
})

function goNextCard() {
  if (activeCardIndex.value === cards.length - 2) {
    buttonLabel.value = 'Finish'
    activeCardIndex.value += 1
  } else if (activeCardIndex.value === cards.length - 1) {
    router.go(-1)
  } else {
    activeCardIndex.value += 1
  }
}
</script>

<template>
  <div class="container">
    <header class="header">
      <div class="header__title">{{ deckStore?.deck?.name }}</div>
      <PButton
        class="header__tooltip"
        icon="pi pi-info-circle"
        severity="info"
        text
        rounded
        aria-label="Hotkeys info"
        v-tooltip.left="'Keyboard shortcuts'"
      />
      <PButton
        icon="pi pi-times"
        @click="$router.go(-1)"
        style="font-size: 4rem; margin: 0px"
        severity="info"
        text
        rounded
        aria-label="Cancel"
        v-tooltip.left="'Exit the session'"
      />
    </header>
    <div class="wrapper">
      <div class="container">
        <div class="flashcard">
          <ProgressBar
            class="flashcard__progress"
            :show-value="false"
            :value="progressBarValue"
          ></ProgressBar>
          <div
            class="flashcard__score"
            v-tooltip.left="'The possicion of current card in deck.'"
          >
            {{ activeCardIndex + 1 }}
          </div>
          <div class="flashcard__body">
            <div class="flashcard__title">
              <p>Type the correct answer</p>
            </div>
            <div class="flashcard__definition">
              <h1>{{ cards[activeCardIndex].definition }}</h1>
            </div>
            <div>
              {{ deckStore?.deck?.name }}
              <InputText
                class="flashcard__input"
                type="text"
                v-model="value"
                spellcheck="false"
                autocapitalize="off"
                autocomplete="off"
                autocorrect="off"
              />
            </div>
          </div>
          <PButton
            class="flashcard__button"
            severity="info"
            :label="buttonLabel"
            :raised="true"
            aria-label="Hotkeys next"
            @click="goNextCard"
          />
          <div class="flashcard__options">
            <PButton
              icon="pi pi-bolt"
              rounded
              text
              v-tooltip.bottom="'Mark a word as difficult'"
            />
            <PButton
              icon="pi pi-ban"
              rounded
              text
              v-tooltip.bottom="
                'Mark this word as known and you will not be tested on it again'
              "
            />
          </div>
        </div>
      </div>
    </div>
    <div class="difficulty__buttons">
      <PButton :raised="true" v-tooltip.top="'<10m'" label="Again" />
      <PButton :raised="true" v-tooltip.top="'2d'" label="Hard" />
      <PButton :raised="true" v-tooltip.top="'7d'" label="Good" />
      <PButton :raised="true" v-tooltip.top="'14d'" label="Easy" />
    </div>
    <footer></footer>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  background: lightblue;
  font-size: 1.5rem;
  padding: 1rem;
}
.footer {
  margin-top: auto;
}
.header__title {
  margin: 0 auto 0 0;
}
.wrapper {
  display: grid;
  grid-template-columns: 1fr min(100ch, 100%) 1fr;
}
.wrapper > * {
  grid-column: 2;
}
.full-bleed {
  width: 100%;
  grid-column: 1/4;
}
.flashcard {
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 3rem 5rem;
  padding: 1rem;
  gap: 1rem 0.5rem;
  grid-template-areas:
    'progress score options'
    'body body body'
    'button button button';
}
.flashcard__progress {
  grid-area: progress;
  height: 30px;
}
.flashcard__score {
  display: flex;
  justify-content: center;
  align-items: center;
  background: hsl(214, 32%, 97%);
  border-radius: 50px;
  height: 30px;
  vertical-align: center;
}
.flashcard__body {
  grid-area: body;
}
.flashcard__button {
  display: flex;
  justify-content: center;
  align-items: center;
  grid-area: button;
}
.flashcard__options > PButton {
  flex-shrink: 0;
}
.flashcard__options {
  display: flex;
  flex-shrink: 0;
  grid-area: options;
}
.flashcard__input {
  background: hsl(214, 32%, 91%);
  height: 60px;
  font-size: 3ch;
  width: 100%;
  margin: 15px 0;
}
.flashcard__title {
  display: none;
  height: 65.9px;
}
.flashcard__title > p {
  font-size: 3ch;
  margin: 0 0 30px 0;
}
.flashcard__definition {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 108.75px;
  margin: 8px;
}
.flashcard__definition > h1 {
  text-align: center;
  margin: 0;
  padding: 0;
}
.header__tooltip {
  display: none;
}
.difficulty__buttons {
  display: flex;
  justify-content: center;
  column-gap: 3px;
}
@media (min-width: 40rem) {
  .header__tooltip {
    display: flex;
  }
  .flashcard__title {
    display: block;
  }
  .flashcard {
    gap: 2rem 1.5rem;
    grid-template-columns: 1fr 5.25rem;
    grid-template-rows: 30px max-content 1fr;
    padding: 2rem;
    align-items: center;
    grid-template-areas:
      'progress score'
      'body button'
      'body options';
  }
  .flashcard__options {
    margin-bottom: auto;
  }
  .flashcard__button {
    height: 113.59px;
  }
}
</style>
