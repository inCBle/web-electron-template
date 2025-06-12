/** @format */

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import electron from 'vite-plugin-electron/simple';
import { rmSync } from 'node:fs';

// 先将dist、dist-electron、release文件夹强制删除在进行后续的打包流程
rmSync('dist', { recursive: true, force: true });
rmSync('dist-electron', { recursive: true, force: true });
rmSync('release', { recursive: true, force: true });

export default defineConfig({
	plugins: [
		vue(),
		electron({
			main: {
				entry: 'electron/main.ts',
			}, preload: {
				input: 'electron/preload.ts',
			},
		}),
	],
});
