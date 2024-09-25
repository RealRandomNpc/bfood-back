import type { CmsUser } from '../../payload-types'

export const checkRole = (allRoles: CmsUser['roles'] = [], user: CmsUser = undefined): boolean => {
  if (user) {
    if (
      allRoles.some(role => {
        return user?.roles?.some(individualRole => {
          return individualRole === role
        })
      })
    )
      return true
  }

  return false
}
