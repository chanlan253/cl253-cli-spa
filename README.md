# 脚手架-独立React项目

## 安装
**步骤一：**使用脚手架命令：`npx cl253-cli init project`
初始化项目，建立目录名为project的文件夹目录

**步骤二：**根据提示语选择项目类型，**「独立React项目」**

**步骤三：**进入project目录，安装依赖包`npm install`或`yarn install`或者采用淘宝镜像`cnpm install`

**步骤四：**本地启动项目：`npm run dev`

![image.png](https://cdn.nlark.com/yuque/0/2020/png/741245/1578968089718-f8ced520-d7fd-4bce-97c2-77ea9ccdab74.png#align=left&display=inline&height=174&name=image.png&originHeight=348&originWidth=872&size=79856&status=done&style=none&width=436)

## 文件目录说明
config //webpack相关配置，一般不需要更改
┣ webpack.base.js //项目公共配置
┣ webpack.dev.js//项目本地配置
┣ webpack.pro.js //项目打包配置
dll //公共依赖包提取文件目录，与OSS静态资源对应，并把公共文件映射index.html上了，json文件用于配置
┣ common.dll.js //提取包里包含axios，moment
┣ react.dll.js //包含"react", "react-dom", "react-router-dom"
┣ react_redux.dll.js //包含"redux", "react-redux"
src //项目主要开发目录
 ┣ assets //静态资源目录，「该资源里.less不会被hash值编译，处理全局覆盖css特别方便」
 ┣ components //自定义组件库
 ┣ plugins //自定义插件库
 ┣ page //自定义路由页面组件
 ┣ redux //redux配置目录
 ┣ router //路由配置目录
 ┣ index.html  //模板文件
 ┣ main.js  //入口文件
app.config.js //项目简单配置目录，详情请看下面配置说明
.eslintrc.js //项目代码格式化规范
package.json //依赖包配置项

## package.json 说明

```json
 "scripts": {
    "lint": "eslint --quiet --no-inline-config  src/",
    "lint-fix": "eslint --quiet --fix src/",
    "dev": "cross-env NODE_ENV=development webpack-dev-server --config config/webpack.dev.js  --progress",
    "build": "cross-env NODE_ENV=production npx webpack --config config/webpack.pro.js -p --progress"
  },
```

可以通过`lint`和`lint-fix `格式化和美化代码
命令`dev`和`build`分别表示本地开发和打包名


## app.config.js 说明

```json
module.exports = {
  title: "创蓝智能云平台",
  publicPath: "/app1", //根目录名称
  port: 9000,
  autoOpen: false, //启动本地是否自动重启,默认不启动
  alias: {}, //目录别名如"@"表示src目录,"components"表示src/components目录，"pages"表示src/pages,"assets"表示src/assets
  proxy: {
    "/api": "http://localhost:3000" //跨域请求重写
  }
};
```

