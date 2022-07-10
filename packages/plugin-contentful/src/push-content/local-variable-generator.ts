import { Options, TypeData, logger } from '@modelberry/mbfactory/plain'
import { KeyValueMap } from 'contentful-management/types'
import { checkTags } from '../check-tags/check-tags'
import { mustIgnoreInterface } from '../check-tags/must-ignore-interface'

export interface LocalVariableGenerator {
  options: Options
  typeData: TypeData
}

export type LocalVariableIterator = AsyncGenerator<
  {
    contentTypeId: string
    varType: string
    varName: string
    contentArray: any[]
  },
  void,
  unknown
>

// Loop through entries from local source files and yield an object for each entry
export function* localVariableGenerator({
  options,
  typeData,
}: LocalVariableGenerator) {
  for (const modelberryType of Object.values(typeData)) {
    const interfaceTags = modelberryType.interface.interfaceTags || {}
    const typescriptInterfaceName = modelberryType.interface.typeName
    const interfaceTypeTag = interfaceTags['@type']
    const interfaceLocaleTag = interfaceTags['@locale']
    const fields = modelberryType.interface.fields

    logger.h1(`\n${typescriptInterfaceName}`)
    if (mustIgnoreInterface({ options, interfaceTags })) continue
    checkTags({ interfaceTags })
    for (const mbVariable of modelberryType.variables) {
      logger.p(`- parsing js variable: ${mbVariable.name}`)
      const valueFn = new Function(`return ${mbVariable.value}`)
      const fieldValuesArray = valueFn() as KeyValueMap[]

      yield {
        fields,
        fieldValuesArray,
        modelberryType,
        interfaceTypeTag,
        interfaceLocaleTag,
      }
    }
  }
}
