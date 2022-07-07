import {
  createContentVarStatement,
  camelToKebab,
  createTsImport,
} from '@modelberry/mbfactory/plain'

export interface CreateAstNodes {
  contentTypeId: string
  varType: string
  varName: string
  contentArray: any[]
}

export const createAstNodes = ({
  contentTypeId,
  varType,
  varName,
  contentArray,
}: CreateAstNodes) => {
  // Add import statements to be added to the main file
  const modelFilenameWithoutExt = `contentful-${camelToKebab(contentTypeId)}`
  const modelImportStatement = createTsImport({
    namedImports: [varType],
    from: `./${modelFilenameWithoutExt}`,
  })
  const contentVarStatement = createContentVarStatement({
    contentArray,
    varName,
    varType,
  })
  return [modelImportStatement, contentVarStatement]
}
