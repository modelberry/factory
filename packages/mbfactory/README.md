# Modeberry mbfactory

Push and pull typescript models and content to and from a content management platform.

## Todo

- [x] Push models command
- [x] Push content command
- [x] Cli options
  - [x] --dry-run
  - [x] --force
  - [x] --locale
  - [x] --type
- [x] Pull models command
  - [x] Implement model AST code printing
  - [x] Implement model fetching from remote
  - [x] Connect model fetching and code printing
  - [x] Implement AST data variable code printing
  - [x] Implement validation fetching from remote
  - [x] Connect validation fetching and code printing
- [x] Pull content command
  - [x] Implement AST content variable code printing
  - [x] Implement content fetching from remote
  - [x] Connect content fetching and code printing
- [x] Full Contententful API Mock
- [x] Publish to npm
- [x] Alpha testing
  - [ ] Push models, Implement improvements from Alpha test
    - [x] Warn for non existing inline tags
    - [x] Provide suggestions for common mistakes (like @validate instead of @validations)
    - [ ] Respect field order, field order now changes
  - [ ] Push content, Implement improvements from Alpha test
  - [ ] Pull models, Implement improvements from Alpha test
    - [x] Fix extensions and import order in generated main.ts
    - [x] Add @ignore tags to typename and sys as shown below
  - [ ] Pull content, Implement improvements from Alpha test
- [ ] Beta testing
- [ ] Examples
- [ ] Doocument tsdoc inline tags for @modelberry block tag
