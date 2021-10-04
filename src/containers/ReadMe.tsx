import { contentsState } from '@/selectors'
import React from 'react'
import { useSelector } from 'react-redux'
import marked from 'marked'

export const ReadMe: React.FC = () => {
  // State
  const { readMe } = useSelector(contentsState)

  if (!readMe) return <></>

  const source = marked(window.atob(readMe.content))

  return (
    <div className="mt-8 rounded border">
      <div className="py-3 px-5 border-b">README.md</div>
      <div
        className="py-3 px-5 prose"
        dangerouslySetInnerHTML={{ __html: source }}
      ></div>
    </div>
  )
}
