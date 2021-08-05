import path from 'path'
import ts from 'typescript'

export type ModelberryVariable = {
  fileName?: string
  isArray?: boolean
  isObject?: boolean
  isExported?: boolean
  isTyped?: boolean
  name?: string
  type?: string
  value?: string
}

export interface ParseModelberryVariable {
  node: ts.Node
  sourceFile: ts.SourceFile
}

export const parseModelberryVariable = ({
  node,
  sourceFile,
}: ParseModelberryVariable) => {
  const modelberryVariable: ModelberryVariable = {}
  if (node.kind === ts.SyntaxKind.FirstStatement) {
    node.forEachChild((node) => {
      if (node.kind === ts.SyntaxKind.ExportKeyword)
        modelberryVariable.isExported = true
      if (node.kind === ts.SyntaxKind.VariableDeclarationList) {
        node.forEachChild((node) => {
          if (node.kind === ts.SyntaxKind.VariableDeclaration) {
            let name = ''
            let objectType = ''
            let arrayType = ''
            let objectValue = ''
            let arrayValue = ''
            node.forEachChild((node) => {
              if (node.kind === ts.SyntaxKind.VariableDeclaration) {
                name = node.getText(sourceFile)
              }
              if (node.kind === ts.SyntaxKind.Identifier) {
                name = node.getText(sourceFile)
              }
              if (node.kind === ts.SyntaxKind.TypeReference) {
                objectType = node.getText(sourceFile)
              }
              if (node.kind === ts.SyntaxKind.ObjectLiteralExpression) {
                objectValue = node.getText(sourceFile)
              }
              if (node.kind === ts.SyntaxKind.ArrayType) {
                arrayType = node.getText(sourceFile)
              }
              if (node.kind === ts.SyntaxKind.ArrayLiteralExpression) {
                arrayValue = node.getText(sourceFile)
              }
            })
            if (arrayType) arrayType = arrayType.replace('[]', '')
            modelberryVariable.fileName = path.resolve(sourceFile.fileName)
            modelberryVariable.isArray = !!arrayValue
            modelberryVariable.isObject = !!objectValue
            modelberryVariable.isTyped = !!arrayType || !!objectType
            modelberryVariable.name = name
            modelberryVariable.type = arrayType || objectType
            modelberryVariable.value = arrayValue || objectValue
          }
        })
      }
    })
  }
  return modelberryVariable
}
