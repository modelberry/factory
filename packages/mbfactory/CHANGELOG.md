# Changelog

## [8.0.8](https://github.com/modelberry/factory/compare/8.0.7...8.0.8) (2024-2-15)

## [8.0.7](https://github.com/modelberry/factory/compare/8.0.6...8.0.7) (2024-1-7)


### Commits

* update packages to typescript v5 ([330ecfe](https://github.com/modelberry/factory/commit/330ecfede51cb3c7f20eceed776231eb0ea11218))

## [8.0.6](https://github.com/modelberry/factory/compare/8.0.4...8.0.6) (2024-1-7)


### Bug Fixes

* remove system details from tests ([377a57f](https://github.com/modelberry/factory/commit/377a57feaf0f16a16cc0d84f9610b5b34190e0fc))
* security audit ([2352d79](https://github.com/modelberry/factory/commit/2352d79404d8aad7657e6994748886f515184d86))

## [8.0.5](https://github.com/modelberry/factory/compare/8.0.4...8.0.5) (2024-1-7)


### Bug Fixes

* remove system details from tests ([377a57f](https://github.com/modelberry/factory/commit/377a57feaf0f16a16cc0d84f9610b5b34190e0fc))
* security audit ([2352d79](https://github.com/modelberry/factory/commit/2352d79404d8aad7657e6994748886f515184d86))

## [8.0.4](https://github.com/modelberry/factory/compare/8.0.3...8.0.4) (2023-04-17)

## [8.0.3](https://github.com/modelberry/factory/compare/8.0.2...8.0.3) (2023-03-14)

## [8.0.2](https://github.com/modelberry/factory/compare/8.0.1...8.0.2) (2023-03-14)


### Bug Fixes

* rollup config ([0ed7c55](https://github.com/modelberry/factory/commit/0ed7c554e8d9a69879d369dfb9da6a5f1003e2a2))

## [8.0.1](https://github.com/modelberry/factory/compare/8.0.0...8.0.1) (2023-03-14)


### Commits

* remove /plain ([3ffd5c4](https://github.com/modelberry/factory/commit/3ffd5c469110f5462265d52861385b28e7533941))

## [8.0.0](https://github.com/modelberry/factory/compare/7.2.2...8.0.0) (2023-03-14)


### ⚠ BREAKING CHANGES

* Use v7 for TS4.

* Updated all node packages, this fixes security audit warnings. From v8 this package depends on Typescript 5. ([54337f1](https://github.com/modelberry/factory/commit/54337f188f517ad99d2ed09823f1fdc3751292a9))


### Commits

* back to typescript v4.9.5, prep for typescript v5 ([b4b97cf](https://github.com/modelberry/factory/commit/b4b97cfed4da7c018a1c3a3c9f4f43031d7dac51))

## [7.2.2](https://github.com/modelberry/factory/compare/7.2.1...7.2.2) (2023-03-14)

## [7.2.0](https://github.com/modelberry/factory/compare/7.1.1...7.2.0) (2022-09-01)


### Features

* [#72](https://github.com/modelberry/factory/issues/72) ([142a930](https://github.com/modelberry/factory/commit/142a930da42f824c88f864dc349e55c9081d91f1))

### [7.1.1](https://github.com/modelberry/factory/compare/7.1.0...7.1.1) (2022-08-31)


### Bug Fixes

* add push-diff and pull-diff commands to cli help ([3678c2b](https://github.com/modelberry/factory/commit/3678c2b6e32494d2eba666e95afd62f019974fcb))

## [7.1.0](https://github.com/modelberry/factory/compare/7.0.4...7.1.0) (2022-08-31)


### Features

* remove experimental from push-diff and pull-diff commands ([fb7427a](https://github.com/modelberry/factory/commit/fb7427a58945e90e3a1cb3393233e0bb5d240fc3))

### [7.0.4](https://github.com/modelberry/factory/compare/7.0.3...7.0.4) (2022-07-14)

### [7.0.3](https://github.com/modelberry/factory/compare/7.0.2...7.0.3) (2022-07-14)

### [7.0.2](https://github.com/modelberry/factory/compare/7.0.1...7.0.2) (2022-07-14)

### [7.0.1](https://github.com/modelberry/factory/compare/7.0.0...7.0.1) (2022-07-13)


### Commits

* draft setup of report generator and printer ([b6c0b2d](https://github.com/modelberry/factory/commit/b6c0b2d07d66262059523a4dd1ac3b4eea2fc801))

## [7.0.0](https://github.com/modelberry/factory/compare/6.30.16...7.0.0) (2022-07-12)


### ⚠ BREAKING CHANGES

* —type becomes —filter, —force becomes —yes

### Features

* add diff command ([84defea](https://github.com/modelberry/factory/commit/84defeae59ea398aef76ef7d7373389bab9f1ea8))
* change diff command into option ([c839bf0](https://github.com/modelberry/factory/commit/c839bf08294e248fcb9d4ca8590dce432d763624))
* experimental flag for diff commands ([8fca155](https://github.com/modelberry/factory/commit/8fca1559361f2e3c0cbbb0a2ee21f531d61348b0))
* mute logger ([01ac168](https://github.com/modelberry/factory/commit/01ac1680837e7cfd658696539783dd7ba45d8bab))
* terminal logger ([3af3d86](https://github.com/modelberry/factory/commit/3af3d86651f13e7d19b8a5f0e361875837e448eb))


### Code Refactoring

* better naming with local and remote ([c98a92f](https://github.com/modelberry/factory/commit/c98a92f7de93ccdde9086439243463bbaafc4f91))
* callHandler to use logger ([febbb36](https://github.com/modelberry/factory/commit/febbb366ee80b066e5ff48af4ca75634680f566a))
* packages to use new logger (wip) ([c659c58](https://github.com/modelberry/factory/commit/c659c5826bef990fc3cd3492dcfbdfd630a4c12d))
* packages to use new logger (wip) ([dc54c80](https://github.com/modelberry/factory/commit/dc54c8066c73985475b77adcd62f5c0c6f02b49f))
* store inline tags in property tree ([93a4064](https://github.com/modelberry/factory/commit/93a40649c6ab46e0297e73a8649dfcb02b59cd16))


### Commits

* add TODO ([0777629](https://github.com/modelberry/factory/commit/0777629b77e5697f3ff51dc4e090665838ea2480))
* better option names ([1c8a540](https://github.com/modelberry/factory/commit/1c8a54052dabd2014b4b822bff55362644a01db5))
* change cli interface once more, into push-diff and pull-diff ([5fac82a](https://github.com/modelberry/factory/commit/5fac82a12917747b1250c8ee1c10384141037850))
* connect handler to dif methods ([e208a66](https://github.com/modelberry/factory/commit/e208a666697a29ad4108aee01cd1be7f314f67bc))
* fix build errors ([c6df20e](https://github.com/modelberry/factory/commit/c6df20e965f9b7e24da6f47c6431b2538bdd9413))
* linter fixes ([d684df8](https://github.com/modelberry/factory/commit/d684df86af7b8d7781f9847d876f37111bcaeb30))
* logger member order ([cafaed9](https://github.com/modelberry/factory/commit/cafaed9dae4ec7501148eedee5e6c1207aeb7832))
* setup diff commands for push and pull ([d407bdc](https://github.com/modelberry/factory/commit/d407bdc331aea9e9e6d1f0c6241ae77d010c8061))
* update diff commands in package.json ([6aa1ecf](https://github.com/modelberry/factory/commit/6aa1ecf3bf38e6f125ff5abdc5db1f5a7c7c5515))
* update linter config ([913c3c6](https://github.com/modelberry/factory/commit/913c3c67a9a40ffdef7193459f5f96008df94bea))
* update logger with h1, h2, etc ([a4b0eb1](https://github.com/modelberry/factory/commit/a4b0eb180d7e9bdb53773470f236b5be6c7ca512))
* update packages ([3d0a2f2](https://github.com/modelberry/factory/commit/3d0a2f2b8177e5ab69f117c9bb8e9d99fc739569))

### [6.30.16](https://github.com/modelberry/factory/compare/6.30.15...6.30.16) (2022-07-03)

### [6.30.15](https://github.com/modelberry/factory/compare/6.30.14...6.30.15) (2022-07-03)

### [6.30.14](https://github.com/modelberry/factory/compare/6.30.13...6.30.14) (2022-06-21)


### Bug Fixes

* [#60](https://github.com/modelberry/factory/issues/60) ([c582334](https://github.com/modelberry/factory/commit/c58233467771b012790a6f6c6fa8184c56a186d8))

### [6.30.12](https://github.com/modelberry/factory/compare/6.30.11...6.30.12) (2022-05-04)


### Commits

* **deps:** bump follow-redirects in /packages/mbfactory ([18f8e73](https://github.com/modelberry/factory/commit/18f8e73c6699f812e801cc4e3ed6632556eec138))
* disable eslint ([905a1bc](https://github.com/modelberry/factory/commit/905a1bc9503250d367f3bdbe41c1b7ee5fd37019))
* fix types ([d12f70e](https://github.com/modelberry/factory/commit/d12f70e78bd816c344023f0a37e893673772d31b))
* update packages ([0ffa1b8](https://github.com/modelberry/factory/commit/0ffa1b8d945ce34a764d9c47b9faa96bafc9df77))

### [6.30.11](https://github.com/modelberry/factory/compare/6.30.10...6.30.11) (2022-03-28)

### [6.30.9](https://github.com/modelberry/factory/compare/6.30.8...6.30.9) (2022-01-12)


### Documentation

* add note on empty tsconfig.json ([6d188cf](https://github.com/modelberry/factory/commit/6d188cf92e69c0c3b444a686d028f7e7ade64c92))

### [6.30.8](https://github.com/modelberry/factory/compare/6.30.7...6.30.8) (2022-01-12)


### Documentation

* add links to contentful docs ([0bb22b9](https://github.com/modelberry/factory/commit/0bb22b9841714e5c4b65814ada0fb0823bc73606))


### Commits

* rename CONTENTFUL_CMA_TOKEN into CONTENTFUL_PERSONAL_ACCESS_TOKEN ([25b0e60](https://github.com/modelberry/factory/commit/25b0e60ae3502adb3b1914ae2e253efcaca4b47d))

### [6.30.7](https://github.com/modelberry/factory/compare/6.30.6...6.30.7) (2022-01-11)


### Bug Fixes

* add contentful-plugin as a dependency ([cf65154](https://github.com/modelberry/factory/commit/cf65154e90df29a0ea2225ac88460a43efb32f08))
* set scriptname to mbfactory ([55365f1](https://github.com/modelberry/factory/commit/55365f1fb0af41bbb3240d8602c30de5b619b0b4))


### Commits

* update packages ([082e5b5](https://github.com/modelberry/factory/commit/082e5b5194e1ea73070dcde3c683840657a2c454))


### Documentation

* add examples to text ([15dfd10](https://github.com/modelberry/factory/commit/15dfd10069a761f0904d9709fa4bc5afd382d4b1))
* add getting started ([8d3ecda](https://github.com/modelberry/factory/commit/8d3ecdae906f0c95f47f6acc190064b8319a0936))
* getting started ([366aaa2](https://github.com/modelberry/factory/commit/366aaa2cbd84e30f458fad3e763ee3f0fef018aa))
* minor update ([7fc54b9](https://github.com/modelberry/factory/commit/7fc54b9892a5ee120fb4b89a623fb7764885357d))
* move docs to mbfactgory-docs ([acd6b42](https://github.com/modelberry/factory/commit/acd6b42b314537be9a6e74a29aa13cec8851fc8d))
* setup draft outline ([e144bde](https://github.com/modelberry/factory/commit/e144bde8be1be2a2a0cb812b1c06bfd3be1a754b))

### [6.30.6](https://github.com/modelberry/factory/compare/6.30.5...6.30.6) (2021-11-28)


### Bug Fixes

* [#37](https://github.com/modelberry/factory/issues/37) ([30052c6](https://github.com/modelberry/factory/commit/30052c663bbe16fa39ee30a7a30f4370876cd911))

### [6.30.5](https://github.com/modelberry/factory/compare/6.30.4...6.30.5) (2021-11-28)


### Bug Fixes

* [#62](https://github.com/modelberry/factory/issues/62) ([7719ad6](https://github.com/modelberry/factory/commit/7719ad6e87b31a2488a350b963ba82f8d2b2d9b2))


### Commits

* adapt to jest v27 ([c0294f0](https://github.com/modelberry/factory/commit/c0294f0ff5aeb18a8c421ebe0bbf41dbcf6ba825))
* add test scripts ([5c26a3b](https://github.com/modelberry/factory/commit/5c26a3b9388dcd3b474dc1aa155b93c3dce2e806))
* downgrade chalk ([f3e0c96](https://github.com/modelberry/factory/commit/f3e0c96be8eb6b919d41ea1705b7e30fe058e79b))
* remove snapshots ([6e60e10](https://github.com/modelberry/factory/commit/6e60e10e3b11015b8f6bfbfff143998e5491e1dd))
* update packages ([f633b07](https://github.com/modelberry/factory/commit/f633b079fd88b22230dba798a2895d9badaed37b))

### [6.30.3](https://github.com/modelberry/factory/compare/6.30.2...6.30.3) (2021-10-10)

### [6.30.2](https://github.com/modelberry/factory/compare/6.30.1...6.30.2) (2021-10-03)


### Documentation

* moved issues to github ([e8800d7](https://github.com/modelberry/factory/commit/e8800d743f44f7014f4d26f943608f2c0554a386))


### Commits

* change option color from red to blue ([277cc77](https://github.com/modelberry/factory/commit/277cc77a3e87476f75ecd609076f1fa5df757c93))

### [6.30.1](https://github.com/modelberry/factory/compare/6.30.0...6.30.1) (2021-10-02)

## [6.30.0](https://github.com/modelberry/factory/compare/6.29.5...6.30.0) (2021-09-29)


### Features

* Warn for non existing inline tags ([6086cf3](https://github.com/modelberry/factory/commit/6086cf32ddcfe01eecc9657b9056d83319125d7f))


### Bug Fixes

* respect field order, field order now changes ([7f6c97a](https://github.com/modelberry/factory/commit/7f6c97a7e49c0aedaf10c9040c5ed390564dbdb2))


### Commits

* typo ([1bd801e](https://github.com/modelberry/factory/commit/1bd801ec349559e7a1ebdf98318f7385bce8d768))

### [6.29.5](https://github.com/modelberry/factory/compare/6.29.4...6.29.5) (2021-09-28)


### Bug Fixes

* consistent us of widgetId tag ([3d8dbd2](https://github.com/modelberry/factory/commit/3d8dbd26419c72ec67b5893146fbe317af496b35))

### [6.29.2](https://github.com/modelberry/factory/compare/6.29.1...6.29.2) (2021-09-12)


### Bug Fixes

* add typescript dependency ([5888532](https://github.com/modelberry/factory/commit/5888532fb381b538ea85ab56dc72c91afbd57657))

### [6.29.1](https://github.com/modelberry/factory/compare/6.29.0...6.29.1) (2021-09-12)

# Changelog

# Release 6.28.1

## Start of changelog
