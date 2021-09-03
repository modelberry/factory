import ts from 'typescript'

export interface CreateDataVarStatement {
  dataObject: any
}

export const createDataVarStatement = ({
  dataObject,
}: CreateDataVarStatement) => {
  const dataString = JSON.stringify(dataObject)
  const file = ts.createSourceFile(
    'dummy.ts',
    `export const modelberryPluginData: ModelberryPluginData = ${dataString}`,
    ts.ScriptTarget.Latest,
    false,
    ts.ScriptKind.TS
  )
  return file
}
