import { Options, TypeData, logger } from '@modelberry/mbfactory/plain'
import { checkTags } from '../check-tags/check-tags'
import { mustIgnoreInterface } from '../check-tags/must-ignore-interface'
import { ValidationsMap } from '../lib/get-modelberry-plugin-data'
import { getModelFieldsAndControls } from './get-model-fields-and-controls'

export interface LocalContentTypeGenerator {
  options: Options
  typeData: TypeData
  validationsMap: ValidationsMap
}

export type LocalContentTypeIterator = AsyncGenerator<
  {
    contentTypeId: string
    varType: string
    varName: string
    contentArray: any[]
  },
  void,
  unknown
>

// Loop through content types from local source files and yield an object for
// each entry
export function* localContentTypeGenerator({
  options,
  typeData,
  validationsMap,
}: LocalContentTypeGenerator) {
  for (const modelberryType of Object.values(typeData)) {
    const contentTypeFields = modelberryType.interface.fields || {}
    const interfaceTags = modelberryType.interface.interfaceTags || {}
    const typescriptInterfaceName = modelberryType.interface.typeName
    const interfaceTypeTag = interfaceTags['@type']

    logger.h1(`\n${typescriptInterfaceName}`)
    if (mustIgnoreInterface({ options, interfaceTags })) continue
    checkTags({ interfaceTags })

    const { fields, controls } = getModelFieldsAndControls({
      contentTypeFields,
      validationsMap,
    })
    yield { fields, controls, interfaceTypeTag, interfaceTags }
  }
}
