import ts from 'typescript'

export const createContentfulReferenceTypeDeclaration = () => {
  const file = ts.createSourceFile(
    'dummy.ts',
    `export interface ContentfulReference { sys: { id: string } }`,
    ts.ScriptTarget.Latest,
    false,
    ts.ScriptKind.TS
  )
  return file
}
