import typescript from "rollup-plugin-typescript2";
import pkg from './package.json'
import autoExternal from "rollup-plugin-auto-external";

export default {
	input: "src/index.ts",
	output: [
		{
			file: pkg.main,
			format: "cjs"
		},
		{
			file: pkg.module,
			format: "es"
		}
	],
	external: [
		...Object.keys(pkg.dependencies || {}),
		...Object.keys(pkg.peerDependencies || {}),
		"rxjs/operators"
	],
	plugins: [
		autoExternal(),
		typescript({
			typescript: require("typescript")
		})
	]
};
