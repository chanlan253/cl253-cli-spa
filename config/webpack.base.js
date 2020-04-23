const path = require("path");
const webpack = require("webpack");
const AppConfig = require("../app.config");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HappyPack = require("happypack");
const os = require("os");
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const isDev = process.env.NODE_ENV === "development";
const resolve = relatedPath => {
  return path.join(__dirname, relatedPath);
};
module.exports = {
  context: resolve("../"),
  entry: {
    main: ["./src/main.js"]
  },
  output: {
    path: resolve("../dist"),
    filename: isDev ? "[name].js" : "js/[name].[contenthash].js",
    chunkFilename: isDev ? "js/[id].js" : "js/[id].[contenthash].js",
    publicPath: process.env.NODE_ENV === "production" ? `${AppConfig.publicPath}/` : "/"
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".less", ".json"],
    modules: ["../node_modules"],
    alias: {
      "@": resolve(`../src`),
      components: resolve(`../src/components`),
      pages: resolve(`../src/pages`),
      assets: resolve(`../src/assets`),
      ...(AppConfig.alias || {})
    }
  },
  // externals: {
  //   axios: ["commonDll.default", "axios"],
  // },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "happypack/loader?id=babel"
      },
      {
        //加载ant
        test: /\.(css|less)$/,
        include: [path.resolve(__dirname, "../node_modules"), path.resolve(__dirname, "../src/assets")],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: isDev
            }
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1, // 之前有2个loaders
              sourceMap: !isDev
            }
          },
          {
            loader: "less-loader",
            options: {
              modifyVars: {
                hack: `true; @import "${resolve(`../src/assets/style/theme.less`)}";`
              },
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        //加载src里的
        test: /\.(css|less)$/,
        include: [path.resolve(__dirname, "../src")],
        exclude: [path.resolve(__dirname, "../src/assets")],
        use: [
          isDev
            ? "style-loader"
            : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  hmr: isDev,
                  reloadAll: isDev
                }
              },
          {
            loader: "css-loader",
            options: {
              importLoaders: 2, // 之前有2个loaders
              sourceMap: !isDev,
              modules: {
                mode: "local",
                localIdentName: "[local]--[hash:base64:5]"
              }
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [require("autoprefixer")]
            }
          },
          {
            loader: "less-loader",
            options: {
              modifyVars: {
                hack: `true; @import "${resolve(`../src/assets/style/theme.less`)}";`
              }
            }
          }
        ]
      },

      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10240,
          name: path.posix.join("static", "img/[name].[hash:7].[ext]")
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10240,
          name: path.posix.join("static", "media/[name].[hash:7].[ext]")
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10240,
          name: path.posix.join("static", "fonts/[name].[hash:7].[ext]")
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isDev ? "css/style.css" : "css/[contenthash].[id].css",
      chunkFilename: isDev ? "css/[id].css" : "css/[contenthash].[id].css"
    }),
    // 定义环境变量为开发环境
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.title": JSON.stringify(AppConfig.title),
      "process.env.baseName": JSON.stringify(AppConfig.publicPath)
    }),
    new HappyPack({
      id: "babel",
      loaders: [
        {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "usage",
                  targets: {
                    browsers: ["last 2 versions"]
                  },
                  corejs: 2
                }
              ],
              "@babel/preset-react"
            ],
            plugins: [
              [
                "@babel/transform-runtime",
                {
                  absoluteRuntime: false,
                  corejs: 2,
                  helpers: true,
                  regenerator: true,
                  useESModules: false
                }
              ],
              [
                "@babel/plugin-proposal-decorators",
                {
                  legacy: true
                }
              ],
              "@babel/plugin-proposal-class-properties",
              [
                "import",
                {
                  libraryName: "antd",
                  libraryDirectory: "es",
                  style: true // `style: true` 会加载 less 文件
                }
              ]
            ]
          }
        },
        {
          loader: "eslint-loader", // 指定启用eslint-loader
          options: {
            quiet: true
          }
        }
      ],
      threadPool: happyThreadPool,
      verbose: false
    }),
    new webpack.DllReferencePlugin({
      manifest: require("./dll/common_manifest.json"),
      context: "www.253.com"
    }),
    new webpack.DllReferencePlugin({
      manifest: require("./dll/react_manifest.json"),
      context: "www.253.com"
    }),
    new webpack.DllReferencePlugin({
      manifest: require("./dll/react_redux_manifest.json"),
      context: "www.253.com"
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  node: {
    setImmediate: false,
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty"
  }
};
