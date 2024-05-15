import {test, expect} from '@playwright/test'

test('add, remove and edit cards', async ({page}) => {
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

  await expect(page.getByText('Showing 1 to 2 of 2 cards')).toBeVisible()

  // delete one of the cards with checkbox
  await page
    .getByRole('row', {name: 'Row Unselected coracoid'})
    .getByLabel('Row Unselected')
    .check()
  await page.getByLabel('Delete').click()
  await page.getByLabel('Yes').click()
  await expect(page.getByText('Showing 1 to 1 of 1 cards')).toBeVisible()

  // add new question
  await page.getByLabel('New').click()
  await page.locator('#question').click()
  await page.locator('#question').fill('axilla')
  await page.getByLabel('Answer').fill('Latin armpit')
  await page.getByLabel('Save').click()

  // add new question
  await page.getByLabel('New').first().click()
  await page.locator('#question').click()
  await page.locator('#question').fill('biceps brachii')
  await page
    .getByLabel('Answer')
    .fill(
      'two-headed muscle that lies on the upper arm between the shoulder and the elbow'
    )
  await page.getByLabel('Save').click()
  await page.getByText('Showing 1 to 3 of 3 cards').click()

  // delete from card dialog
  await page
    .getByRole('row', {name: 'Row Unselected biceps brachii'})
    .getByRole('button')
    .click()
  await page.getByLabel('Card Details').getByLabel('Delete').click()
  await page.getByLabel('Yes').click()
  await page.getByText('Showing 1 to 2 of 2 cards').click()

  // change card name
  // before change
  await expect(page.getByRole('cell', {name: 'costal cartilage'})).toBeVisible()
  await expect(
    page.getByRole('cell', {name: 'dense cartilage that joins'})
  ).toBeVisible()
  await expect(page.getByText('New').nth(1)).toBeVisible()

  // changing
  await page
    .getByRole('row', {name: 'Row Unselected costal'})
    .getByRole('button')
    .click()
  await page.locator('#question').click()
  await page.locator('#question').press('Meta+a')
  await page.locator('#question').fill('crackius maximus')
  await page.getByLabel('Answer').click()
  await page.getByLabel('Answer').press('Meta+a')
  await page
    .getByLabel('Answer')
    .fill(
      'the crack at the base of the sacrum between the two gluteus maximus muscles'
    )
  await page.locator('#state div').click()
  await page.getByLabel('Learning', {exact: true}).click()
  await page.getByLabel('Save').click()

  // after change
  await expect(page.getByRole('cell', {name: 'crackius maximus'})).toBeVisible()
  await page.getByRole('cell', {name: 'the crack at the base of the'}).click()
  await page
    .getByRole('cell', {name: 'Learning'})
    .locator('span')
    .first()
    .click()
})
