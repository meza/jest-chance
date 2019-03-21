import CleanWebpackPlugin from 'clean-webpack-plugin';
import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';

module.exports = (a, env) => {
  const devMode = !(env.mode === 'production');
  return {
    entry: {
      'jest-chance': './src/index.ts',
    },
    devtool: 'inline-source-map',
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.ts?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      useBuiltIns: 'usage',
                      modules: false,
                    },
                  ],
                  '@babel/typescript',
                ],
                plugins: [
                  '@babel/proposal-object-rest-spread',
                  '@babel/plugin-syntax-import-meta',
                  '@babel/plugin-proposal-class-properties',
                  '@babel/plugin-proposal-json-strings',
                  [
                    '@babel/plugin-proposal-decorators',
                    {
                      legacy: true,
                    },
                  ],
                  '@babel/plugin-proposal-function-sent',
                  '@babel/plugin-proposal-export-namespace-from',
                  '@babel/plugin-proposal-numeric-separator',
                  '@babel/plugin-proposal-throw-expressions',
                  '@babel/plugin-proposal-export-default-from',
                  '@babel/plugin-proposal-logical-assignment-operators',
                  '@babel/plugin-proposal-optional-chaining',
                  [
                    '@babel/plugin-proposal-pipeline-operator',
                    {
                      proposal: 'minimal',
                    },
                  ],
                  '@babel/plugin-proposal-nullish-coalescing-operator',
                  '@babel/plugin-proposal-do-expressions',
                  '@babel/plugin-proposal-function-bind',
                ],
              },
            },
            {
              loader: 'tslint-loader',
              options: {
                configFile: devMode ? 'tslint-dev.json' : 'tslint.json',
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      library: 'jest-chance',
      libraryTarget: 'commonjs2'
    },
    target: 'node',
    performance: {
      hints: false,
    },
    optimization: {
      minimizer: [
        /* eslint-disable camelcase */
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
          terserOptions: {
            ecma: 6,
            warnings: false,
            parse: {},
            compress: {
              inline: true,
              drop_console: false,
              dead_code: true,
              sequences: true,
              passes: 1,
              conditionals: true,
              booleans: true,
              unused: true,
              if_return: true,
              join_vars: true,
            },
            mangle: true,
            module: false,
            output: {
              comments: false,
            },
            toplevel: false,
            nameCache: null,
            ie8: false,
            keep_classnames: false,
            keep_fnames: false,
            safari10: false,
          },
        }),
        /* eslint-enable camelcase */
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
    ],
    externals: [
      "chance"
    ]
  };
};
