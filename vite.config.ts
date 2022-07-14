import path from 'path';
import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
	root: './src',
	base: '/vanilla-three-template/',
	plugins: [glsl()],
	build: {
		rollupOptions: {
			input: {
				home: path.resolve(__dirname, './src/index.html')
			}
		},
		outDir: '../dist'
	}
})