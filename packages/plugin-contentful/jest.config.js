module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '@modelberry/mbfactory/plain': '<rootDir>/../../packages/mbfactory/build/plain.cjs',
  },
}
