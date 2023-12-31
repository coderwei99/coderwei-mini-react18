import generatePackageJson from 'rollup-plugin-generate-package-json';

import { getPackageJson, resolvePath, getBasePlugins } from './utils';
let { name, module } = getPackageJson('react');
name = name.split('/')[1];

const pckPath = resolvePath(name);
const distPath = resolvePath(name, true);

export default [
	// react
	{
		input: `${pckPath}/${module}`,
		output: {
			file: `${distPath}/index.js`,
			name: 'React',
			format: 'umd'
		},
		plugins: [
			...getBasePlugins(),
			generatePackageJson({
				inputFolder: pckPath,
				outputFolder: distPath,
				baseContents: ({ name, description, version }) => ({
					name,
					description,
					version,
					main: 'index.js'
				})
			})
		]
	},

	// jsx-runtime
	// jsx-dev
	{
		input: `${pckPath}/src/jsx.ts`,
		output: [
			{
				file: `${distPath}/jsx-runtime.js`,
				name: 'jsx-runtime',
				format: 'umd'
			},
			{
				file: `${distPath}/jsx-dev-runtime.js`,
				name: 'jsx-dev-runtime',
				formate: 'umd'
			}
		],
		plugins: [...getBasePlugins()]
	}
];
