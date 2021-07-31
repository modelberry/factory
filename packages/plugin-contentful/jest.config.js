module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '@modelberry/push/plain': '<rootDir>/../../packages/push/build/plain.cjs',
  },
}
