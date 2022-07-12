import { logger } from '@modelberry/mbfactory/plain'
import { ContentFields } from 'contentful-management/types'
import inquirer from 'inquirer'
import { omitQuestion } from '../../handler/questions'

interface ConfirmOmitted {
  fields: ContentFields[]
}

export const confirmOmitted = async ({ fields }: ConfirmOmitted) => {
  const fieldIds = fields.map((field) => field.id).join(', ')
  logger.warning(
    `WARNING! ` +
      `One or more fields have been omitted. ` +
      `Proceeding will remove these fields from this model. ` +
      `For these fields, all values for all entries will be lost. ` +
      `When in doubt, create a full content backup before proceeding. ` +
      `If your intention is to rename a field id, please do so using the web interface. ` +
      `(Omitted field ids: ${fieldIds})`
  )

  const answers = await inquirer.prompt(omitQuestion)
  if (answers.policy === 'q') process.exit(0)
  return answers.policy === 'p'
}
