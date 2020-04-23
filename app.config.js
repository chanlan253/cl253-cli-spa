module.exports = {
  title: "智能云平台",
  publicPath: "<%= appName %>", //根目录名称
  port: 9001,
  autoOpen: false, //启动本地是否自动重启,默认不启动
  alias: {}, //目录别名如"@"表示src目录,"components"表示src/components目录，"pages"表示src/pages,"assets"表示src/assets
  analyzer: false,
  proxy: {
    "/api": "http://localhost:3000" //跨域请求重写
  }
};
