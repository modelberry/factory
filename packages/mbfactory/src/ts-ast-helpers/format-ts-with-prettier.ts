import prettier from 'prettier'

export interface FormatTsWithPrettier {
  source: string
}

export const formatWithPrettier = async ({ source }: FormatTsWithPrettier) => {
  const prettierOptions = (await prettier.resolveConfig(process.cwd())) || {}
  prettierOptions.parser = 'typescript'
  const formattedSource = prettier.format(source, prettierOptions)
  return formattedSource
}
