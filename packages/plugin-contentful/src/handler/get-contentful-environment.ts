import cmPkg from 'contentful-management'

export const getContentfulEnvironment = async () => {
  const client = cmPkg.createClient({
    accessToken: process.env.CONTENTFUL_PERSONAL_ACCESS_TOKEN!,
  })
  const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID!)
  const environment = await space.getEnvironment(
    process.env.CONTENTFUL_ENVIRONMENT || 'master'
  )
  return environment
}
