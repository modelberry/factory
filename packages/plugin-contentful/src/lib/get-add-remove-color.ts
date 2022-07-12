import { ForegroundColor } from 'chalk'
import { CompareArraysResponse } from './compare-arrays'

export interface GetAddRemoveColor {
  compared: CompareArraysResponse
  item: string
}

export const getAddRemoveColor = ({ compared, item }: GetAddRemoveColor) => {
  let color: typeof ForegroundColor = 'black'
  if (compared.aOnly.includes(item)) color = 'green'
  if (compared.bOnly.includes(item)) color = 'red'
  return color
}
