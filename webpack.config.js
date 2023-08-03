const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");


module.exports = {
  plugins: [
    
  ],

  optimization: {
    minimize: true,
    minimizer: [

      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
      }),

      
    ],
  },

  experiments: {
    outputModule: true,
  },

  externalsType: "module",
  externals: {
    "../../../rutas_test.js": "./rutas_test.js",
  },

  devtool: "source-map",
  entry: "./core/body-tester.js",
  output: {
    filename: "body-tester.js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: 'module'
  },
  module: {
    // noParse: /rutas_test.js/,
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader','minify-html-literals-loader'],
      },
      {
        test: /\.css$/,
        use: ['lit-css-loader','postcss-loader'],

      },
      {
        test: /\.svg/,
        use: {
          loader: "svg-url-loader",
          options: {},
        },
      },
    ],
  },

  resolve: {
    extensions: [".js"],
    alias: {
      lit: path.resolve(__dirname, "node_modules/lit"),
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: "./dist/index.html",
      // templateParameters: {
      //   typeModule: 'type="module"', // Atributo personalizado para type="module"
      // },
    }),
  ],

  devServer: {
    
    static: {
      directory: path.resolve(__dirname),
    },
    port: 8082,
    allowedHosts: "all",
  },
};
