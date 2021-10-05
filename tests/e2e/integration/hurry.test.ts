// search.test.ts
// Tests for search username

import { entryPoint } from '../utils/testHelperEnums'
import { visit } from '../utils/testHelperUtils'
import {
  assertReposHasCorrectResultLength,
  assertSeeReposIsLoading,
  assertUserNameIs,
  scrollToLoadMoreRepos,
  assertSearchInputDisabled,
  assertSearchInputExists,
  assertSearchInputHaveFocus,
  assertSeeNotFoundNotification,
  clearInput,
  typeGithubUsernameAndEnter,
  typeLikeCrazyAndEnter,
  clickRepoItemIndex,
  assertRepoName
} from '../utils/testAppUtils'

describe('Search', () => {
  visit(entryPoint)

  it('should have the search input', () => {
    assertSearchInputExists()
  })

  it('should focus to the input', () => {
    assertSearchInputHaveFocus()
  })

  it('should not found', () => {
    typeGithubUsernameAndEnter('asdjflajsdljasdlkfjasldfj')
    assertSearchInputDisabled()
    assertSeeNotFoundNotification()
  })

  it('should be succeed this time', () => {
    clearInput()
    typeGithubUsernameAndEnter('google')
    assertSearchInputDisabled()
    assertSeeReposIsLoading()
    assertUserNameIs('Google')
    assertReposHasCorrectResultLength(1)
  })

  it('can browse more page', () => {
    scrollToLoadMoreRepos()
    assertSeeReposIsLoading()
    cy.wait(3000)
    assertReposHasCorrectResultLength(2)
    scrollToLoadMoreRepos()
    assertSeeReposIsLoading()
    cy.wait(3000)
    assertReposHasCorrectResultLength(3)
  })

  it('can search another user', () => {
    clearInput()
    typeGithubUsernameAndEnter('facebook')
    assertSearchInputDisabled()
    assertSeeReposIsLoading()
    assertUserNameIs('Facebook')
    assertReposHasCorrectResultLength(1)
  })

  it('pick one to view the contents, lets pick bistro', () => {
    clickRepoItemIndex(3)
    assertRepoName('bistro')
  })

  // etc
})
