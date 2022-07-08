import { Options, TypeData } from '@modelberry/mbfactory/plain'
import chalk from 'chalk'
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
  const log = console.log
  for (const modelberryType of Object.values(typeData)) {
    const interfaceTags = modelberryType.interface.interfaceTags || {}
    const typescriptInterfaceName = modelberryType.interface.typeName
    const interfaceTypeTag = interfaceTags['@type']
    const interfaceLocaleTag = interfaceTags['@locale']
    const fields = modelberryType.interface.fields

    log(chalk.bold.underline(`\n${typescriptInterfaceName}`))
    if (mustIgnoreInterface({ options, interfaceTags })) continue
    checkTags({ interfaceTags })
    for (const mbVariable of modelberryType.variables) {
      console.log(chalk(`- parsing js variable: ${mbVariable.name}`))
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
