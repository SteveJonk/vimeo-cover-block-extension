const path = require("path");
const defaults = require("@wordpress/scripts/config/webpack.config.js");

module.exports = {
	...defaults,
	entry: {
		scripts: path.resolve(process.cwd(), "src", "index.ts"),
	},
	output: {
		filename: "index.js",
		path: path.resolve(process.cwd(), "build"),
	},
	module: {
		...defaults.module,
		rules: [
			...defaults.module.rules,
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: "ts-loader",
						options: {
							configFile: "tsconfig.json",
							transpileOnly: true,
						},
					},
				],
			},
		],
	},
	resolve: {
		extensions: [
			".ts",
			".tsx",
			...(defaults.resolve
				? defaults.resolve.extensions || [".js", ".jsx"]
				: []),
		],
	},
};
