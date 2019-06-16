import { defaultTheme } from './default-theme'
import { parseStyles } from './parse-styles'

export const styledSystem = (props: any) => (theme: any) => {
  // Within a lerna monorepo this is caused by having two versions of the
  // emotion package
  if (Object.entries(theme).length === 0) {
    console.log(`Theme not found, using default theme`)
    theme = defaultTheme
  }

  return parseStyles(theme, props)
}
