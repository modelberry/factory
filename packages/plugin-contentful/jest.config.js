module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '@modelberry/cli/plain': '<rootDir>/../../packages/cli/build/plain.cjs',
  },
}
