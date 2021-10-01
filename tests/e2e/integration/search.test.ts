// search.test.ts
// Tests for search username

import { defaultInit } from '../utils/testHelperUtils'
import {
  assertSearchInputExists,
  assertSearchInputHaveFocus
} from '../utils/testSearchUtils'

describe('Search', () => {
  defaultInit()

  it('should have the search input', () => {
    assertSearchInputExists()
  })

  it('should focus to the input', () => {
    assertSearchInputHaveFocus()
  })
})
