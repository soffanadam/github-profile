import { Content } from '@/types'
import React from 'react'
import { FcFile, FcFolder, FcLink, FcPackage } from 'react-icons/fc'

type ContentProps = {
  content: Content
}

export const ContentItem: React.FC<ContentProps> = ({ content }) => {
  return (
    <span className="flex items-center py-2 px-5 hover:bg-gray-50 border-b">
      <span className="w-8">
        {content.type == 'dir' ? (
          <FcFolder />
        ) : content.type == 'symlink' ? (
          <FcLink />
        ) : content.type == 'submodule' ? (
          <FcPackage />
        ) : (
          <FcFile />
        )}
      </span>
      {content.name}
    </span>
  )
}
