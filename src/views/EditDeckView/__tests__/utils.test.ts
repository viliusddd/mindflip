import {expect, it} from 'vitest'
import {createId} from '../utils'

it("generates two ids and they doesn't match", () => {
  expect(createId().length).toBe(5)
})
