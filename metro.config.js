// metro.config.js

const { getDefaultConfig } = require("expo/metro-config")
const path = require("path")
const fs = require("fs")

const config = getDefaultConfig(__dirname)

config.resolver.sourceExts.push("cjs")
config.resolver.unstable_enablePackageExports = false
config.transformer.babelTransformerPath =
	require.resolve("react-native-svg-transformer")
config.resolver.assetExts = config.resolver.assetExts.filter(
	ext => ext !== "svg",
)
config.resolver.sourceExts.push("svg")

// Force all @firebase/* imports to use the versions bundled inside the firebase
// package (firebase/node_modules/@firebase/*). Without this, firebase's nested
// @firebase/app and the top-level one create separate service registries, which
// causes "Service X not available" at runtime.
const firebaseNestedModules = path.join(
	__dirname,
	"node_modules",
	"firebase",
	"node_modules",
)

config.resolver.resolveRequest = (context, moduleName, platform) => {
	if (moduleName.startsWith("@firebase/")) {
		const pkgName = moduleName.split("/").slice(0, 2).join("/")
		const nestedPath = path.join(firebaseNestedModules, pkgName)
		if (fs.existsSync(nestedPath)) {
			return context.resolveRequest(
				{
					...context,
					originModulePath: path.join(nestedPath, "package.json"),
				},
				moduleName,
				platform,
			)
		}
	}
	return context.resolveRequest(context, moduleName, platform)
}

module.exports = config
