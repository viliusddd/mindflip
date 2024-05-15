import {test, expect} from '@playwright/test'

test.describe('add deck, cards and go trough few cards', () => {
  test('create deck and add cards', async ({page}) => {
    await page.goto('/')
    await page.getByLabel('create a deck').click()
    await page.getByPlaceholder('Anatomy').fill('Anatomy')
    await page.getByPlaceholder('bones and muscles').fill('bones and muscles')
    await page.getByLabel('Create Deck').click()
    await page.getByLabel('New').click()
    await page.locator('#question').click()
    await page.locator('#question').fill('coracoid process')
    await page
      .getByLabel('Answer')
      .fill(
        'the protruding finger off the lateral border of the scapula that helps to hold the arm in the socket'
      )
    await page.getByLabel('Save').click()
    await page.getByLabel('New').first().click()
    await page
      .locator('#question')
      .fill(
        'costal cartilagedense cartilage that joins the ribcage to the sternum'
      )
    await page.getByLabel('Answer').click()
    await page
      .getByLabel('Answer')
      .fill('dense cartilage that joins the ribcage to the sternum')
    await page.locator('#question').click()
    await page.locator('#question').fill('costal cartilage')
    await page.getByLabel('Save').click()
    await page.getByLabel('decks').click()
    await page.getByLabel('Review').click()
    await expect(page.locator('#app')).toContainText('1/2')
    await page.getByRole('button', {name: 'show answer'}).click()
    await expect(page.getByRole('paragraph')).toContainText(
      'the protruding finger off the lateral border of the scapula that helps to hold the arm in the socket'
    )
    await page.getByLabel('Easy').click()
    await expect(page.locator('#app')).toContainText('2/2')
    await page.getByRole('button', {name: 'show answer'}).click()
    await expect(page.getByRole('paragraph')).toContainText(
      'dense cartilage that joins the ribcage to the sternum'
    )
    await page.getByRole('button', {name: ''}).click()
    await expect(page.locator('#app')).toContainText('1')
    await expect(page.getByLabel('Review')).toContainText('Review1')
  })
})
