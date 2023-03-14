import {
  Options,
  TypeData,
  logger,
  ModelberryInterface,
  ModelberryType,
} from '@modelberry/mbfactory'
import { KeyValueMap } from 'contentful-management/types'
import { checkTags } from '../../check-tags/check-tags'
import { isValidInterface } from '../../check-tags/is-valid-interface'

export interface LocalSourceVariableGenerator {
  options: Options
  typeData: TypeData
}

export type LocalSourceVariableYield = {
  fields: ModelberryInterface['fields']
  fieldValuesArray: KeyValueMap[]
  modelberryType: ModelberryType
  interfaceTypeTag: string
  interfaceLocaleTag: string
}

export type LocalSourceVariableIterator = AsyncGenerator<
  LocalSourceVariableYield,
  void,
  unknown
>

// Loop through entries from local source files and yield an object for each entry
export function* localSourceVariableGenerator({
  options,
  typeData,
}: LocalSourceVariableGenerator) {
  for (const localModelberryType of Object.values(typeData)) {
    const localInterfaceTags = localModelberryType.interface.interfaceTags || {}
    const localTypescriptInterfaceName = localModelberryType.interface.typeName
    const localInterfaceTypeTag = localInterfaceTags['@type']
    const localInterfaceLocaleTag = localInterfaceTags['@locale']
    const localFields = localModelberryType.interface.fields

    logger.h1(`\n${localTypescriptInterfaceName}`)
    if (isValidInterface({ options, interfaceTags: localInterfaceTags }))
      continue
    checkTags({ interfaceTags: localInterfaceTags })
    for (const mbVariable of localModelberryType.variables) {
      logger.p(`- parsing js variable: ${mbVariable.name}`)
      const valueFn = new Function(`return ${mbVariable.value}`)
      const localFieldValuesArray = valueFn() as KeyValueMap[]

      yield {
        fields: localFields,
        fieldValuesArray: localFieldValuesArray,
        modelberryType: localModelberryType,
        interfaceTypeTag: localInterfaceTypeTag,
        interfaceLocaleTag: localInterfaceLocaleTag,
      }
    }
  }
}
