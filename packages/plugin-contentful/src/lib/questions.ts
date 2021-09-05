export const continueQuestion = [
  {
    choices: [
      {
        key: 'a',
        name: 'Abort',
        value: 'a',
      },
      {
        key: 'c',
        name: 'Continue',
        value: 'c',
      },
    ],
    default: 'c',
    message: 'Continue or Abort?`:',
    name: 'policy',
    type: 'expand',
  },
]

export const omitQuestion = [
  {
    choices: [
      {
        key: 'p',
        name: 'Proceed',
        value: 'p',
      },
      {
        key: 'q',
        name: 'Quit',
        value: 'q',
      },
      {
        key: 's',
        name: 'Skip',
        value: 's',
      },
    ],
    default: 's',
    message: 'Proceed with this model?`:',
    name: 'policy',
    type: 'expand',
  },
]

export const overwriteQuestion = [
  {
    choices: [
      {
        key: 'y',
        name: 'Yes',
        value: 'y',
      },
      {
        key: 'n',
        name: 'No',
        value: 'n',
      },
      {
        key: 'a',
        name: 'yes to All',
        value: 'a',
      },
      {
        key: 'q',
        name: 'Quit, skip all',
        value: 'q',
      },
    ],
    default: 'n',
    message: 'Overwrite?`:',
    name: 'policy',
    type: 'expand',
  },
]
