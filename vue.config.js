const path = require("path");

const resolve = dir => path.join(__dirname, dir);
module.exports = {
  publicPath: process.env.VUE_APP_RESOURCE_URL,
  lintOnSave: process.env.NODE_ENV !== "production",
  assetsDir: "assets",
  devServer: {
    port: 8889, // 端口号
    open: false, // 配置是否自动启动浏览器
    https: false, // 是否启用https
    proxy: {
      //代理
      "/api": {
        target: process.env.VUE_APP_SERVE_URl,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  configureWebpack: () => {},
  chainWebpack: config => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap(options => {
        // 修改它的选项...
        return options;
      });
    // 添加别名
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("static", resolve("src/static"));
    // 本地mock配置
    config.plugin("define").tap(args => {
      if (process.env.NODE_ENV === "development" && process.env.VUE_APP_MOCK_ENABLED === "false") {
        // 开发环境下如果不使用mock，就改为使用代理
        args[0]["process.env"].VUE_APP_BASE_URL = '"/api/"';
        console.log("当前使用本地代理");
      }
      return args;
    });
    if (process.env.NODE_ENV !== "development") {
      // 删除预加载
      config.plugins.delete("preload");
      config.plugins.delete("prefetch");
      // 压缩代码
      config.optimization.minimize(true);
      // 分割代码
      config.optimization.splitChunks({
        chunks: "all"
      });
    }
    // 内敛文件大小设置成100kb
    config.module
      .rule("images")
      .use("url-loader")
      .loader("url-loader")
      .tap(options =>
        Object.assign(options, {
          limit: 10240
        })
      );
  },
  css: {
    sourceMap: process.env.NODE_ENV !== "production",
    loaderOptions: {
      less: {}
    }
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "./src/assets/less/global.less")]
    }
  }
};
