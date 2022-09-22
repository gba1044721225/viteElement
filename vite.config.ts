import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { loadEnv } from 'vite'
import postcsspxtoviewport from 'postcss-px-to-viewport'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import path from 'path'
// 路径
const pathSrc = path.resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default ({ command, mode }) => {
    // console.log(loadEnv(mode, process.cwd()).VITE_APP_DEV_URL)
    // console.log(mode === 'development')
    return defineConfig({
        plugins: [
            vue(),
            vueSetupExtend(),
            AutoImport({
                // Auto import functions from Vue, e.g. ref, reactive, toRef...
                // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
                imports: ['vue'],

                // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
                // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
                resolvers: [
                    ElementPlusResolver(),

                    // Auto import icon components
                    // 自动导入图标组件
                    IconsResolver({
                        prefix: 'Icon'
                    })
                ],

                dts: path.resolve(pathSrc, 'auto-imports.d.ts')
            }),

            // 自动导入 Element Plus 组件
            Components({
                resolvers: [
                    // Auto register icon components
                    // 自动注册图标组件
                    IconsResolver({
                        enabledCollections: ['ep']
                    }),

                    // Auto register Element Plus components
                    ElementPlusResolver()
                ],

                dts: path.resolve(pathSrc, 'components.d.ts')
            }),
            // 图标
            Icons({
                autoInstall: true
            })
        ],
        server: {
            host: '127.0.0.1', //127.0.0.1 192.168.43.11
            //port: Number(loadEnv(mode, process.cwd()).VITE_APP_PORT),
            port: 3000,
            strictPort: true, // 端口被占用直接退出
            https: false,
            open: true, // 在开发服务器启动时自动在浏览器中打开应用程序
            proxy: {
                // 字符串简写写法
                '^/api': {
                    target:
                        mode === 'development'
                            ? loadEnv(mode, process.cwd()).VITE_APP_DEV_URL
                            : loadEnv(mode, process.cwd()).VITE_APP_DEV_URL,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, '')
                }
                // '^/api': {
                //     target: 'http://localhost:8080',
                //     changeOrigin: true,
                //     rewrite: (path) => path.replace(/^\/api/, '')
                // }
            },
            hmr: {
                overlay: false // 屏蔽服务器报错
            }
        },
        resolve: {
            alias: {
                '@': pathSrc
            }
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@import "@/styles/variables.scss";`
                }
            },
            postcss: {
                plugins: [
                    postcsspxtoviewport({
                        unitToConvert: 'px', // 需要转换的单位，默认为"px"
                        viewportWidth: 1920, // 设计稿的视窗宽度
                        unitPrecision: 5, // 单位转换后保留的精度
                        propList: ['*', '!font-size'], // 能转化为 vw 的属性列表 '!font-size'去除字体
                        viewportUnit: 'vw', // 希望使用的视窗单位
                        fontViewportUnit: 'vw', // 字体使用的视窗单位
                        selectorBlackList: [], // 需要忽略的 CSS 选择器，不会转为视窗单位，使用原有的 px 等单位
                        minPixelValue: 1, // 设置最小的转换数值，如果为 1 的话，只有大于 1 的值会被转换
                        mediaQuery: false, // 媒体查询里的单位是否需要转换单位
                        replace: true, // 是否直接更换属性值，而不添加备用属性
                        exclude: undefined, // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
                        include: /\/src\//, // 如果设置了include，那将只有匹配到的文件才会被转换
                        landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件
                        landscapeUnit: 'vw', // 横屏时使用的单位
                        landscapeWidth: 1125 // 横屏时使用的视窗宽度
                    })
                ]
            }
        },
        build: {
            chunkSizeWarningLimit: 1500, // 分块打包，分解块，将大块分解成更小的块
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            return id.toString().split('node_modules/')[1].split('/')[0].toString()
                        }
                    }
                }
            }
        }
    })
}
