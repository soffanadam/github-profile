// testSearchUtils.ts
// Utility functions to use in search tests

import { TestID } from '@/resources/TestID'
import { getTestID, testIDShouldExist } from './testHelperUtils'

const assertSearchInputExists = () => {
  testIDShouldExist(TestID.SEARCH_BAR)
}

const assertSearchInputHaveFocus = () => {
  getTestID(TestID.SEARCH_BAR).should('have.focus')
}

export { assertSearchInputExists, assertSearchInputHaveFocus }
