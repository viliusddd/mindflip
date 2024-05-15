import {test, expect} from '@playwright/test'

test('creating a new empty deck', async ({page}) => {
  await page.goto('/')
  await page.getByLabel('create a deck').click()
  await expect(page.getByPlaceholder('Anatomy')).toBeVisible()
  await page.getByPlaceholder('Anatomy').click()
  await page.getByPlaceholder('Anatomy').fill('Anatomy')
  await page.getByPlaceholder('Anatomy').press('Tab')
  await page.getByPlaceholder('bones and muscles').fill('bones and musles')
  await expect(page.getByLabel('Create Deck')).toBeVisible()
  await page.getByLabel('Create Deck').click()
  await page.getByLabel('decks').click()
  await expect(page.getByRole('heading', {name: 'Anatomy'})).toBeVisible()
  await expect(page.locator('#app')).toContainText('0/0 items learned')
  await expect(page.locator('#app')).toContainText('0')
  await expect(page.locator('#app')).toContainText('0%')
})
