module.exports = function (config) {
  config.set({
    mutate: [
      // FUTURE TODO:
      // 'cli.js',
      'main.js'
    ],
    mutator: 'javascript',
    packageManager: 'yarn',
    reporters: ['clear-text', 'progress'],
    testRunner: 'jest',
    transpilers: [],
    coverageAnalysis: 'off'
  })
}
