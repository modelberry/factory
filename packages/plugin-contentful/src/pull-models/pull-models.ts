import { Environment } from 'contentful-management/types'
import {
  createDataVarStatement,
  createTsImport,
  Options,
  Node,
} from '@modelberry/mbfactory/plain'
import { writeSourceFiles } from '../lib/write-source-files'
import { fetchContentTypes } from '../lib/fetch-content-types'
import { getSourceFiles } from './get-source-files'

export interface PullModels {
  contentfulEnvironment: Environment
  options: Options
  path: string
}

export const pullModels = async ({
  contentfulEnvironment,
  options,
  path,
}: PullModels) => {
  const contentTypes = await fetchContentTypes({
    contentfulEnvironment,
    options,
  })
  // Generate import statements for each type to be added to the main file
  const allTypesImportStatements: Node[] = []
  // Empty object that gets filled with validations
  const validations: Record<string, any> = {}

  const files = await getSourceFiles({
    allTypesImportStatements,
    contentTypes,
    path,
    validations,
  })
  // Add main source file that imports all types and defines Contentful
  // validation objects
  const dataObject = { '@modelberry/plugin-contentful/plain': { validations } }
  const dataVarStatement = createDataVarStatement({ dataObject })
  const mbPluginDataImport = createTsImport({
    namedImports: ['ModelberryPluginData'],
    from: `@modelberry/plugin-contentful/plain`,
  })
  files.push({
    filename: 'main.ts',
    nodes: [...allTypesImportStatements, mbPluginDataImport, dataVarStatement],
    path,
  })

  await writeSourceFiles({ files, options })
}
