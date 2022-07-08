export const asyncIteratorToArray = async (
  asyncIterator: AsyncGenerator<any, void, unknown>
) => {
  const result: any[] = []
  for await (const item of asyncIterator) result.push(item)
  return result
}
