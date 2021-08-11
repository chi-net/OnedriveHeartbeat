const express=require('express');
const request=require('request');
const cron=require('node-cron');
// const crypto=require('crypto');
const md5=require('md5');
const config=require('./config');
const fs=require('fs');
// var md5 = crypto.createHash('md5');
// var md52=crypto.createHash('md5');
var access_token;
var refresh_token;
var app=express();
if(config.cors.enabled){
    console.log("[信息]CORS跨域问题解决已经开启");
    console.log("允许的域名："+config.cors.website);
    app.options("*",function(req,res,next){
        res.append('Access-Control-Allow-Origin',config.cors.website);
        res.append("Access-Control-Allow-Methods","GET,POST,OPTIONS,PUT,DELETE");
        res.append("Access-Control-Allow-Headers","*");
        res.append("Access-Control-Max-Age",1728000);
        res.status(204);
        res.end("");
        next();
    });    
    app.get("*",function(req,res,next){
        res.append('Access-Control-Allow-Origin',config.cors.website);
        next();
    })
}

app.get('/',function(req,res){
    res.status=403;
    res.end("<h4>403 Forbidden.</h1>")
});
function jq(utime,token){
    if(((Math.round(new Date().getTime()/1000)-utime)<5)){
        // console.log("in 5s:");
        var authtoken=md5(JSON.stringify({"token":config.auth.token,"time":utime}));
        console.log(JSON.stringify({"token":config.auth.token,"time":utime}))
        // console.log(token);
        // console.log(authtoken);
        // console.log(token==authtoken);
        // console.l
        // og(authtoken);
        // console.log(md5.update(JSON.stringify({"token":config.auth.token,"time":utime})).digest('hex'))
        if(authtoken==token){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}
app.get('/api/getaccesstoken',function(req,res){
    if(config.auth.enabled){
        if(jq(req.query.time,req.query.token)){
            res.end(JSON.stringify({"status":200,"access_token":access_token}));
            console.log(new Date());
            console.log("API鉴权:成功!");
        }else{
            res.status(401);
            res.end(JSON.stringify({"status":401,"error":"failed to auth your identity"}));
            console.log(new Date());
            console.log("API鉴权:用户鉴权失败!");
        }
    }else{
        res.end(JSON.stringify({"status":200,"access_token":access_token}));
        console.log(new Date());
        console.log("API无 鉴权:成功!");
    }
})
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
            // console.log(body.access_token);
            access_token=body.access_token;
            // console.log(body.refresh_token);
            refresh_token=body.refresh_token;
            console.log(new Date());
            console.log("初始鉴权成功!");
        }else{
            // console.log("NO FIRST")
            console.log(new Date());
            console.log("初始鉴权失败!");
            console.log(body);
        }
    });            
}
cron.schedule("*/59 * * * *",function(){
    // console.log("EXEUSED")
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
                // console.log(body.access_token);
                access_token=body.access_token;
                // console.log(body.refresh_token);
                refresh_token=body.refresh_token;
                console.log(new Date());
                console.log("续命成功!");
            }else{
                // console.log("FIRST");
                console.log(new Date());
                console.log("续命失败!");
                console.log(body);
            }
        });  
});
app.listen(config.port);