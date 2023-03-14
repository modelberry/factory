import { ContentTypeFieldValidation } from 'contentful-management/types'
import { ModelberryVariable } from '@modelberry/mbfactory'

export type Validation = ContentTypeFieldValidation & {
  message?: string
  nodes?: any
}

export type ValidationsMap = {
  [validationName: string]: Validation
}

export type ModelberryPluginData = {
  '@modelberry/plugin-contentful/plain'?: {
    validations?: ValidationsMap
  }
}

export interface GetModelberryPluginData {
  dataVar: ModelberryVariable
}

export const getModelberryPluginData = ({
  dataVar,
}: GetModelberryPluginData) => {
  const dataVarFn = new Function(`return ${dataVar.value}`)
  const dataVarObj = dataVarFn() as ModelberryPluginData
  const data = dataVarObj?.['@modelberry/plugin-contentful/plain']

  return data
}
