import { logger } from '@modelberry/mbfactory/plain'
import { config } from 'dotenv'

export const getAndValidateEnv = () => {
  const nodeEnv = process.env.NODE_ENV || 'development'
  const envPath = `.env.${nodeEnv}`
  config({ path: envPath })
  let isValid = true
  if (!process.env.MODELBERRY_PROJECT_NAME) {
    logger.info(`- MODELBERRY_PROJECT_NAME env variable not found`)
  }
  if (!process.env.CONTENTFUL_SPACE_ID) {
    logger.error(`- CONTENTFUL_SPACE_ID env variable is missing`)
    isValid = false
  }
  if (!process.env.CONTENTFUL_PERSONAL_ACCESS_TOKEN) {
    logger.error(`- CONTENTFUL_PERSONAL_ACCESS_TOKEN env variable is missing`)
    isValid = false
  }
  if (!process.env.CONTENTFUL_ENVIRONMENT) {
    logger.error(`- CONTENTFUL_ENVIRONMENT env variable is missing`)
    isValid = false
  }
  return isValid
}
