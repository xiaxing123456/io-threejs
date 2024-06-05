import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
const envFiles = [`.env`, `.env.${process.env.NODE_ENV}`];
envFiles.forEach(file => {
    const envConfig = dotenv.parse(readFileSync(`${__dirname}/${file}`));
    Object.keys(envConfig).forEach(k => {
        process.env[k] = envConfig[k];
    });
});
export default defineConfig({
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        }
    },
    base: './',
    server: {
        host: process.env.VITE_HOST || '127.0.0.1',
        port: Number(process.env.VITE_PORT),
        open: process.env.VITE_OPEN_BROWSER === 'on',
        cors: true,
        proxy: {}
    },
    build: {}
});
//# sourceMappingURL=vite.config.js.map