import { Content, ContentType } from '@/types'
import React from 'react'
import { FcFile, FcFolder, FcLink, FcPackage } from 'react-icons/fc'

export const ICON_TEST_ID = 'icon'

export type ContentItemProps = {
  dataTestID?: string
  content: Content
}

export const ContentItem: React.FC<ContentItemProps> = ({
  dataTestID,
  content
}) => {
  return (
    <span
      data-testid={dataTestID}
      className="flex items-center py-2 px-5 hover:bg-gray-50 border-b"
    >
      <span className="w-8">
        {content.type == ContentType.DIR ? (
          <FcFolder data-icon={ContentType.DIR} />
        ) : content.type == ContentType.SYMLINK ? (
          <FcLink data-icon={ContentType.SYMLINK} />
        ) : content.type == ContentType.SUBMODULE ? (
          <FcPackage data-icon={ContentType.SUBMODULE} />
        ) : (
          <FcFile data-icon={ContentType.FILE} />
        )}
      </span>
      {content.name}
    </span>
  )
}
