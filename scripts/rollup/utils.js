import path from 'path';
import fs from 'fs';

import cjs from '@rollup/plugin-commonjs';
import ts from 'rollup-plugin-typescript2';

const distPath = path.resolve(__dirname, '../../dist/node_module');
const pckPath = path.resolve(__dirname, '../../packages');

export function resolvePath(name, isDist) {
	if (isDist) {
		return `${distPath}/${name}`;
	}
	return `${pckPath}/${name}`;
}

export function getPackageJson(name) {
	const path = `${pckPath}/${name}/package.json`;
	console.log(path);
	const str = fs.readFileSync(path);
	return JSON.parse(str);
}

export function getBasePlugins({ typescript } = {}) {
	return [cjs(), ts(typescript)];
}
