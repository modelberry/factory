# Changelog

# Release 7.0.2

## @modelberry/mbfactory 7.0.2

### [7.0.2](https://github.com/modelberry/factory/compare/7.0.1...7.0.2) (2022-07-14)



## @modelberry/plugin-contentful 7.0.2

### [7.0.2](https://github.com/modelberry/factory/compare/7.0.1...7.0.2) (2022-07-14)


### Commits

* support for comparing validation objects ([15f9d8b](https://github.com/modelberry/factory/commit/15f9d8baceef877289ca12fa0846b0e0d8e2754b))


# Release 7.0.1

## @modelberry/mbfactory 7.0.1

### [7.0.1](https://github.com/modelberry/factory/compare/7.0.0...7.0.1) (2022-07-13)


### Commits

* draft setup of report generator and printer ([b6c0b2d](https://github.com/modelberry/factory/commit/b6c0b2d07d66262059523a4dd1ac3b4eea2fc801))



## @modelberry/plugin-contentful 7.0.1

### [7.0.1](https://github.com/modelberry/factory/compare/7.0.0...7.0.1) (2022-07-13)


### Features

* experimental push-diff and push-pull commands ([fe488f3](https://github.com/modelberry/factory/commit/fe488f3134f1e566946e767a732109912147237c))


### Bug Fixes

* comapring booleans ([8087378](https://github.com/modelberry/factory/commit/8087378f236d8e0dbe3afc507360daaa6ff212a9))
* order of sys and __typename writing ts ([eeabd25](https://github.com/modelberry/factory/commit/eeabd25209cb5e32a017b3c3d0ecd230080f88b0))


### Code Refactoring

* move code logically closer ([0eba962](https://github.com/modelberry/factory/commit/0eba962acabb1c350b7a70d5832d834c1a881212))
* move commands and generators together ([2616323](https://github.com/modelberry/factory/commit/2616323701c2465d900cd9ca0532443ca6fdd8a4))
* move report folder to src root ([b2fb29d](https://github.com/modelberry/factory/commit/b2fb29d624a2272fdf43b933b2ff277d62bcad46))


### Commits

* add todo ([f9789f6](https://github.com/modelberry/factory/commit/f9789f619f2aa10121d0aafa93adbcd516b34f80))
* cleanup logger.object ([3248563](https://github.com/modelberry/factory/commit/3248563e0db0b89ba565de725ffff3c008e736aa))
* draft setup of report generator and printer ([b6c0b2d](https://github.com/modelberry/factory/commit/b6c0b2d07d66262059523a4dd1ac3b4eea2fc801))
* setup basic pull-diff-models ([4865e59](https://github.com/modelberry/factory/commit/4865e59bcb324ec541e32fa2f871de0c3d7d269b))
* sort validations before comparing tag value ([c2abbf3](https://github.com/modelberry/factory/commit/c2abbf3b1833cd169b57af93db97e3d4b529dbb5))
* update snapshots ([a0e23cf](https://github.com/modelberry/factory/commit/a0e23cf9af6191eb98523fb152f68e6687a6c955))


# Release 7.0.0

## @modelberry/mbfactory 7.0.0

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



## @modelberry/plugin-contentful 7.0.0

## [7.0.0](https://github.com/modelberry/factory/compare/6.30.16...7.0.0) (2022-07-12)


### ⚠ BREAKING CHANGES

* —type becomes —filter, —force becomes —yes

### Features

* change diff command into option ([c839bf0](https://github.com/modelberry/factory/commit/c839bf08294e248fcb9d4ca8590dce432d763624))
* experimental flag for diff commands ([8fca155](https://github.com/modelberry/factory/commit/8fca1559361f2e3c0cbbb0a2ee21f531d61348b0))


### Bug Fixes

* fetch entries in specific locale ([6f6e2bc](https://github.com/modelberry/factory/commit/6f6e2bc558f447c0edaf76f03ca38b775358c10d))
* less verbose logging ([0bc6b05](https://github.com/modelberry/factory/commit/0bc6b05bacf337d80e4dd1840a8402924711972c))


### Code Refactoring

* better naming with local and remote ([c98a92f](https://github.com/modelberry/factory/commit/c98a92f7de93ccdde9086439243463bbaafc4f91))
* better push content naming ([50bf1d5](https://github.com/modelberry/factory/commit/50bf1d5b5da9fb797b2796e72b2fb44a812c27bc))
* better structured pull models ([2ee697f](https://github.com/modelberry/factory/commit/2ee697f7c84d686c8bc84e7427e9c266f839599c))
* diff push and pull ([5581ed5](https://github.com/modelberry/factory/commit/5581ed5c2c597104ae2f5acb83ab89ee4bab5504))
* fetching locales ([1ef2cc4](https://github.com/modelberry/factory/commit/1ef2cc427445339f36e842de28e3090da4547455))
* into entriesToJsVariables ([a327382](https://github.com/modelberry/factory/commit/a32738268f9e2a78f90978e021ea9d6716d3c5b7))
* into entry generator for pull content ([705c42d](https://github.com/modelberry/factory/commit/705c42dfd9a5598e8050b4dcc2841e7560f5b8e4))
* into new getContentArray ([db82199](https://github.com/modelberry/factory/commit/db82199442783bcbc8c5ffbf28611b3c4efbb9bd))
* localContentType generator to yield valid local fields ([e2a2525](https://github.com/modelberry/factory/commit/e2a25259cfce18c271846ab027fc6706f4022cec))
* localVariableGenerator for push content ([080bda7](https://github.com/modelberry/factory/commit/080bda71c190d6c0fe531b5a15851205dcdc2db1))
* modelFields into contentTypeFields ([bd474db](https://github.com/modelberry/factory/commit/bd474dbd0e8207aff5778391d3c0542a1574a0d8))
* modelGenerator for pull models ([1911727](https://github.com/modelberry/factory/commit/19117276c328f444b768dd6728bbe76f4c898aa8))
* move functions to where they are used ([988d13e](https://github.com/modelberry/factory/commit/988d13e340179ab56ff9578f04b3a3a370a6dcd8))
* move into separate push and pull folder ([f957410](https://github.com/modelberry/factory/commit/f957410a46745431000a9f3705b2add58b05b3dc))
* mustIgnoreInterface and organizeEntriesByContentType ([3ce68b5](https://github.com/modelberry/factory/commit/3ce68b51bfc535297a06ce18eabb4975542f2291))
* packages to use new logger (wip) ([68acff0](https://github.com/modelberry/factory/commit/68acff0392ae9be6ea3fa564c8e9249cd2daf5b5))
* packages to use new logger (wip) ([c659c58](https://github.com/modelberry/factory/commit/c659c5826bef990fc3cd3492dcfbdfd630a4c12d))
* packages to use new logger (wip) ([dc54c80](https://github.com/modelberry/factory/commit/dc54c8066c73985475b77adcd62f5c0c6f02b49f))
* pass generator from pull models ([e68e967](https://github.com/modelberry/factory/commit/e68e967de7e59cdc90969a6d38f7f88114ba555d))
* pass generator when pulling content ([35a117c](https://github.com/modelberry/factory/commit/35a117c3ca381f8cc1e5b635a57d5671bfab58e9))
* store inline tags in property tree ([93a4064](https://github.com/modelberry/factory/commit/93a40649c6ab46e0297e73a8649dfcb02b59cd16))


### Commits

* add localTypescriptInterfaceName to push models generator ([a2b8b89](https://github.com/modelberry/factory/commit/a2b8b8937ce22cd643d37fa4ac91bb6ddb6b6e72))
* add test for contentTypeToInlineTags ([66a1264](https://github.com/modelberry/factory/commit/66a1264e7da2ca2e293a7895fc854788352d940f))
* add test for copyKeysIfExists ([766e1e0](https://github.com/modelberry/factory/commit/766e1e06cbeeb27432ec20a1aa382fe8c0900955))
* add test for entriesToJsVariables ([57bf655](https://github.com/modelberry/factory/commit/57bf6553e59a5b2addcc44cb683b5aa97d176df4))
* add test for fetchContentTypes ([b90c57c](https://github.com/modelberry/factory/commit/b90c57c05ab85e830c1ad2a523ca13c7326c67a7))
* add test for fetchEditorInterfaces ([9ae0734](https://github.com/modelberry/factory/commit/9ae073476675eea7fa4cc2e709bf632bf6068d99))
* add test for fetchStatistics ([ae3957d](https://github.com/modelberry/factory/commit/ae3957d74a63f5e384cca89f3b0d5ed5885a16d8))
* add test for getAndValidateEnv ([a62f801](https://github.com/modelberry/factory/commit/a62f801a3c86dc81fff568ae7f8176546dbf7401))
* add test for getContentfulEnvironment and writeSourceFiles ([bfccdb4](https://github.com/modelberry/factory/commit/bfccdb4f46094d841dfbfcdf7acea667579fde36))
* add test for getContentfulLocales ([6053eb4](https://github.com/modelberry/factory/commit/6053eb460fbbebe136646930f0843bd0eeea78d1))
* add test for getFieldIdWithoutPostfix ([1a7654d](https://github.com/modelberry/factory/commit/1a7654d036a2741565209484f55d359852423992))
* add test for removeLinkAndLinkType ([752beaa](https://github.com/modelberry/factory/commit/752beaa9fd586896f2792b211240bf53c4652760))
* add tests ([95c0458](https://github.com/modelberry/factory/commit/95c04586fa81e3c6cd2927b81f14531cc7fbc9f0))
* add tests for getLinkContentTypes and contentTypesToString ([8040f81](https://github.com/modelberry/factory/commit/8040f81e674f67878b6de2adcb244f8b33afbe08))
* better option names ([1c8a540](https://github.com/modelberry/factory/commit/1c8a54052dabd2014b4b822bff55362644a01db5))
* comparing type ids ([2b65200](https://github.com/modelberry/factory/commit/2b65200b46cc8878da581a75cb6479125d62ad7a))
* connect handler to dif methods ([e208a66](https://github.com/modelberry/factory/commit/e208a666697a29ad4108aee01cd1be7f314f67bc))
* contentTypeFieldsToPropertyTree test ([edd3b46](https://github.com/modelberry/factory/commit/edd3b46d1c2e0111199ba43b5c17b88325446c09))
* disable log in test ([af0cf42](https://github.com/modelberry/factory/commit/af0cf42baf68823cc3434d26e9db3d7dc524167b))
* fix build errors ([c6df20e](https://github.com/modelberry/factory/commit/c6df20e965f9b7e24da6f47c6431b2538bdd9413))
* linter fixes ([d684df8](https://github.com/modelberry/factory/commit/d684df86af7b8d7781f9847d876f37111bcaeb30))
* localContentTypeGenerator for push models ([d6b6e17](https://github.com/modelberry/factory/commit/d6b6e17b592060a7f9aa4fc9043ea8344d9491cc))
* setup diff commands for push and pull ([d407bdc](https://github.com/modelberry/factory/commit/d407bdc331aea9e9e6d1f0c6241ae77d010c8061))
* setup diff handler in plugin ([10d32ac](https://github.com/modelberry/factory/commit/10d32acbb3175f46bd954937e95c8e85859732da))
* setup draft diff command ([216fda0](https://github.com/modelberry/factory/commit/216fda0e63df2d88866fcecbe85b4d2c5f94231a))
* setup iterators for diffModels ([5ad207a](https://github.com/modelberry/factory/commit/5ad207a6e6fc0f57743db5efd560e2d303a9df76))
* setup not implemented message ([2da3e2b](https://github.com/modelberry/factory/commit/2da3e2b3ebd52f220b668b8078d27c2c8d78f925))
* update linter config ([913c3c6](https://github.com/modelberry/factory/commit/913c3c67a9a40ffdef7193459f5f96008df94bea))
* update packages ([3d0a2f2](https://github.com/modelberry/factory/commit/3d0a2f2b8177e5ab69f117c9bb8e9d99fc739569))
* update snapshot ([ec1ccb2](https://github.com/modelberry/factory/commit/ec1ccb252b77c82d203f1942e83967e220c2b149))
* update tests for getValidationName ([b4b67d4](https://github.com/modelberry/factory/commit/b4b67d4fb6c2c0e03467d2bc4a87fa006a97c649))


# Release 6.30.16

## @modelberry/mbfactory 6.30.16

### [6.30.16](https://github.com/modelberry/factory/compare/6.30.15...6.30.16) (2022-07-03)



## @modelberry/plugin-contentful 6.30.16

### [6.30.16](https://github.com/modelberry/factory/compare/6.30.15...6.30.16) (2022-07-03)


### Bug Fixes

* [#51](https://github.com/modelberry/factory/issues/51), [#52](https://github.com/modelberry/factory/issues/52) ([2c4bebf](https://github.com/modelberry/factory/commit/2c4bebfa0f07a286db5f633b442da31803149525))


### Commits

* do not repeat chalk lines ([a4587fc](https://github.com/modelberry/factory/commit/a4587fcf516edcc197634ee21e1bb0fda03323ff))


### Code Refactoring

* into separate fetchEntries ([889c7f6](https://github.com/modelberry/factory/commit/889c7f64be5d489e6e801bd09a78e1370b490bbf))


# Release 6.30.15

## @modelberry/mbfactory 6.30.15

### [6.30.15](https://github.com/modelberry/factory/compare/6.30.14...6.30.15) (2022-07-03)



## @modelberry/plugin-contentful 6.30.15

### [6.30.15](https://github.com/modelberry/factory/compare/6.30.14...6.30.15) (2022-07-03)


### Bug Fixes

* [#43](https://github.com/modelberry/factory/issues/43) ([33350fc](https://github.com/modelberry/factory/commit/33350fc459b3732055c273d3f0f795fabb2a241f))
* [#45](https://github.com/modelberry/factory/issues/45) ([f2434e1](https://github.com/modelberry/factory/commit/f2434e1b77d27fc795234ffada9ab0bc17476a3f))
* [#50](https://github.com/modelberry/factory/issues/50) ([5755022](https://github.com/modelberry/factory/commit/57550225369641bc19823b7b20b8e217604d70b7))
* [#57](https://github.com/modelberry/factory/issues/57) ([2f4e995](https://github.com/modelberry/factory/commit/2f4e99504df602669f000a513d99dcb2a43e70a7))


# Release 6.30.14

## @modelberry/mbfactory 6.30.14

### [6.30.14](https://github.com/modelberry/factory/compare/6.30.13...6.30.14) (2022-06-21)


### Bug Fixes

* [#60](https://github.com/modelberry/factory/issues/60) ([c582334](https://github.com/modelberry/factory/commit/c58233467771b012790a6f6c6fa8184c56a186d8))



## @modelberry/plugin-contentful 6.30.14

### [6.30.14](https://github.com/modelberry/factory/compare/6.30.13...6.30.14) (2022-06-21)


### Bug Fixes

* [#60](https://github.com/modelberry/factory/issues/60) ([c582334](https://github.com/modelberry/factory/commit/c58233467771b012790a6f6c6fa8184c56a186d8))


# Release 6.30.13

## @modelberry/plugin-contentful 6.30.13

### [6.30.13](https://github.com/modelberry/factory/compare/6.30.12...6.30.13) (2022-06-07)


### Bug Fixes

* [#68](https://github.com/modelberry/factory/issues/68) ([0c8c55c](https://github.com/modelberry/factory/commit/0c8c55cd97221de66c3f96dd552d349a35a53f94))


# Release 6.30.12

## @modelberry/mbfactory 6.30.12

### [6.30.12](https://github.com/modelberry/factory/compare/6.30.11...6.30.12) (2022-05-04)


### Commits

* **deps:** bump follow-redirects in /packages/mbfactory ([18f8e73](https://github.com/modelberry/factory/commit/18f8e73c6699f812e801cc4e3ed6632556eec138))
* disable eslint ([905a1bc](https://github.com/modelberry/factory/commit/905a1bc9503250d367f3bdbe41c1b7ee5fd37019))
* fix types ([d12f70e](https://github.com/modelberry/factory/commit/d12f70e78bd816c344023f0a37e893673772d31b))
* update packages ([0ffa1b8](https://github.com/modelberry/factory/commit/0ffa1b8d945ce34a764d9c47b9faa96bafc9df77))



## @modelberry/plugin-contentful 6.30.12

### [6.30.12](https://github.com/modelberry/factory/compare/6.30.11...6.30.12) (2022-05-04)


### Commits

* **deps:** bump follow-redirects in /packages/plugin-contentful ([742f02f](https://github.com/modelberry/factory/commit/742f02f4ee5de79be3f99c275eb5e7be0080cbf3))
* update packages ([0ffa1b8](https://github.com/modelberry/factory/commit/0ffa1b8d945ce34a764d9c47b9faa96bafc9df77))


# Release 6.30.11

## @modelberry/mbfactory 6.30.11

### [6.30.11](https://github.com/modelberry/factory/compare/6.30.10...6.30.11) (2022-03-28)



## @modelberry/plugin-contentful 6.30.11

### [6.30.11](https://github.com/modelberry/factory/compare/6.30.10...6.30.11) (2022-03-28)


# Release 6.30.10

## @modelberry/plugin-contentful 6.30.10

### [6.30.10](https://github.com/modelberry/factory/compare/6.30.9...6.30.10) (2022-03-28)


### Commits

* update packages ([21165ed](https://github.com/modelberry/factory/commit/21165ed0eb55f1babafe2d7fa84a3a0794e8fa93))


# Release 6.30.9

## @modelberry/mbfactory 6.30.9

### [6.30.9](https://github.com/modelberry/factory/compare/6.30.8...6.30.9) (2022-01-12)


### Documentation

* add note on empty tsconfig.json ([6d188cf](https://github.com/modelberry/factory/commit/6d188cf92e69c0c3b444a686d028f7e7ade64c92))



## @modelberry/plugin-contentful 6.30.9

### [6.30.9](https://github.com/modelberry/factory/compare/6.30.8...6.30.9) (2022-01-12)


### Bug Fixes

* [#64](https://github.com/modelberry/factory/issues/64) ([1865fb2](https://github.com/modelberry/factory/commit/1865fb2d12c04595fdec416616f9c3b115485c17))


# Release 6.30.8

## @modelberry/mbfactory 6.30.8

### [6.30.8](https://github.com/modelberry/factory/compare/6.30.7...6.30.8) (2022-01-12)


### Documentation

* add links to contentful docs ([0bb22b9](https://github.com/modelberry/factory/commit/0bb22b9841714e5c4b65814ada0fb0823bc73606))


### Commits

* rename CONTENTFUL_CMA_TOKEN into CONTENTFUL_PERSONAL_ACCESS_TOKEN ([25b0e60](https://github.com/modelberry/factory/commit/25b0e60ae3502adb3b1914ae2e253efcaca4b47d))



## @modelberry/plugin-contentful 6.30.8

### [6.30.8](https://github.com/modelberry/factory/compare/6.30.7...6.30.8) (2022-01-12)


### Documentation

* link to npm package ([b13e761](https://github.com/modelberry/factory/commit/b13e761e3662050abe72dd5741bd97153f5e78d1))


### Commits

* rename CONTENTFUL_CMA_TOKEN into CONTENTFUL_PERSONAL_ACCESS_TOKEN ([25b0e60](https://github.com/modelberry/factory/commit/25b0e60ae3502adb3b1914ae2e253efcaca4b47d))


# Release 6.30.7

## @modelberry/mbfactory 6.30.7

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



## @modelberry/plugin-contentful 6.30.7

### [6.30.7](https://github.com/modelberry/factory/compare/6.30.6...6.30.7) (2022-01-11)


### Commits

* update packages ([082e5b5](https://github.com/modelberry/factory/commit/082e5b5194e1ea73070dcde3c683840657a2c454))


### Documentation

* add examples to text ([15dfd10](https://github.com/modelberry/factory/commit/15dfd10069a761f0904d9709fa4bc5afd382d4b1))
* add getting started ([8d3ecda](https://github.com/modelberry/factory/commit/8d3ecdae906f0c95f47f6acc190064b8319a0936))
* move docs to mbfactgory-docs ([acd6b42](https://github.com/modelberry/factory/commit/acd6b42b314537be9a6e74a29aa13cec8851fc8d))
* setup draft outline ([e144bde](https://github.com/modelberry/factory/commit/e144bde8be1be2a2a0cb812b1c06bfd3be1a754b))


# Release 6.30.6

## @modelberry/mbfactory 6.30.6

### [6.30.6](https://github.com/modelberry/factory/compare/6.30.5...6.30.6) (2021-11-28)


### Bug Fixes

* [#37](https://github.com/modelberry/factory/issues/37) ([30052c6](https://github.com/modelberry/factory/commit/30052c663bbe16fa39ee30a7a30f4370876cd911))



## @modelberry/plugin-contentful 6.30.6

### [6.30.6](https://github.com/modelberry/factory/compare/6.30.5...6.30.6) (2021-11-28)


### Bug Fixes

* [#37](https://github.com/modelberry/factory/issues/37) ([30052c6](https://github.com/modelberry/factory/commit/30052c663bbe16fa39ee30a7a30f4370876cd911))


### Commits

* update tests ([1b5fa33](https://github.com/modelberry/factory/commit/1b5fa334ca229ce7dad8e69f029b03a2590f8aba))


# Release 6.30.5

## @modelberry/mbfactory 6.30.5

### [6.30.5](https://github.com/modelberry/factory/compare/6.30.4...6.30.5) (2021-11-28)


### Bug Fixes

* [#62](https://github.com/modelberry/factory/issues/62) ([7719ad6](https://github.com/modelberry/factory/commit/7719ad6e87b31a2488a350b963ba82f8d2b2d9b2))


### Commits

* adapt to jest v27 ([c0294f0](https://github.com/modelberry/factory/commit/c0294f0ff5aeb18a8c421ebe0bbf41dbcf6ba825))
* add test scripts ([5c26a3b](https://github.com/modelberry/factory/commit/5c26a3b9388dcd3b474dc1aa155b93c3dce2e806))
* downgrade chalk ([f3e0c96](https://github.com/modelberry/factory/commit/f3e0c96be8eb6b919d41ea1705b7e30fe058e79b))
* remove snapshots ([6e60e10](https://github.com/modelberry/factory/commit/6e60e10e3b11015b8f6bfbfff143998e5491e1dd))
* update packages ([f633b07](https://github.com/modelberry/factory/commit/f633b079fd88b22230dba798a2895d9badaed37b))



## @modelberry/plugin-contentful 6.30.5

### [6.30.5](https://github.com/modelberry/factory/compare/6.30.4...6.30.5) (2021-11-28)


### Bug Fixes

* [#46](https://github.com/modelberry/factory/issues/46) ([f6f969b](https://github.com/modelberry/factory/commit/f6f969bcd268cd55e952121badd36157fe45cf7d))
* [#58](https://github.com/modelberry/factory/issues/58) [#59](https://github.com/modelberry/factory/issues/59) ([b369250](https://github.com/modelberry/factory/commit/b369250d237173d0c23bb6f60d2979aca6bf643c))
* [#61](https://github.com/modelberry/factory/issues/61) ([21db88b](https://github.com/modelberry/factory/commit/21db88b2fff3979700883b35a56f3e0a2fd580e2))
* [#62](https://github.com/modelberry/factory/issues/62) ([7719ad6](https://github.com/modelberry/factory/commit/7719ad6e87b31a2488a350b963ba82f8d2b2d9b2))
* make sys.id optional ([65c6779](https://github.com/modelberry/factory/commit/65c67790d1b2563cd4cc12f1deda30c6d2e3bec9))


### Commits

* adapt to jest v27 ([c0294f0](https://github.com/modelberry/factory/commit/c0294f0ff5aeb18a8c421ebe0bbf41dbcf6ba825))
* downgrade chalk ([f3e0c96](https://github.com/modelberry/factory/commit/f3e0c96be8eb6b919d41ea1705b7e30fe058e79b))
* remove snapshots ([6e60e10](https://github.com/modelberry/factory/commit/6e60e10e3b11015b8f6bfbfff143998e5491e1dd))
* update packages ([f633b07](https://github.com/modelberry/factory/commit/f633b079fd88b22230dba798a2895d9badaed37b))


# Release 6.30.4

## @modelberry/plugin-contentful 6.30.4

### [6.30.4](https://github.com/modelberry/factory/compare/6.30.3...6.30.4) (2021-10-10)


### Bug Fixes

* [#56](https://github.com/modelberry/factory/issues/56) ([d446e1b](https://github.com/modelberry/factory/commit/d446e1b7108c011c56d33d6e90d51e6a4591f427))


# Release 6.30.3

## @modelberry/mbfactory 6.30.3

### [6.30.3](https://github.com/modelberry/factory/compare/6.30.2...6.30.3) (2021-10-10)



## @modelberry/plugin-contentful 6.30.3

### [6.30.3](https://github.com/modelberry/factory/compare/6.30.2...6.30.3) (2021-10-10)


### Bug Fixes

* [#53](https://github.com/modelberry/factory/issues/53) ([686736b](https://github.com/modelberry/factory/commit/686736b368baf0d5cd6763d365ef36f1a4f0fdbf))
* [#54](https://github.com/modelberry/factory/issues/54) ([dc0f2e2](https://github.com/modelberry/factory/commit/dc0f2e29caaac3936490741aaefce6252f1ec529))


# Release 6.30.2

## @modelberry/mbfactory 6.30.2

### [6.30.2](https://github.com/modelberry/factory/compare/6.30.1...6.30.2) (2021-10-03)


### Documentation

* moved issues to github ([e8800d7](https://github.com/modelberry/factory/commit/e8800d743f44f7014f4d26f943608f2c0554a386))


### Commits

* change option color from red to blue ([277cc77](https://github.com/modelberry/factory/commit/277cc77a3e87476f75ecd609076f1fa5df757c93))



## @modelberry/plugin-contentful 6.30.2

### [6.30.2](https://github.com/modelberry/factory/compare/6.30.1...6.30.2) (2021-10-03)


### Bug Fixes

* id bug [#36](https://github.com/modelberry/factory/issues/36) ([0147325](https://github.com/modelberry/factory/commit/0147325a0bba72c8f4c8644129fa4463d29922a2))


### Documentation

* comment on pusing and pulling content ([48277bd](https://github.com/modelberry/factory/commit/48277bd5f4f8e3f6ac574a49416c7651d64e4e55))


### Commits

* add flags attribute to regexp validation ([23cbaac](https://github.com/modelberry/factory/commit/23cbaacae409dfac49efc122c23b0d7303de2371))
* add name for regexp validation ([86e755f](https://github.com/modelberry/factory/commit/86e755f8c3a7b0cbfa85f55f4c0cf5743483bda8))
* add reference type ([3d60eb9](https://github.com/modelberry/factory/commit/3d60eb9170276a3d32711aaedd8bb9846e784692))
* disable eslint ([c906b42](https://github.com/modelberry/factory/commit/c906b42cb4a31475b32de31f8cffcba87c54bcef))
* fix [#42](https://github.com/modelberry/factory/issues/42) ([63d4bb7](https://github.com/modelberry/factory/commit/63d4bb757cfa8fd3c64c5bb41f59de462837019a))
* fix tests ([3d5c86d](https://github.com/modelberry/factory/commit/3d5c86d5118887d91047b63f59fe050388fa6738))
* fix validation types ([537725a](https://github.com/modelberry/factory/commit/537725a828b0d4dde901a5d2b9b808b79ed8b1ea))
* fixes [#39](https://github.com/modelberry/factory/issues/39) ([34bb7a2](https://github.com/modelberry/factory/commit/34bb7a224264b1431b7e616462b05d346b0f2a57))
* fixes [#40](https://github.com/modelberry/factory/issues/40) [#41](https://github.com/modelberry/factory/issues/41) ([69fe0a0](https://github.com/modelberry/factory/commit/69fe0a07708cc8789d3b5c989ef0459ab6b73d76))
* push richt text Doucment object ([f5bde5c](https://github.com/modelberry/factory/commit/f5bde5cfcbf87d33496e0d4aa77197f02c075df9))
* ref type and rich text type fixes ([7a267d0](https://github.com/modelberry/factory/commit/7a267d0a5cdaf3ff184a5c771ac159d4b32054df))
* update test ([b97df61](https://github.com/modelberry/factory/commit/b97df61a179c5a9c51f7b4a97902b3b4f30cc914))
* update tests ([1f4466d](https://github.com/modelberry/factory/commit/1f4466ddf9551eaaeca99693f79b30e43d7cbf52))
* use type instead of interface ([93d90ef](https://github.com/modelberry/factory/commit/93d90eff18a1dbf1a52b9e6afb98b8245827dad7))


# Release 6.30.1

## @modelberry/mbfactory 6.30.1

### [6.30.1](https://github.com/modelberry/factory/compare/6.30.0...6.30.1) (2021-10-02)



## @modelberry/plugin-contentful 6.30.1

### [6.30.1](https://github.com/modelberry/factory/compare/6.30.0...6.30.1) (2021-10-02)


### Bug Fixes

* use content type id  instead of name ([e45dafd](https://github.com/modelberry/factory/commit/e45dafd23190f964cb3c076cef7a48a519498948))


### Commits

* simplify icon names in tests ([e255caf](https://github.com/modelberry/factory/commit/e255cafd94c874289b06b3b9853a3c5d1640cc9f))


# Release 6.30.0

## @modelberry/mbfactory 6.30.0

## [6.30.0](https://github.com/modelberry/factory/compare/6.29.5...6.30.0) (2021-09-29)


### Features

* Warn for non existing inline tags ([6086cf3](https://github.com/modelberry/factory/commit/6086cf32ddcfe01eecc9657b9056d83319125d7f))


### Bug Fixes

* respect field order, field order now changes ([7f6c97a](https://github.com/modelberry/factory/commit/7f6c97a7e49c0aedaf10c9040c5ed390564dbdb2))


### Commits

* typo ([1bd801e](https://github.com/modelberry/factory/commit/1bd801ec349559e7a1ebdf98318f7385bce8d768))



## @modelberry/plugin-contentful 6.30.0

## [6.30.0](https://github.com/modelberry/factory/compare/6.29.5...6.30.0) (2021-09-29)


### Features

* Warn for non existing inline tags ([6086cf3](https://github.com/modelberry/factory/commit/6086cf32ddcfe01eecc9657b9056d83319125d7f))


### Bug Fixes

* respect field order, field order now changes ([7f6c97a](https://github.com/modelberry/factory/commit/7f6c97a7e49c0aedaf10c9040c5ed390564dbdb2))


# Release 6.29.5

## @modelberry/mbfactory 6.29.5

### [6.29.5](https://github.com/modelberry/factory/compare/6.29.4...6.29.5) (2021-09-28)


### Bug Fixes

* consistent us of widgetId tag ([3d8dbd2](https://github.com/modelberry/factory/commit/3d8dbd26419c72ec67b5893146fbe317af496b35))



## @modelberry/plugin-contentful 6.29.5

### [6.29.5](https://github.com/modelberry/factory/compare/6.29.4...6.29.5) (2021-09-28)


### Bug Fixes

* consistent us of widgetId tag ([3d8dbd2](https://github.com/modelberry/factory/commit/3d8dbd26419c72ec67b5893146fbe317af496b35))


# Release 6.29.4

## @modelberry/plugin-contentful 6.29.4

### [6.29.4](https://github.com/modelberry/factory/compare/6.29.3...6.29.4) (2021-09-28)


### Commits

* add [@ignore](https://github.com/ignore) tags to __typename and sys ([4daf033](https://github.com/modelberry/factory/commit/4daf0332a174ebd27a6a279deb0f5eb9e35b6e9f))


# Release 6.29.3

## @modelberry/plugin-contentful 6.29.3

### [6.29.3](https://github.com/modelberry/factory/compare/6.29.2...6.29.3) (2021-09-23)


### Bug Fixes

* remove extensions from imports in main.ts ([053359f](https://github.com/modelberry/factory/commit/053359fa8780187e9c6a85498bbee85feb3a93f3))


# Release 6.29.2

## @modelberry/mbfactory 6.29.2

### [6.29.2](https://github.com/modelberry/factory/compare/6.29.1...6.29.2) (2021-09-12)


### Bug Fixes

* add typescript dependency ([5888532](https://github.com/modelberry/factory/commit/5888532fb381b538ea85ab56dc72c91afbd57657))



## @modelberry/plugin-contentful 6.29.2

### [6.29.2](https://github.com/modelberry/factory/compare/6.29.1...6.29.2) (2021-09-12)


# Release 6.29.1

## @modelberry/mbfactory 6.29.1

### [6.29.1](https://github.com/modelberry/factory/compare/6.29.0...6.29.1) (2021-09-12)



## @modelberry/plugin-contentful 6.29.1

### [6.29.1](https://github.com/modelberry/factory/compare/6.29.0...6.29.1) (2021-09-12)


# Release 6.29.0

## @modelberry/plugin-contentful 6.29.0

## [6.29.0](https://github.com/modelberry/factory/compare/6.28.1...6.29.0) (2021-09-12)


### Features

* support for removing fields from existing content models ([4ad066a](https://github.com/modelberry/factory/commit/4ad066ab36360406411c378f7c6ab3abc48da96f))


### Documentation

* update todo ([4fd9340](https://github.com/modelberry/factory/commit/4fd93406ad3650a79ff25ba3b7d0aedc20703039))


### Code Refactoring

* callType and callCommand ([d01e268](https://github.com/modelberry/factory/commit/d01e26846b95068568a69e931e0099c99f36c732))
* create fields into get fields ([50549d8](https://github.com/modelberry/factory/commit/50549d8f2ab7e8fd9f9e02cb298b5a1adfa80823))
* extract push types ([c8bc3bf](https://github.com/modelberry/factory/commit/c8bc3bf7e597ba6e917bec6c803fda1df430cf28))
* into separate get-source-files files ([8733fa8](https://github.com/modelberry/factory/commit/8733fa8cd1b2061ba7d546f3fffc1849f420bffc))
* model fields and controls ([b5d57c2](https://github.com/modelberry/factory/commit/b5d57c26a167f80cdab0787531138db35623480c))
* push models ([3221d99](https://github.com/modelberry/factory/commit/3221d99f239c32779e938d2a81afe86eb06ddf92))
* renam to modelberry ([0185b7a](https://github.com/modelberry/factory/commit/0185b7aaf3c1d567656d3269027be092c720e217))
* rename from factory into mbfactory ([dc8c6a6](https://github.com/modelberry/factory/commit/dc8c6a681fa31053d3ba5143019a0598cefef6eb))
* rename tsconfig.packages.json into tsconfig.json ([0c5dabd](https://github.com/modelberry/factory/commit/0c5dabd70193fda5fc793bc70bee7d3cd3174edf))
* rename wheelroom into modelberry ([19f14c9](https://github.com/modelberry/factory/commit/19f14c9f57a769979009ce6ccdc53dfa0b305cf3))
* rename write source file ([4230768](https://github.com/modelberry/factory/commit/423076834a42ff0ccd27a5910f92cdd39f0684fa))
* set root repo to factory and package name to mbfactory ([5a1f28e](https://github.com/modelberry/factory/commit/5a1f28e2ca12e2d5597fd4e790c88ac29f188b2f))
* split up push models ([bec933e](https://github.com/modelberry/factory/commit/bec933ed01b9cd2549382eb00a29a3ef666dec88))
* wrVar into mbVar ([1d0550b](https://github.com/modelberry/factory/commit/1d0550b70562e79f436374cc2f7a3788f224f33d))


### Commits

* add editor interface to contentful mock ([eee8011](https://github.com/modelberry/factory/commit/eee801141f90dc36162405a9d1ebf883d78491d1))
* add get-all-plugin-data snapshot test ([d0c75ef](https://github.com/modelberry/factory/commit/d0c75efd44ff374ad89826840b8b29097293d977))
* add ignore functionality ([0fb8ea4](https://github.com/modelberry/factory/commit/0fb8ea4c398dbaa72bd0a99158663da71b3a8eba))
* add items to arrays ([2edb34b](https://github.com/modelberry/factory/commit/2edb34be569c49b08c6bc4b611b0251f56dd33e9))
* add make ([f0189b0](https://github.com/modelberry/factory/commit/f0189b0a560af406a332e42ad1a672a05dfe96e5))
* add option force to tests ([f1e9d09](https://github.com/modelberry/factory/commit/f1e9d09b61a208f1753596f3e10761d15614e5da))
* add options ([dab2f29](https://github.com/modelberry/factory/commit/dab2f29fb18bca0434f2b911a6d114e46e184209))
* add options force and dry-run ([0c9d7a4](https://github.com/modelberry/factory/commit/0c9d7a40704a88f40087566cff6cce467b7fd7ca))
* add property tree comment example ([9ef1a62](https://github.com/modelberry/factory/commit/9ef1a62a1b44a0e39801ec98823f3c0369354662))
* add StringKeyword todo ([159a27d](https://github.com/modelberry/factory/commit/159a27d0fb5e8ccdf9f7dd97bb141acbf3ed1c63))
* add support for multiple validations ([eb70e88](https://github.com/modelberry/factory/commit/eb70e88d8c4047de4f867e1dc137f583dd924411))
* add test for getWheelroomPluginData ([4524406](https://github.com/modelberry/factory/commit/452440651c5ee3e80573061725ae3506ed97ef67))
* add todo ([2361eb5](https://github.com/modelberry/factory/commit/2361eb5859f10c6870cf83eb677947e974d6d0f8))
* add topic action content fixture ([d279856](https://github.com/modelberry/factory/commit/d2798562c95f7d66db40cb6e3fface2228b6bda6))
* add typescript type to wheelroom fields ([55909a9](https://github.com/modelberry/factory/commit/55909a9927eda5e103a6a2cbfa6eaf0f3135392d))
* added push content test ([03d4f55](https://github.com/modelberry/factory/commit/03d4f553002153e46375c363f757aeb9a13ee654))
* better default field names ([c2899d2](https://github.com/modelberry/factory/commit/c2899d29812e4e8bbd508426df9e74824ba4d405))
* better message when skipping field ([a5aa907](https://github.com/modelberry/factory/commit/a5aa907d22b51dbdb5e92a22be257658388da2a9))
* better messages ([6d0c7de](https://github.com/modelberry/factory/commit/6d0c7dea57f8980bfa0085b5ae545c44d6a23c00))
* better messages ([b4185ed](https://github.com/modelberry/factory/commit/b4185edd278fac79ac18309046ae09ea985025ee))
* change abort into quit ([247152b](https://github.com/modelberry/factory/commit/247152b6d2725a9445e49c865377487a968617ad))
* confirm file overwrite ([36384df](https://github.com/modelberry/factory/commit/36384df537430d73efd64acd491060104db11e10))
* create environmentMock ([63c8d27](https://github.com/modelberry/factory/commit/63c8d27eaf640569c45a2ba0a45d35459bb0f74a))
* don't use Collection postfix on arrays ([c696458](https://github.com/modelberry/factory/commit/c69645812673beb9902c48eea086833db1c5cda2))
* draft setup getTsSyntaxKind ([1733aeb](https://github.com/modelberry/factory/commit/1733aeb423370f7b49f44f2d8bfcd10937ee765c))
* draft setup of getTsSyntaxKind ([346278d](https://github.com/modelberry/factory/commit/346278daafb512829c25ad3f0bd582ca2b0c4904))
* draft setup of writing actual content ([84dad03](https://github.com/modelberry/factory/commit/84dad037a639d899adce685ebfe8b1fa9c9cac30))
* enable updating of existing content ([e186c75](https://github.com/modelberry/factory/commit/e186c750f1a59a4dc71ae087252a56ba0bf585c8))
* fix content pushing and add todo ([ef21a71](https://github.com/modelberry/factory/commit/ef21a71d51833d3a6a27f33a8d5dd60f577217e8))
* fix contentful mock ([294ae8e](https://github.com/modelberry/factory/commit/294ae8e2a1fa50d02bf949f2b47370b43f9603ac))
* fix default ([082f917](https://github.com/modelberry/factory/commit/082f91752d1ebd837b99510b9ab4ebff88427025))
* fix environment ([a75268e](https://github.com/modelberry/factory/commit/a75268ef9a714d5d2c4c0bb713a47947fd2a4a66))
* fix imports ([cf14e7a](https://github.com/modelberry/factory/commit/cf14e7a704b4f5ce7f59efc646d2644f919aa56c))
* fix imports ([12ef4cc](https://github.com/modelberry/factory/commit/12ef4ccb4003f60a64ce334bfdd269c424bcb9c9))
* fix multiple validations ([8117211](https://github.com/modelberry/factory/commit/811721187884c745ecc52a1a1016dc652dd40106))
* fix npm install ([03bb446](https://github.com/modelberry/factory/commit/03bb446df7c8dfdae98f343c1cca40b772981a20))
* fix tests ([7535a1b](https://github.com/modelberry/factory/commit/7535a1baaf5f1f54c2c38de79f39d2dc399502c5))
* fix typo ([8022d19](https://github.com/modelberry/factory/commit/8022d19ceb561b3382c290cef2b960251cbde19f))
* get type name from validation ([0858042](https://github.com/modelberry/factory/commit/0858042c1e7959c69a093518eb97366011ea3293))
* implement locale cli option ([71f06d8](https://github.com/modelberry/factory/commit/71f06d8065f327e7596467c9c47dd2ae143e6033))
* implement type filter option ([9c83667](https://github.com/modelberry/factory/commit/9c83667b6fcf1082b6b8428d646bf667913b429b))
* implement validation collection ([68a3d8b](https://github.com/modelberry/factory/commit/68a3d8b5b221aeb272e8bff032060c20531faecd))
* implemented empty plugin pull handlers ([8e871f2](https://github.com/modelberry/factory/commit/8e871f25ed32604f06ced19eb6237e456d96f94e))
* implemented mb tags when pulling models ([0304789](https://github.com/modelberry/factory/commit/03047896b8d2db572ab4b01e98691f5f438d3563))
* implemented tests for push models ([8099cc3](https://github.com/modelberry/factory/commit/8099cc3915565a19ff8cff7e44081d8b20bf3dca))
* import all types into main.ts ([416950a](https://github.com/modelberry/factory/commit/416950a7f312389af3b66e15f5ff2a2924a56aad))
* import ContentfulAsset ([94c586a](https://github.com/modelberry/factory/commit/94c586ae15085dcfc3ef3cbf6be90fd602b11ced))
* import entry types ([10741e2](https://github.com/modelberry/factory/commit/10741e273987d9207d6b4fde6f448a4a0cc5d767))
* improved push content test ([ff6a42f](https://github.com/modelberry/factory/commit/ff6a42f1b3e775eaa1ee3d02255e37809677cf32))
* improved snapshot ([0c8d065](https://github.com/modelberry/factory/commit/0c8d065d8c40285b5606c54e18206f655064298a))
* improved variable names ([7f746b6](https://github.com/modelberry/factory/commit/7f746b6119034299733f6cb795ee3656523beee7))
* linter fix ([ca2d734](https://github.com/modelberry/factory/commit/ca2d734c75c83aad326adbd70ef5ac29ceb498fd))
* log content ([4cd95bc](https://github.com/modelberry/factory/commit/4cd95bccd208bb249d0066c25a87a15c93073e25))
* move hander into separate folder ([c249222](https://github.com/modelberry/factory/commit/c24922224f363078f865d8e9457a15f9db99b525))
* pull [@help](https://github.com/help)Text and [@widget](https://github.com/widget) ([4172912](https://github.com/modelberry/factory/commit/417291224a64d531e3d83d204c12235be770d87a))
* pull into multiple validations ([86c94f3](https://github.com/modelberry/factory/commit/86c94f315460975a98b2f87cda6168a575903fde))
* readable pull modles test snapshots ([a965fc4](https://github.com/modelberry/factory/commit/a965fc4391fd695ad52d09429efa3f96b7d8ed22))
* remove comment ([91339f2](https://github.com/modelberry/factory/commit/91339f2faf3f64f30af6e27a7e1a972c4d1b9501))
* remove old fixture ([5514675](https://github.com/modelberry/factory/commit/5514675d071170d2150cf255a4477d3c7e1a2869))
* rename [@validation](https://github.com/validation) into [@validations](https://github.com/validations) ([ffe1daf](https://github.com/modelberry/factory/commit/ffe1daf8a3da9827593b348051b403c64a88e45b))
* rename cli into mbfactory ([264a252](https://github.com/modelberry/factory/commit/264a252f649f6de73cbd34da1869343076a0936b))
* rename from berry-factory into factory ([fdb1c32](https://github.com/modelberry/factory/commit/fdb1c322e9442796fca3eae7659722cacd1093fa))
* rename get models into get model ([9d4053e](https://github.com/modelberry/factory/commit/9d4053edaf69d220ca754f4eab4fb5738ccd1228))
* rounding up content pull ([e9bb54a](https://github.com/modelberry/factory/commit/e9bb54ab2be89c56b983937ce6909ccb9b3d1ea6))
* setup contentful client mock ([1f840a4](https://github.com/modelberry/factory/commit/1f840a448305ef35375c8fe5d1ca911c92ce1cb8))
* setup create field ([f0aade1](https://github.com/modelberry/factory/commit/f0aade125f684638ce6203383c10ecbc7b080ed0))
* setup get property tree field ([9055a09](https://github.com/modelberry/factory/commit/9055a097781db8d8ab3b145570f1b64609e6fb60))
* setup pushing content ([8c3c64f](https://github.com/modelberry/factory/commit/8c3c64fc0ca60e37599b82396db0ca608cadc648))
* split out fixtures to each command ([a329ff8](https://github.com/modelberry/factory/commit/a329ff8fe65859955479a5a6e82d59026783670b))
* sync license across projects for clarity ([ae3bf0c](https://github.com/modelberry/factory/commit/ae3bf0c75e56eb74d94d13e3a99e811aa1dcd593))
* update action ([b5b8c1a](https://github.com/modelberry/factory/commit/b5b8c1a808a04ca2acf5f491802dfb5017ae986a))
* update contentful mock with content ([39b557f](https://github.com/modelberry/factory/commit/39b557f3f740593e281ec6313181c5c77d4bcfc0))
* update license ([bad6a09](https://github.com/modelberry/factory/commit/bad6a09ef9c49e0fe349c7c128adc781eb217ec1))
* update rollup config ([b68d8fc](https://github.com/modelberry/factory/commit/b68d8fcba3e73d51ae4ece99b3305f8f567ce8a3))
* update tests ([004432a](https://github.com/modelberry/factory/commit/004432a31f650cc03807c517d241c8b1b625e909))
* update variable type ([f05e2f1](https://github.com/modelberry/factory/commit/f05e2f1cbb1c03e3fbd7746ae3fd1768cd0378d6))
* use new propertyTree for building interface ([d467c12](https://github.com/modelberry/factory/commit/d467c12ddf8179674bfee83f6b4a8b4183453e70))
* validation names that make sense ([b1ddb89](https://github.com/modelberry/factory/commit/b1ddb89045032a6d25811f07e4f9851ec25df506))
* write source files for model pull ([2d61a62](https://github.com/modelberry/factory/commit/2d61a6281d4bec64cb202ef0292277e2df20b333))


# Release 6.28.1

## Start of changelog
