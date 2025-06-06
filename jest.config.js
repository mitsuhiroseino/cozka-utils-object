/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest/presets/js-with-babel-esm',
  roots: ['<rootDir>/src'],
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'cjs', 'mjs'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    // node_modules配下のemsをcjsに変換するために追加
    '^.+\\.m?jsx?$': [
      'babel-jest',
      {
        // ビルド用の設定を継承
        extends: './babel.config.js',
        // esmをcjsに変換する
        plugins: ['@babel/plugin-transform-modules-commonjs'],
      },
    ],
    // 当プロジェクトのtsをjsに変換するために追加
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.json',
        useESM: true,
      },
    ],
  },
  // node_modules配下はesmからcjsへの変換を行わない
  // 但しnanoidはcjsのソースが提供されていないため変換する
  transformIgnorePatterns: ['node_modules/(?!(nanoid))/'],
};
