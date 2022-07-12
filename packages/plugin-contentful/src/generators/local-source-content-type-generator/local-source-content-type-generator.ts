import {
  Options,
  TypeData,
  logger,
  ModelberryInterface,
} from '@modelberry/mbfactory/plain'
import { checkTags } from '../../check-tags/check-tags'
import { isValidInterface } from '../../check-tags/is-valid-interface'
import { getValidatedLocalSourceFields } from './get-validated-local-source-fields'

export interface LocalSourceContentTypeGenerator {
  options: Options
  typeData: TypeData
}

export type LocalSourceContentTypeYield = {
  fields: ModelberryInterface['fields']
  interfaceTypeTag: string
  interfaceTags: Record<string, string>
  interfaceName: string | undefined
}

export type LocalSourceContentTypeIterator = AsyncGenerator<
  LocalSourceContentTypeYield,
  void,
  unknown
>

// Loop through content types from local source files and yield an object for
// each entry
export function* localSourceContentTypeGenerator({
  options,
  typeData,
}: LocalSourceContentTypeGenerator) {
  for (const localModelberryType of Object.values(typeData)) {
    const localContentTypeFields = localModelberryType.interface.fields || {}
    const localInterfaceTags = localModelberryType.interface.interfaceTags || {}
    const localTypescriptInterfaceName = localModelberryType.interface.typeName
    const localInterfaceTypeTag = localInterfaceTags['@type']

    logger.h1(`\n${localTypescriptInterfaceName}`)
    if (isValidInterface({ options, interfaceTags: localInterfaceTags }))
      continue
    checkTags({ interfaceTags: localInterfaceTags })

    const validLocalFields = getValidatedLocalSourceFields({
      contentTypeFields: localContentTypeFields,
    })
    yield {
      fields: validLocalFields,
      interfaceTypeTag: localInterfaceTypeTag,
      interfaceTags: localInterfaceTags,
      interfaceName: localTypescriptInterfaceName,
    }
  }
}
