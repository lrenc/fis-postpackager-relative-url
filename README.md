# fis-postpackager-relative-url

将css中引用的资源地址统一修改为相对路径的[FIS](https://github.com/fex-team/fis/)插件

## 背景

 - 百度统一引入CDN机器，然而https需在路径后加上一个id戳，因此绝对路径的引用方式将会出现一些问题。

## 功能

 - 自动将css中引用的@import、图片、字体地址转换为相对路径

## 用法

    $ npm install -g fis-postpackager-relative-url
    $ vi workspace/fis-conf.js #编辑项目配置文件

```javascript

//file : workspace/fis-conf.js

fis.config.set('modules.postpackager', 'relative-url');
fis.config.set('settings.postpackager.relative-url', {
    // settings
});

```