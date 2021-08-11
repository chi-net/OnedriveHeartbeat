module.exports={
    endpointurl:"",//Azure里面 终结点 OAuth 2.0 令牌终结点(v2)
    client_secret:"",//自己创建的用户令牌里面的值
    client_id:"",//自己的应用程序ID
    redirect_url:"",//自己设置的回调URL
    code:"",//回调URL上面的code
    port:4837,//监听端口 
    auth:{
        enabled:true,//true 需要鉴权(强烈推荐) false 不需要鉴权
        token:"",//获取API鉴权时所用的Token,自己随便填
        /*
        Token加签方式
        JSON
        {
            "token":你设置的token(注意要加引号),
            "time":与你传入的UnixTime要相一致.(必须为字符串)
        }
        然后再将JSON串MD5后当Token发送.
        我们会比较你传入的Unix时间与本机的Unix时间,如果时间相差5s以上,则不通过鉴权.
        */        
    }

}
/*
具体不知道OneDrive API的可以看这篇文章:
https://moekonnyaku.com/msapi-dl-1drv/
 */