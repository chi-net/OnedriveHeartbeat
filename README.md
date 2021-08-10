# OneHeartBeat

用来保持你的OneDrive API一直运行着的软件~

本软件基于nodejs与express

## 什么功能？

保护你的OneDrive等微软API可以继续运行~

由于微软的尿性，每次使用API不Refresh就会出现code失效的问题，于是我搞了个自动化程序来保活。

## 如何使用？

先使用Git或者DownloadZip等方式将源码下载下来

将config.sample.js更名为config.js后并根据config.js中的内容配置。

然后npm install安装依赖后npm start运行。

请保持软件一直运行！否则可能会出现code无法运行的情况

建议使用nvm，forever等管理软件保活。

目前是每1小时刷新一次，统一每个小时55分刷新一次。

### 目前还没测试过，不知道能不能用......

## 碰到问题怎么办？

issue里面解决！

当然也欢迎PR~

