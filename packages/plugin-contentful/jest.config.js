module.exports = {
  roots: [
    '<rootDir>/src',
  ],
  moduleNameMapper: {
    '@modelberry/mbfactory/plain': '<rootDir>/../../packages/mbfactory/build/plain.cjs',
  },
  preset: 'ts-jest',
}
