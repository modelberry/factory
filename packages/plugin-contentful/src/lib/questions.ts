export const continueQuestion = [
  {
    choices: [
      {
        key: 'c',
        name: 'Continue',
        value: 'x',
      },
      {
        key: 'a',
        name: 'Abort',
        value: 'a',
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
        key: 's',
        name: 'Skip',
        value: 's',
      },
      {
        key: 'q',
        name: 'Quit',
        value: 'q',
      },
    ],
    default: 's',
    message: 'Proceed with this model?`:',
    name: 'policy',
    type: 'expand',
  },
]
