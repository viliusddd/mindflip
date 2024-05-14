<script setup lang="ts">
import {computed, ref} from 'vue'
import {fsrs, generatorParameters, Rating} from 'ts-fsrs'
import {onKeyUp} from '@vueuse/core'
import {useDeckStore} from '@/stores/DeckStore'
import {useSettingsStore} from '@/stores/SettingsStore'
import {useRouter} from 'vue-router'
import type {Card} from '@/stores/DeckStore'

const router = useRouter()

const props = defineProps<{
  id: number
}>()

const deckStore = useDeckStore()
const SettingsStore = useSettingsStore()

deckStore.deckId = props.id

const cardIndex = ref(0)
let cards: Card[]

const showAnswer = ref(false)
const hotkeysVisible = ref(false)

if (deckStore.dueReview) {
  cards = deckStore.cardsDue.slice(0, SettingsStore.cardsPerReview)
  deckStore.dueReview = false
} else {
  cards = deckStore.cards.slice(0, SettingsStore.cardsPerReview)
}

const card = computed(() => cards[cardIndex.value])

const progressBarValue = computed(() => {
  return (100 / cards.length) * cardIndex.value
})

function goNextCard() {
  if (cardIndex.value === cards.length - 2) {
    cardIndex.value++
  } else if (cardIndex.value === cards.length - 1) {
    router.go(-1)
  } else {
    cardIndex.value++
  }
  showAnswer.value = false
}

const fsrsParams = generatorParameters({enable_fuzz: true})
const fsrsInstance = fsrs(fsrsParams)

const schedulingCards = (crd: Card) => fsrsInstance.repeat(crd, new Date())

function saveCard(rating) {
  const cardLog = schedulingCards(card.value)
  const newCardVal: Card = cardLog[Rating[rating]].card
  deckStore.addCard(newCardVal)

  goNextCard()
}

function markAsDifficult() {
  card.value.difficulty = 10
  goNextCard()
}

onKeyUp('Enter', (evt) => evt.preventDefault())

onKeyUp(' ', (evt) => {
  evt.preventDefault()
  showAnswer.value = true
})

onKeyUp(['1', 'a'], () => saveCard('Again'))
onKeyUp(['2', 's'], () => saveCard('Hard'))
onKeyUp(['3', 'd'], () => saveCard('Good'))
onKeyUp(['4', 'f'], () => saveCard('Easy'))
onKeyUp('h', () => markAsDifficult())
</script>

<template>
  <!-- <pre>{{ $route }}</pre> -->
  <div class="container">
    <header class="header">
      <div class="header__container">
        <div class="header__title">{{ deckStore?.deck?.name }}</div>
        <PButton
          class="header__tooltip"
          icon="pi pi-info-circle"
          text
          rounded
          aria-label="Hotkeys info"
          v-tooltip.left="'Keyboard Shortcuts'"
          @click="hotkeysVisible = !hotkeysVisible"
        />
        <PDialog
          v-model:visible="hotkeysVisible"
          header="Keyboard Shortcuts"
          :style="{width: '370px'}"
          modal
        >
          <div class="hotkeys">
            <p>
              <b><code>space</code></b>
            </p>
            <p><code>reveal card</code></p>
            <p>
              <b><code>1 or a</code></b>
            </p>
            <p><code>Again</code></p>
            <p>
              <b><code>2 or s</code></b>
            </p>
            <p><code>Hard</code></p>
            <p>
              <b><code>3 or d</code></b>
            </p>
            <p><code>Good</code></p>
            <p>
              <b><code>4 or f</code></b>
            </p>
            <p><code>Easy</code></p>
          </div>
        </PDialog>
        <PButton
          icon="pi pi-times"
          @click="$router.go(-1)"
          style="font-size: 4rem; margin: 0px"
          text
          rounded
          aria-label="Cancel"
          v-tooltip.left="'Exit the session'"
        />
      </div>
    </header>
    <div class="wrapper">
      <div class="container">
        <div class="flashcard">
          <ProgressBar
            class="flashcard__progress"
            :show-value="false"
            :value="progressBarValue"
          />
          <div
            class="flashcard__position"
            v-tooltip.left="'The position of current card in the deck.'"
          >
            {{ cardIndex + 1 }}/{{ cards.length }}
          </div>
          <h1 class="flashcard__question">{{ card.question }}</h1>
          <div class="flashcard__answer">
            <button v-if="!showAnswer" @click="showAnswer = true">
              <p>show answer</p>
            </button>
            <p v-else class="flashcard__answer-revealed">
              {{ card.answer }}
            </p>
          </div>
          <div class="flashcard__options">
            <PButton
              icon="pi pi-bolt"
              rounded
              text
              @click="markAsDifficult"
              v-tooltip.bottom="'Mark this card as difficult'"
            />
          </div>
          <div class="difficulty__buttons">
            <PButton
              :raised="true"
              @click="saveCard('Again')"
              v-tooltip.bottom="'<10m'"
              label="Again"
            />
            <PButton
              :raised="true"
              @click="saveCard('Hard')"
              v-tooltip.bottom="'2d'"
              label="Hard"
            />
            <PButton
              :raised="true"
              @click="saveCard('Good')"
              v-tooltip.bottom="'7d'"
              label="Good"
            />
            <PButton
              :raised="true"
              @click="saveCard('Easy')"
              v-tooltip.bottom="'14d'"
              label="Easy"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:root {
  --answer-hidden-bg: hwb(0 84% 16%);
}

