import ts from 'typescript'

export interface CreateContentVarStatement {
  contentArray: any[]
}

export const createContentVarStatement = ({
  contentArray,
}: CreateContentVarStatement) => {
  const contentString = JSON.stringify(contentArray)
  const file = ts.createSourceFile(
    'dummy.ts',
    `export const myTopics: ContentfulTopic[] = ${contentString}`,
    ts.ScriptTarget.Latest,
    false,
    ts.ScriptKind.TS
  )
  return file
}
