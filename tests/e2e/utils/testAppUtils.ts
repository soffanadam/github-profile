// testSearchUtils.ts
// Utility functions to use in search tests

import { TestID } from '@/resources/TestID'
import { getTestID, testIDShouldExist, notification } from './testHelperUtils'

const assertSearchInputExists = () => {
  testIDShouldExist(TestID.SEARCH_FORM_INPUT)
}

const assertSearchInputHaveFocus = () => {
  getTestID(TestID.SEARCH_FORM_INPUT).should('have.focus')
}

const typeLikeCrazyAndEnter = () => {
  getTestID(TestID.SEARCH_FORM_INPUT).type('asdjflajsdljasdlkfjasldfj{enter}')
}

const assertSearchInputDisabled = () => {
  getTestID(TestID.SEARCH_FORM_INPUT).should('be.disabled')
}

const assertSeeNotFoundNotification = () => {
  notification().should('have.text', 'Not Found')
}

const clearInput = () => {
  getTestID(TestID.SEARCH_FORM_INPUT).clear()
}

const typeGithubUsernameAndEnter = (userName: string) => {
  getTestID(TestID.SEARCH_FORM_INPUT).type(`${userName}{enter}`)
}

const assertSeeReposIsLoading = () => {
  getTestID(TestID.REPOS_LOADING).should('exist')
}

const assertUserNameIs = (name: string) => {
  getTestID(TestID.USER_INFO_NAME).should('have.text', name)
}

const assertReposHasCorrectResultLength = (page = 1) => {
  getTestID(TestID.REPOS_LIST)
    .children()
    .its('length')
    .should('be.at.least', 1 + 30 * (page - 1))
}

const scrollToLoadMoreRepos = () => {
  getTestID(TestID.REPOS_LOADING).scrollIntoView()
}

const clickRepoItemIndex = (index: number) => {
  getTestID(TestID.REPOS_LIST).children().eq(index).click()
}

const assertRepoName = (name: string) => {
  getTestID(TestID.REPO_INFO_NAME).should('exist')
  getTestID(TestID.REPO_INFO_NAME).should('have.text', name)
}

export {
  assertSearchInputExists,
  assertSearchInputHaveFocus,
  typeLikeCrazyAndEnter,
  assertSearchInputDisabled,
  assertSeeNotFoundNotification,
  clearInput,
  scrollToLoadMoreRepos,
  typeGithubUsernameAndEnter,
  assertSeeReposIsLoading,
  assertUserNameIs,
  assertReposHasCorrectResultLength,
  clickRepoItemIndex,
  assertRepoName
}
