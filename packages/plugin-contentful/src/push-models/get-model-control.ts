import chalk from 'chalk'
import { Control } from 'contentful-management/types'

export interface GetModelControl {
  fieldIdWithoutPostfix: string
  fieldTags: Record<string, string>
}

export const getModelControl = ({
  fieldIdWithoutPostfix,
  fieldTags,
}: GetModelControl) => {
  let control: Control | undefined
  if (fieldTags['@widget'] || fieldTags['@helpText']) {
    control = {
      fieldId: fieldIdWithoutPostfix,
      widgetNamespace: 'builtin',
      widgetId: fieldTags['@widget'],
      settings: { helpText: fieldTags['@helpText'] },
    }
    if (fieldTags['@widget']) {
      console.log(chalk(`- editor control ${fieldTags['@widget']}`))
    }
    if (fieldTags['@helpText']) {
      console.log(chalk(`- help text`))
    }
  }
  return control
}
