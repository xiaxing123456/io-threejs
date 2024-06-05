import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath, URL } from 'node:url';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from './plugins/dts';

// 配置当前环境变量
// 根据文件名获取对应的环境变量
const envFiles = [`.env`, `.env.${process.env.NODE_ENV}`];
envFiles.forEach(file => {
  const envConfig = dotenv.parse(readFileSync(`${__dirname}/${file}`));
  Object.keys(envConfig).forEach(k => {
    process.env[k] = envConfig[k];
  });
});

export default defineConfig({
  plugins: [dts()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },
  base: './',
  server: {
    host: process.env.VITE_HOST || '127.0.0.1',
    port: Number(process.env.VITE_PORT), // 设置服务启动端口号
    open: process.env.VITE_OPEN_BROWSER === 'on', // 设置服务启动时是否自动打开浏览器
    cors: true, // 允许跨域
    proxy: {}
  },
  build: {
    outDir: 'build', // 将输出目录名称设置为build
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'iothreejs',
      formats: ['es', 'umd'],
      fileName: (format) => {
        console.log(format)
        return `iothree.${format}.js`
      },
    },
  }
})
