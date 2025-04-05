// loadEnv 是一个用于加载环境变量的工具函数,
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from 'node:path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'
// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  //获取各种环境下的对应的变量,mode当前运行的环境模式,process.cwd()获取当前项目的根目录index.html
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      vueDevTools(),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: command === 'serve',
        logger: false,
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve('./src'), // 相对路径别名配置，使用 @ 代替 src
      },
    },
    //全局样式配置
    css: {
      preprocessorOptions: {
        scss: {
          // additionalData 是一个特定于预处理器的配置选项，用于向预处理器传递额外的数据。
          // 数据值这里使用sass的 @use 指令来引入全局变量文件。
          //sass：使用 @use，需要通过命名空间访问变量（例如 vars.$color），除非使用 as *
          additionalData: '@use "@/styles/variable.scss" as *;',
        },
      },
    },
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          //获取数据的服务器地址设置
          target: env.VITE_SERVE,
          //需要代理跨域
          changeOrigin: true,
          //路径重写
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
