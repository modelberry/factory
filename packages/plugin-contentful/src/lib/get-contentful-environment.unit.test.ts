jest.mock('contentful-management', () => ({ createClient }))

import { createClient } from '../contentful-mock/contentful-mock'
import { getContentfulEnvironment } from './get-contentful-environment'

describe('getContentfulEnvironment should', () => {
  test('return a Contentful environment from mock', async () => {
    const contentfulEnvironment = await getContentfulEnvironment()
    expect(contentfulEnvironment).toMatchSnapshot()
  })
})
