import { last } from 'lodash'
import { UIMatch, useMatches } from 'react-router-dom'

import { routerManager } from '@/routes'
import { HandleRoute } from '@/routes/types'

type UseBreadcrumbsParams = {
  show?: boolean
}

export const useBreadcrumbs = ({ show = false }: UseBreadcrumbsParams = {}) => {
  const matches = useMatches() as UIMatch<unknown, HandleRoute>[]

  const handleClick = (path: string) => {
    routerManager.to({
      path
    })
  }

  const breadCrumbs = matches
    .filter(match => Boolean(match.handle?.breadcrumb))
    .map((match, index) => {
      const { breadcrumb } = match.handle
      return {
        title: typeof breadcrumb === 'string' ? breadcrumb : breadcrumb(match),
        link: match.pathname,
        onClick: index !== 0 ? () => handleClick(match.pathname) : undefined
      }
    })

  const lastItem = last(breadCrumbs)
  
  return { breadCrumbs: [], lastItem }
}
