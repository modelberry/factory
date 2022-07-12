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
  if (fieldTags['@widgetId'] || fieldTags['@helpText']) {
    control = {
      fieldId: fieldIdWithoutPostfix,
      widgetNamespace: 'builtin',
      widgetId: fieldTags['@widgetId'],
      settings: { helpText: fieldTags['@helpText'] },
    }
  }
  return control
}
