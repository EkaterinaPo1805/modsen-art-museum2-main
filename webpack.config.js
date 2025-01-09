const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'),
      '@assets': path.resolve(__dirname, 'src/assets/'),
      '@pages': path.resolve(__dirname, 'src/pages/'),
      '@hooks': path.resolve(__dirname, 'src/hooks/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@store': path.resolve(__dirname, 'src/store/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
    },
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json', '.scss'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[hash][ext][query]',
        },
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader'],
      },
    ],
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    historyApiFallback: true,
    open: true,
    port: 3000,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'public/favicon.png'), to: 'favicon.png' },
        { from: path.resolve(__dirname, 'public/manifest.json'), to: 'manifest.json' },
      ],
    }),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
};
