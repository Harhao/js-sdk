const path = require("path");
const commonjs = require("rollup-plugin-commonjs");
const resolve = require("rollup-plugin-node-resolve");
const buble = require("rollup-plugin-buble");
const json = require("rollup-plugin-json");
const alias = require("rollup-plugin-alias");
const { terser } = require("rollup-plugin-terser");
const image = require("@rollup/plugin-image");
const typescript = require("rollup-plugin-typescript");
const { isProduction } = require("./utlils");
const projectRootDir = path.resolve(__dirname);

const inputOptions = {
  input: "src/main.ts",
  plugins: [
    alias({
      "@": [
        {
          find: "src",
          replacement: path.resolve(projectRootDir, "src"),
        },
      ],
    }),
    json({
      compact: true,
    }),
    image({
      exclude: ["node_modules/**"],
      include: ["src/**"],
    }),
    resolve(),
    typescript({
      exclude: ["node_modules/**"],
      typescript: require('typescript')
    }),
    commonjs(),
    isProduction && terser(),
  ],
};

const output = [{
  name: "js-sdk",
  file: "dist/js-sdk.umd.js",
  format: "umd"
}, {
  name: "js-sdk",
  file: "dist/js-sdk.common.js",
  format: "commonjs"
}, {
  name: "js-sdk",
  file: "dist/js-sdk.esm.js",
  format: "esm"
}];
const exportModule = {
  ...inputOptions,
  output,
};
isProduction() &&
  (exportModule["watch"] = {
    include: "src/**",
  });
  
module.exports = exportModule;
