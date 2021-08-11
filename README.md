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

运行了之后直接打出一大段access_token与refresh_token。出问题的解决还没写好吧.....

现在是运行先生成一次access_token，然后每59分钟保活一次。

### 亲测可用！续命可以成功。

## 碰到问题怎么办？

issue里面解决！

当然也欢迎PR~

### 请勿删除tmp文件夹，否则会报错！！！！！

# 我们使用了什么module？

request 发送请求

express 网络服务

node-cron 定时任务

