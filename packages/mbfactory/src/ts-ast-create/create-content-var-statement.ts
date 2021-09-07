import ts from 'typescript'

export interface CreateContentVarStatement {
  contentArray: any[]
  varName: string
  varType: string
}

export const createContentVarStatement = ({
  contentArray,
  varName,
  varType,
}: CreateContentVarStatement) => {
  const contentString = JSON.stringify(contentArray)
  const file = ts.createSourceFile(
    'dummy.ts',
    `export const ${varName}: ${varType}[] = ${contentString}`,
    ts.ScriptTarget.Latest,
    false,
    ts.ScriptKind.TS
  )
  return file
}
