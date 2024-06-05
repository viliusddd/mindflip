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

![TypeScript](https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat)
![Vue.js](https://img.shields.io/badge/Vue.js-%2335495e.svg?style=flat&logo=vuedotjs)
![ESLint](https://img.shields.io/badge/ESlint-4B32C3?style=flat&logo=eslint&logoColor=white)
![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat&logo=vite&logoColor=FFD12A)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-%232671E5.svg?style=flat&logo=githubactions&logoColor=white)
![Vitest](https://img.shields.io/badge/-Vitest-6E9F18?style=flat&logo=vitest&logoColor=FCC72B)
![Playwright](https://img.shields.io/badge/-Playwright-2EAD33?style=flat&logo=playwright&logoColor=D65348)
![PrimeVue](https://img.shields.io/badge/PrimeVue-fff.svg?style=flat&logoColor=white&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNSIgaGVpZ2h0PSI0MCIgZmlsbD0ibm9uZSI+PHBhdGggZmlsbD0iIzQxQjg4MyIgZD0ibTI1LjYgMTgtMi43LS42IDIgM3Y5LjRsNy4zLTZWMTMuNWwtMy4zIDEuMi0zLjMgMy4zWk04LjcgMThsMi43LS42LTIgM3Y5LjRsLTcuMy02VjEzLjVsMy4zIDEuMkw4LjcgMThaIi8+PHBhdGggZmlsbD0iIzQxQjg4MyIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJtMTAuMiAyMSAyLjQtMy42IDEuNSAxaDZsMS42LTEgMi40IDMuN3YxMy41bC0xLjggMi43LTIuMSAyLjFoLTZMMTIgMzcuM2wtMS44LTIuN1YyMVoiIGNsaXAtcnVsZT0iZXZlbm9kZCIvPjxwYXRoIGZpbGw9IiM0MUI4ODMiIGQ9Im0yNSAzNS41IDMuOS00di0zLjhsLTQgMy4zdjQuNVpNOS4zIDM1LjVsLTMuOS00di0zLjhsNCAzLjN2NC41WiIvPjxwYXRoIGZpbGw9IiM0NTVDNzEiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTIxIDBoLS44djUuOGwxLjYtNC0uNy0xLjhabS0xLjQgNy4yLS42LjNWMGgtMS4ydjExLjZsMS44LTQuNFptLTEuOCA3IDQuNi0xMS4xIDEgMi42TDIwIDE3LjFoLTIuMXYtMi45Wm0tMS4zLTIuNVYwaC0xLjJ2Ny41bC0uNS0uMiAxLjcgNC40Wm0tMi40LTYuMlYwaC0uOWwtLjYgMS41IDEuNSA0Wm0tMi0yLjcgNC40IDExLjZ2Mi43aC0xLjhMMTAuOCA1LjcgMTIgMi44WiIgY2xpcC1ydWxlPSJldmVub2RkIi8+PHBhdGggZmlsbD0iIzQxQjg4MyIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJtMS44IDEyLjMgMTMgNC44aC4yTDExLjEgNS43IDAgNC44bDEuOCA3LjVabTMxIDAtMTMgNC44aC0uMmwzLjYtMTEuNCAxMS40LS45LTEuOCA3LjVaIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiLz48cGF0aCBmaWxsPSIjNDU1QzcxIiBkPSJtMjQgNC44IDYuNC0uNkwyNi4yIDBIMjJsMiA0LjhaTTEwLjIgNC44IDQgNC4yIDguMSAwaDQuMmwtMiA0LjhaTTQuNyA1LjJsNi41LjUgMy45IDExLjRoLS40bC00LjItMS41TDQuNyA1LjJaTTI5LjggNS4ybC02LjcuNS0zLjcgMTEuNGguNWwzLjktMS40IDYtMTAuNVpNMTIuMSAxOC4ybC41LS44IDEuNy44aDZsMS4zLS44LjYuOC01IDguNi01LjEtOC42WiIvPjxwYXRoIGZpbGw9IiM0MUI4ODMiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0ibTEyIDAgNS4xIDEzLjJMMjIuNiAwSDEyWiIgY2xpcC1ydWxlPSJldmVub2RkIi8+PC9zdmc+)
![Github Pages](https://img.shields.io/badge/GitHub%20Pages-121013?style=flat&logo=github&logoColor=white)

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
