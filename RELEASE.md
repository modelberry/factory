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


