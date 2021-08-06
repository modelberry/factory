import chalk from 'chalk'
import { ContentFields } from 'contentful-management/types'
import inquirer from 'inquirer'
import { confirmQuestions } from '../lib/confirm-questions'

interface ConfirmOmitted {
  fields: ContentFields[]
}

export const confirmOmitted = async ({ fields }: ConfirmOmitted) => {
  const fieldIds = fields.map((field) => field.id).join(', ')
  console.log(
    chalk.red.bold(
      `WARNING! ` +
        `One or more fields have been omitted. ` +
        `Proceeding removes these fields from the models. ` +
        `All content in these fields will be lost. ` +
        `When in doubt, create a full content backup before proceeding. ` +
        `If your intention is to rename a field id, please do so using the Web interface. ` +
        `(Omitted field ids: ${fieldIds})`
    )
  )
  const answers = await inquirer.prompt(confirmQuestions)
  return answers.policy === 'y'
}
