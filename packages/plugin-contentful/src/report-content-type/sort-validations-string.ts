export const sortValidationsString = (validationString: string) => {
  const validationsArray = validationString.split(' ')
  validationsArray.sort()
  const sortedString = validationsArray.join(' ')
  return sortedString
}
