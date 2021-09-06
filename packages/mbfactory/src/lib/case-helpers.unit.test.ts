import {
  camelToKebab,
  camelToSpaces,
  firstLowerCase,
  firstUpperCase,
  noTrailingSlash,
  stripDoubleQuotes,
} from './case-helpers'

describe('Case helpers', () => {
  test('firstLowerCase', async () => {
    expect(firstLowerCase('What is the case?')).toBe('what is the case?')
  })
  test('firstUpperCase', async () => {
    expect(firstUpperCase('what is the case?')).toBe('What is the case?')
  })
  test('camelToKebab', async () => {
    expect(camelToKebab('whatIsTheCase?')).toBe('what-is-the-case?')
  })
  test('camelToSpaces', async () => {
    expect(camelToSpaces('whatIsTheCase?')).toBe('what is the case?')
  })
  test('camelToSpaces', async () => {
    expect(noTrailingSlash('/no/trails/')).toBe('/no/trails')
  })
  test('stripDoubleQuotes', async () => {
    expect(stripDoubleQuotes('"This is a quote"')).toBe('This is a quote')
  })
})
