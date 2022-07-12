import ts from 'typescript'

export const createContentfulAssetTypeDeclaration = () => {
  const file = ts.createSourceFile(
    'dummy.ts',
    `export type ContentfulAsset = {
  sys: {
    id: string
  }
  contentType: string
  description: string
  fileName: string
  height: number
  size: number
  title: string
  url: string
  width: number
}`,
    ts.ScriptTarget.Latest,
    false,
    ts.ScriptKind.TS
  )
  return file
}
