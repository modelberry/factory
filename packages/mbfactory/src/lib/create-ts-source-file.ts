import ts from 'typescript'

export const createTsSourceFile = () => {
  const sourceFile = ts.createSourceFile(
    'dummy.ts',
    '',
    ts.ScriptTarget.Latest,
    false,
    ts.ScriptKind.TS
  )
  return sourceFile
}
