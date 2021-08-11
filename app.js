const express=require('express');
const request=require('request');
const cron=require('node-cron');
const config=require('./config');
const fs=require('fs');
var access_token;
var refresh_token;
var app=express();
app.get('/',function(req,res){
    res.status=403;
    res.end("<h4>403 Forbidden.</h1>")
});
function isFileExisted(path_way) {
    return new Promise((resolve, reject) => {
      fs.access(path_way, (err) => {
        if (err) {
          fs.appendFileSync(path_way, '{"data":[],"total":0}', 'utf-8', (err) => {
            if (err) {
              return console.log('该文件不存在，重新创建失败！')
            }
            console.log("文件不存在，已新创建");
          });
          reject(false);
        } else {
          resolve(true);
        }
      })
    })
  };
// cron.schedule("* * * * *",function(){

// })
if((isFileExisted("./tmp/first"))){
    request({
        url: config.endpointurl,
        method: "POST",//请求方式，默认为get
        headers: {//设置请求头
            "content-type": "x-www-form-urlencoded",
        },
        form: {
            "client_id":config.client_id,
            "client_secret":config.client_secret,
            "redirect_uri":config.redirect_url,
            "code":config.code,
            "grant_type":"authorization_code",
            // "response_type":"code",
        },
        json: true 
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body.access_token);
            access_token=body.access_token;
            console.log(body.refresh_token);
            refresh_token=body.refresh_token;
        }else{
            console.log("NO FIRST")
            console.log(body);
        }
    });            
}
cron.schedule("*/59 * * * *",function(){
    console.log("EXECUSED")
        request({
            url: config.endpointurl,
            method: "POST",//请求方式，默认为get
            headers: {//设置请求头
                "content-type": "x-www-form-urlencoded",
            },
            form: {
                "client_id":config.client_id,
                "client_secret":config.client_secret,
                "redirect_uri":config.redirect_url,
                "code":config.code,
                "grant_type":"refresh_token",
                "refresh_token":refresh_token,
                // "response_type":"code",
            },
            json: true 
        }, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body.access_token);
                access_token=body.access_token;
                console.log(body.refresh_token);
                refresh_token=body.refresh_token;
            }else{
                console.log("FIRST");
                console.log(body);
            }
        });  
});
app.listen(4837);