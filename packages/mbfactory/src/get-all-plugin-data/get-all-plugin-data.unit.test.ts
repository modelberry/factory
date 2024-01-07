import ts from 'typescript'
import { getCompilerOptions } from '../get-compiler-options/get-compiler-options'
import { logger } from '../lib/logger'
import { getAllPluginData } from './get-all-plugin-data'

// jest.setTimeout(20000)

const logSpy = {
  h1: jest.spyOn(logger, 'h1').mockImplementation(),
  h2: jest.spyOn(logger, 'h2').mockImplementation(),
  h3: jest.spyOn(logger, 'h3').mockImplementation(),
  p: jest.spyOn(logger, 'p').mockImplementation(),
  info: jest.spyOn(logger, 'info').mockImplementation(),
  error: jest.spyOn(logger, 'error').mockImplementation(),
}

describe('getAllPluginData should', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const compilerOptions = getCompilerOptions()

  test('get data for topic.ts', async () => {
    const file = './src/get-all-plugin-data/__fixtures__/topic.ts'
    const program = ts.createProgram([file], compilerOptions.options)
    const allPluginData = getAllPluginData({ program })
    // Remove variables that contain hard system paths
    allPluginData['@modelberry/plugin-contentful'].dataVar.fileName=''
    allPluginData['@modelberry/plugin-contentful'].types.ContentfulAction.variables[0].fileName = ''
    allPluginData['@modelberry/plugin-contentful'].types.ContentfulTopic.variables[0].fileName = ''
    expect(allPluginData).toMatchSnapshot()
  })

  test('get data for all-tags.ts', async () => {
    const file = './src/get-all-plugin-data/__fixtures__/all-tags.ts'
    const program = ts.createProgram([file], compilerOptions.options)
    const allPluginData = getAllPluginData({ program })
    expect(allPluginData).toMatchSnapshot()
  })

  test('report processing file for no-tags.ts', async () => {
    const file = './src/get-all-plugin-data/__fixtures__/no-tags.ts'
    const program = ts.createProgram([file], compilerOptions.options)
    getAllPluginData({ program })
    expect(logSpy.h3).toHaveBeenCalledWith(
      'src/get-all-plugin-data/__fixtures__/no-tags.ts'
    )
  })

  test('report warnings for no-tags.ts (parse-wr-interface)', async () => {
    const file = './src/get-all-plugin-data/__fixtures__/no-tags.ts'
    const program = ts.createProgram([file], compilerOptions.options)
    getAllPluginData({ program })
    expect(logSpy.error).toHaveBeenCalledWith('- no TSDoc tags (Topic)')
  })

  test('report warnings for no-plugin-tag (parse-wr-interface)', async () => {
    const file = './src/get-all-plugin-data/__fixtures__/no-plugin-tag'
    const program = ts.createProgram([file], compilerOptions.options)
    getAllPluginData({ program })
    expect(logSpy.error).toHaveBeenCalledWith('- no @plugin inline tag (Topic)')
  })

  test('report warnings for no-modelberry-field-tag (parse-wr-interface)', async () => {
    const file =
      './src/get-all-plugin-data/__fixtures__/no-modelberry-field-tag'
    const program = ts.createProgram([file], compilerOptions.options)
    getAllPluginData({ program })
    expect(logSpy.error).toHaveBeenCalledWith(
      '- no @modelberry block tag for field (Topic/heading)'
    )
  })

  test('report warnings for no-modelberry-interface-tag (parse-wr-interface)', async () => {
    const file =
      './src/get-all-plugin-data/__fixtures__/no-modelberry-interface-tag'
    const program = ts.createProgram([file], compilerOptions.options)
    getAllPluginData({ program })
    expect(logSpy.error).toHaveBeenCalledWith(
      '- no @modelberry block tag for interface (Topic)'
    )
  })
})
