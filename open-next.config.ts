import { defineCloudflareConfig } from '@opennextjs/cloudflare/config'

const config = defineCloudflareConfig({}) as any

config.default.override.build = (esbuildConfig: any) => {
  esbuildConfig.alias = {
    ...esbuildConfig.alias,
    '@next/env': './src/shims/next-env.js',
  }
  return esbuildConfig
}

export default config
