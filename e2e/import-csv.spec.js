import {test, expect} from '@playwright/test'

test('creating a new empty deck', async ({page}) => {
  await page.goto('/')
  await page.getByLabel('create a deck').click()
  await page.getByPlaceholder('Anatomy').click()
  await page.getByPlaceholder('Anatomy').fill('Anatomy')
  await page.getByPlaceholder('Anatomy').press('Tab')
  await page.getByPlaceholder('bones and muscles').fill('bones and muscles')
  await page.getByLabel('Create Deck').click()

  const fileChooserPromise = page.waitForEvent('filechooser')
  await page.getByText('Import').click()
  await page.keyboard.press('Escape')
  const fileChooser = await fileChooserPromise
  await fileChooser.setFiles('e2e/fixtures/anatomy-5.csv')

  await page.getByLabel('decks').click()
  await page.getByText('/5').click()
  await expect(page.getByLabel('Review')).toContainText('Review5')
})
