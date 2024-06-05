import vue from '@vitejs/plugin-vue';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';


// 配置当前环境变量
// 根据文件名获取对应的环境变量
const envFiles = [`.env`, `.env.${process.env.NODE_ENV}`];
envFiles.forEach(file => {
  const envConfig = dotenv.parse(readFileSync(`${__dirname}/${file}`));
  Object.keys(envConfig).forEach(k => {
    process.env[k] = envConfig[k];
  });
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
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
  build: {}
})
