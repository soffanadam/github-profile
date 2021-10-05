import { BadgeProps } from '@/components/Badge'
import { ContentItemProps } from '@/components/ContentItem'
import { ContentLinkProps } from '@/components/ContentLink'
import { EmptyStateProps } from '@/components/EmptyState'
import { RepoBadgesProps } from '@/components/RepoBadges'
import { RepoInfoProps } from '@/components/RepoInfo'
import { RepoItemProps } from '@/components/RepoItem'
import { SearchFormProps } from '@/components/SearchForm'
import { UserInfoProps } from '@/components/UserInfo'
import { TestID } from '@/resources/TestID'
import { Content, ContentType, Repo, User } from '@/types'
import { createRef } from 'react'

export const withBadgeProps = (): BadgeProps => {
  return {
    dataTestID: TestID.BADGE
  }
}

export const fakeContent = (type: ContentType): Content => {
  const content: Content = {
    name: 'contentname',
    path: 'pathtocontent',
    type: type,
    html_url: 'http://www.example.com'
  }

  if (type == ContentType.DIR) {
    delete content.html_url
  }

  return content
}

export const withContentItemProps = (type: ContentType): ContentItemProps => {
  return {
    dataTestID: TestID.CONTENT_ITEM,
    content: fakeContent(type)
  }
}

export const withContentLinkProps = (type: ContentType): ContentLinkProps => {
  return {
    dataTestID: TestID.CONTENT_LINK,
    repoUrl: '/repo',
    content: fakeContent(type)
  }
}

export const withSearchFormProps = (): SearchFormProps => {
  return {
    prefill: '',
    searchRef: createRef() as React.MutableRefObject<HTMLInputElement>,
    error: '',
    disabled: false,
    onSubmit: jest.fn()
  }
}

export const withEmptyStateProps = (): EmptyStateProps => {
  return {
    dataTestID: TestID.EMPTY_STATE,
    className: 'mt-4'
  }
}

export const fakeUser = (): User => {
  const user: User = {
    login: 'google',
    name: 'Google',
    html_url: 'https://github.com/google',
    avatar_url: 'https://avatars.githubusercontent.com/u/958072?v=4'
  }

  return user
}

export const fakeRepo = (): Repo => {
  const repo: Repo = {
    id: 1,
    name: 'github-profile',
    description: 'Lorem ipsum dolor sit amet',
    stargazers_count: 1000,
    forks_count: 200,
    owner: fakeUser()
  }

  return repo
}

export const withRepoBadgesProps = (): RepoBadgesProps => {
  return {
    repo: fakeRepo()
  }
}

export const withRepoInfoProps = (): RepoInfoProps => {
  return {
    dataTestID: TestID.REPO_INFO,
    repo: fakeRepo()
  }
}

export const withRepoItemProps = (): RepoItemProps => {
  return {
    repo: fakeRepo()
  }
}

export const withUserInfoProps = (): UserInfoProps => {
  return {
    dataTestID: TestID.USER_INFO,
    user: fakeUser()
  }
}
