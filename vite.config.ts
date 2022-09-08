import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'
import { loadEnv } from 'vite'
import type { UserConfigExport } from 'vite'

// https://vitejs.dev/config/
export default ({ command, mode }) => {
    console.log(loadEnv(mode, process.cwd()).VITE_APP_DEV_URL)

    const viteConfig: UserConfigExport = {
        plugins: [
            vue(),
            AutoImport({
                resolvers: [ElementPlusResolver()]
            }),
            Components({
                resolvers: [ElementPlusResolver()]
            })
        ],
        resolve: {
            alias: {
                '@': resolve(__dirname, './src')
            }
        }
    }

    if (command === 'serve') {
        // dev 独有配置
        viteConfig.server = {}
    } else {
        // command === 'build'
        // build 独有配置
    }

    return defineConfig(viteConfig)
}
