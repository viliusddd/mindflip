[![build ](https://github.com/viliusddd/mindflip/actions/workflows/deploy.yaml/badge.svg)](https://github.com/viliusddd/mindflip/actions/workflows/deploy.yaml)

# MindFlip

<img align=right width='200px' src="./screenshots/decks.png">

Level up your brain game with flashcards, powered by the snazzy new FSRS algorithm. Create, sort, and cram your way to genius status with minimal fuss. Simple, sleek, and distraction-free, it's all about mastering the must-knows and supercharging your smarts with zero hassle.

- [MindFlip](#mindflip)
  - [Quick Start](#quick-start)
  - [Main Features](#main-features)
  - [Tech Stack](#tech-stack)
  - [Screenshots](#screenshots)
  - [Project Setup](#project-setup)

## Quick Start

1. Create a new deck going to `create a deck`, fill all fields and press `Create Deck`
2. In the newly opened page - press `Import` and import one of the `.CSV` files from the project `examples` directory. It will populate current deck with data.
3. To start reviewing flashcards - go back to `decks` and press `Review` on your deck.

## Main Features

- Add/remove/edit decks and cards;
- Import/export **\*.CSV** with cards data;
- Responsive;
- Uses [FSRS](https://github.com/open-spaced-repetition/ts-fsrs#about-the) (free spaced repetition scheduler) algorithm.

## Tech Stack

[<img src="https://img.shields.io/badge/Vue.js-%2335495e.svg?style=flat&logo=vuedotjs">](https://vuejs.org/)
[<img src="https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat">](https://www.typescriptlang.org/)
[<img src="https://img.shields.io/badge/-Vite-646CFF?style=flat&logo=vite&logoColor=white">](https://vitejs.dev/)
[<img src="https://img.shields.io/badge/-Vitest-6E9F18?style=flat&logo=vitest&logoColor=white">](https://vitest.dev/)
[<img src="https://img.shields.io/badge/-Playwright-2EAD33?style=flat&logo=playwright&logoColor=white">](https://playwright.dev/)

## Screenshots

<details open>
    <summary>page responsivness</summary>
    <img width='75%' src="./screenshots/edit.gif">
</details>

<details>
    <summary>create new deck page</summary>
    <img width='50%' src="./screenshots/create-new-deck.png">
</details>

<details>
    <summary>deck options menu</summary>
    <img width='50%' src="./screenshots/deck-options.png">
</details>

<details>
    <summary>decks</summary>
    <img width='50%' src="./screenshots/decks.png">
</details>

<details>
    <summary>confirmations</summary>
    <img width='50%' src="./screenshots/edit-card-confirm.png">
</details>

<details>
    <summary>edit card details</summary>
    <img width='50%' src="./screenshots/edit-card.png">
</details>

<details>
    <summary>edit deck title or description</summary>
    <img width='50%' src="./screenshots/edit-title.png">
</details>

<details>
    <summary>review card covered</summary>
    <img width='50%' src="./screenshots/review-covered.png">
</details>

<details>
    <summary>review card uncovered</summary>
    <img width='50%' src="./screenshots/review-uncovered.png">
</details>

<details>
    <summary>general settings</summary>
    <img width='50%' src="./screenshots/review-settings.png">
</details>

## Project Setup

1. Clone the repository locally and navigate to it:
   ```sh
   git clone git@github.com:viliusddd/mindflip && cd mindflip
   ```
2. Install the required packages:

   ```sh
   npm install
   ```

3. Compile and Hot-Reload for Development:

   ```sh
   npm run dev
   ```

4. You are ready to go!
