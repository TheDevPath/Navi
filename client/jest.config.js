module.exports = {
  "moduleNameMapper": {
    "^react-dom/server$": "<rootDir>/node_modules/preact-render-to-string/dist/index.js",
    "^react-addons-test-utils$": "<rootDir>/node_modules/preact-test-utils/lib/index.js",
    "^react$": "<rootDir>/node_modules/preact-compat-enzyme/lib/index.js",
    "^react-dom$": "<rootDir>/node_modules/preact-compat-enzyme/lib/index.js"
  },
  "transform": {".*": "<rootDir>/node_modules/jest-css-modules"},
  "setupFiles": [require.resolve('regenerator-runtime/runtime')],
  "snapshotSerializers": [ "preact-render-spy/snapshot" ]
}