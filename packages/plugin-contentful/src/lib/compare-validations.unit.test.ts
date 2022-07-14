import { compareValidations, ValidationMeta } from './compare-validations'

describe('compare arrays should', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const valAA: ValidationMeta = {
    name: 'val-AA',
    val: {
      message: 'Val A',
      regexp: {
        pattern: '^\\/[a-z0-9:\\._/~%\\-\\+&\\#\\?!=\\(\\)@]*$',
        flags: '',
      },
    },
  }
  const valAB: ValidationMeta = {
    name: 'val-AB',
    val: {
      message: 'Val B',
      regexp: {
        pattern: '^\\/[a-z0-9:\\._/~%\\-\\+&\\#\\?!=\\(\\)@]*$',
        flags: '',
      },
    },
  }
  const valBB: ValidationMeta = {
    name: 'val-BB',
    val: {
      message: 'Val B',
      regexp: {
        pattern: '^\\/[a-z0-9:\\._/~%\\-\\+&\\#\\?!=\\(\\)@]*$',
        flags: '',
      },
    },
  }
  const valBC: ValidationMeta = {
    name: 'val-BC',
    val: {
      message: 'Val C',
      regexp: {
        pattern: '^\\/[a-z0-9:\\._/~%\\-\\+&\\#\\?!=\\(\\)@]*$',
        flags: '',
      },
    },
  }

  test('find a only', async () => {
    const arrayA = [valAA, valAB]
    const arrayB = [valBB, valBC]
    const result = compareValidations({ a: arrayA, b: arrayB })
    expect(result.aOnly).toEqual([valAA])
  })
  test('find b only', async () => {
    const arrayA = [valAA, valAB]
    const arrayB = [valBB, valBC]
    const result = compareValidations({ a: arrayA, b: arrayB })
    expect(result.bOnly).toEqual([valBC])
  })
  test('find the union', async () => {
    const arrayA = [valAA, valAB]
    const arrayB = [valBB, valBC]
    const result = compareValidations({ a: arrayA, b: arrayB })
    expect(result.union).toEqual([valAA, valAB, valBC])
  })
  test('find the intersection', async () => {
    const arrayA = [valAA, valAB]
    const arrayB = [valBB, valBC]
    const result = compareValidations({ a: arrayA, b: arrayB })
    expect(result.intersect).toEqual([valAB])
  })

  test('find a only reversed', async () => {
    const arrayA = [valAA, valAB]
    const arrayB = [valBB, valBC]
    const result = compareValidations({ a: arrayA, b: arrayB, reverse: true })
    expect(result.aOnly).toEqual([valBC])
  })
  test('find b only reversed', async () => {
    const arrayA = [valAA, valAB]
    const arrayB = [valBB, valBC]
    const result = compareValidations({ a: arrayA, b: arrayB, reverse: true })
    expect(result.bOnly).toEqual([valAA])
  })
  test('find the union reversed', async () => {
    const arrayA = [valAA, valAB]
    const arrayB = [valBB, valBC]
    const result = compareValidations({ a: arrayA, b: arrayB, reverse: true })
    expect(result.union).toEqual([valBC, valBB, valAA])
  })
  test('find the intersection reversed', async () => {
    const arrayA = [valAA, valAB]
    const arrayB = [valBB, valBC]
    const result = compareValidations({ a: arrayA, b: arrayB, reverse: true })
    expect(result.intersect).toEqual([valBB])
  })
})
