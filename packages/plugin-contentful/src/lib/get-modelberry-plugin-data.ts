import { ContentTypeFieldValidation } from 'contentful-management/types'
import { WrVariable } from '@modelberry/push/plain'

export type ValidationsMap = {
  [validationName: string]: ContentTypeFieldValidation
}

export type WheelroomPluginData = {
  '@modelberry/plugin-contentful/plain'?: {
    validations?: ValidationsMap
  }
}

export interface GetWheelroomPluginData {
  dataVar: WrVariable
}

export const getWheelroomPluginData = ({ dataVar }: GetWheelroomPluginData) => {
  const dataVarFn = new Function(`return ${dataVar.value}`)
  const dataVarObj = dataVarFn() as WheelroomPluginData
  const data = dataVarObj?.['@modelberry/plugin-contentful/plain']

  return data
}
