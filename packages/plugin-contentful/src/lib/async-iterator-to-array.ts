export const asyncIteratorToArray = async <T = any>(
  asyncIterator: AsyncGenerator<T, void, unknown>
) => {
  const result: T[] = []
  for await (const item of asyncIterator) result.push(item)
  return result
}
