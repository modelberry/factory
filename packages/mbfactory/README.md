# @modelberry/mbfactory

Sync Typescript to Contentful. Two way. Models and content.

## Requirements

Mbfactory requires [Node.js](https://nodejs.org) version 16 or higher.

## Install

```bash
npm install -g @modelberry/mbfactory @modelberry/plugin-contentful
```

## Check for succesful install

```bash
mbfactory --help
```

## Setup environment

Copy [the env template](https://github.com/modelberry/factory/blob/main/packages/mbfactory/template.env.development) to: `.env.development`

Edit the env file and set:

- `CONTENTFUL_PERSONAL_ACCESS_TOKEN` ([where can I find this?](https://www.contentful.com/help/personal-access-tokens/#how-to-get-a-personal-access-token-the-web-app))
- `CONTENTFUL_SPACE_ID` ([where can I find this?](https://www.contentful.com/help/find-space-id/))

## Typescript compiler API

Mbfactory uses the [Typescript compiler API](https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API) which requires a valid `tsconfig.json`. Use your existing config or create an empty one:

```json
{
  "compilerOptions": {}
}
```

## Next

Head over to the docs and examples at [modelberry/mbfactory-docs](https://github.com/modelberry/mbfactory-docs/blob/main/README.md) and start your first push or pull.
