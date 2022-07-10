import ts from 'typescript'
import { logger } from '../lib/logger'
import {
  parseModelberryInterface,
  ModelberryInterface,
} from '../modelberry-parser/parse-modelberry-interface'
import {
  parseModelberryVariable,
  ModelberryVariable,
} from '../modelberry-parser/parse-modelberry-variable'

export type ModelberryType = {
  interface: ModelberryInterface
  variables: ModelberryVariable[]
}

export type TypeData = {
  [typeName: string]: ModelberryType
}

export type PluginData = {
  types: TypeData
  dataVar: ModelberryVariable
}

export type AllPluginData = {
  [pluginName: string]: PluginData
}

export interface GetPluginData {
  program: ts.Program
}

export const getAllPluginData = ({ program }: GetPluginData) => {
  const allPluginData: AllPluginData = {}
  const checker = program.getTypeChecker()

  let dataVar = {}
  for (const sourceFile of program.getSourceFiles()) {
    if (sourceFile.isDeclarationFile) continue
    logger.h3(sourceFile.fileName)
    const wrInterfaces: ModelberryInterface[] = []
    const modelberryVariables: ModelberryVariable[] = []

    ts.forEachChild(sourceFile, (node: ts.Node) => {
      const wrInterface = parseModelberryInterface({ node, checker })
      if (wrInterface) wrInterfaces.push(wrInterface)
      const mbVariable = parseModelberryVariable({ node, sourceFile })
      if (mbVariable.name === 'modelberryPluginData') {
        dataVar = mbVariable
      } else if (
        mbVariable.name &&
        mbVariable.isArray &&
        mbVariable.isExported
      ) {
        modelberryVariables.push(mbVariable)
      } else if (mbVariable.name && !mbVariable.isArray) {
        logger.info(`- content variable, not an array: ${mbVariable.name}`)
      } else {
        if (mbVariable.name && !mbVariable.isExported)
          logger.info(`- content variable, not exported: ${mbVariable.name}`)
      }
    })
    // Order interfaces by interface and type
    for (const wrInterface of wrInterfaces) {
      const pluginName = (wrInterface?.interfaceTags || {})['@plugin']
      if (!pluginName) continue
      if (!wrInterface.typeName) continue
      if (!allPluginData[pluginName])
        allPluginData[pluginName] = {
          types: {},
          dataVar: {},
        }
      if (!allPluginData[pluginName].types[wrInterface.typeName]) {
        allPluginData[pluginName].types[wrInterface.typeName] = {
          interface: {},
          variables: [],
        }
      }

      allPluginData[pluginName].types[wrInterface.typeName].interface =
        wrInterface
    }
    // Merge in variables
    for (const mbVariable of modelberryVariables) {
      let lookupSuccess = false
      for (const pluginData of Object.values(allPluginData)) {
        const interfaceType = mbVariable.type || '<none>'
        if (Object.keys(pluginData.types).includes(interfaceType)) {
          pluginData.types[interfaceType].variables.push(mbVariable)
          lookupSuccess = true
        }
      }
      if (!lookupSuccess) {
        logger.info(
          `- content variable, no type match: ${mbVariable.type}/${mbVariable.name}`
        )
      }
    }
  }
  // Add dataVar to all plugins
  Object.values(allPluginData).forEach(
    (pluginData) => (pluginData.dataVar = dataVar)
  )
  return allPluginData
}
