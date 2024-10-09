const path = require('path');
const webpack = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');

const port = process.env.PORT || 3000;

const entries = [
  'webpack-dev-server/client?http://localhost:' + port,
  'webpack/hot/only-dev-server',
  'react-hot-loader/patch',
  './src/main.tsx'
];


module.exports = {
  devtool: 'source-map',
  entry: entries,
  output: {
    path: path.join(__dirname, 'public/dist/'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    new ESLintPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __API_SERVER_URL__: JSON.stringify('http://localhost:9966/petclinic')
    })
  ],
  resolve: {
    extensions: ['', '.ts', '.tsx', '.js']
  },

  resolveLoader: {
    modules: ['node_modules']
  },

  module: {


    rules: [
      {
        test: /\.css$/,
        use:  ['style-loader', 'css-loader'], 
      },
      {
        test: /\.less$/,
      
        use:  ['style-loader', 'css-loader'], 
        include: path.join(__dirname, 'src/styles')
      },
      {
        test: /\.(png|jpg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 25000, // Limit of 25 KB for inline resources
          },
        },
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: "url-loader",
        options: { limit: 10000 },
        type: 'asset/resource',
        generator: {
          filename: 'public/fonts/[name].[ext]', // Output to public/fonts/
        },
      },
      {
        test: /\.tsx?$/,  // Test for both .ts and .tsx files
         loader: 'ts-loader', // Use ts-loader to handle TypeScript files 
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/, // Exclude the node_modules directory
      },
      {
        test: /\.js$/, // Test for JavaScript files
        loader:  'babel-loader', // Use babel-loader for transpiling JS
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/, // Exclude the node_modules directory
      }
    ]
  }
 
};
