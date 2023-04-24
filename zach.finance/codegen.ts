import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://localhost:59001/query',
  documents: ['**/*.vue', '!gql/**/*', '**/*.graphql'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './gql/': {
      preset: 'client',
      config: {
        useTypeImports: true
      }
    }
  }
}

export default config
