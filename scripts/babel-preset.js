const BABEL_ENV = process.env.BABEL_ENV;
const isCommonJS = BABEL_ENV === 'cjs';
const isESM = BABEL_ENV === 'esm';

module.exports = () => ({
  presets: [
    [
      '@babel/preset-env',
      {
        bugfixes: true,
        loose: true,
        modules: isCommonJS ? 'commonjs' : false,
        targets: {
          esmodules: isESM || undefined,
          chrome: 70,
        },
      },
    ],
    '@babel/preset-typescript',

  ],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src'
        }
      }
    ]
  ]
});
