/** @format */

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { rmSync } from 'node:fs';

rmSync('dist', { recursive: true, force: true });

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	server: {
		open: true,
		port: 3000,
		host: '0.0.0.0',
	},
});