.hotkeys {
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 20px;
}
.hotkeys p {
  margin: 5px 0;
  padding: 0 0 0 20px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  background: lightblue;
  font-size: 1.5rem;
  padding: 1rem;
}
.header__container {
  display: flex;
  max-width: 1024px;
  align-items: center;
  flex-grow: 1;
}
.footer {
  margin-top: auto;
}
.header__title {
  margin: 0 auto 0 0;
  font-weight: 700;
  font-size: 2rem;
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
.flashcard__progress {
  grid-area: progress;
  height: 30px;
}
.flashcard__position {
  display: flex;
  justify-content: center;
  align-items: center;
  background: hsl(214, 32%, 97%);
  border-radius: 50px;
  height: 30px;
  vertical-align: center;
}
.flashcard__options {
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  grid-area: options;
}
.flashcard__options > PButton {
  flex-shrink: 0;
}
.flashcard__question {
  grid-area: question;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  margin: 8px;
}
.flashcard__question > h1 {
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 0;
  padding: 0;
}
.flashcard__answer {
  grid-area: answer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--answer-hidden-bg);
  min-height: 140px;
  height: fit-content;
  width: 100%;
  border: 0;
}
.flashcard__answer > button {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  align-self: stretch;
  max-height: 100%;
  width: 100%;
  border: 0;
}
.flashcard__answer:hover > button {
  opacity: 0.75;
  cursor: pointer;
}
.flashcard__answer > p {
  font-size: calc(2vw + 2vh);
}
.flashcard__answer-revealed {
  margin: 0 0 0 0;
}
.header__tooltip {
  display: none;
}
.difficulty__buttons {
  grid-area: difficulty;
  display: flex;
  justify-content: center;
  column-gap: 3px;
}
.flashcard {
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 3rem 5rem;
  padding: 1rem;
  gap: 1rem 0.5rem;
  grid-template-areas:
    'progress score options'
    'question question question'
    'answer answer answer'
    'difficulty difficulty difficulty';
}
@media (min-width: 40rem) {
  .header__tooltip {
    display: flex;
  }
  .flashcard {
    gap: 2rem 1.5rem;
    grid-template-columns: 1fr 5.25rem;
    grid-template-rows: 30px max-content 1fr;
    padding: 2rem;
    align-items: center;
    grid-template-areas:
      'progress score'
      'question options'
      'answer options'
      'difficulty options';
  }
  .flashcard__answer {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 100%;
  }
  .flashcard__answer > p {
    font-size: 3ch;
  }
  .flashcard__options {
    margin-bottom: auto;
  }
}
</style>
