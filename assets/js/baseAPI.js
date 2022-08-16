$.ajaxPrefilter(function(options){
    //设置统一根路径
    options.url='http://www.liulongbin.top:3007'+options.url;
    if(options.url.indexOf('/my/')){
        //为有权限的接口设置统一headers
    options.headers={Authorization: localStorage.getItem('token')|| ''}}
    //同一挂载complete
    options.complete=function(res){
        //无论请求是否成功，都会调用complete函数
        if(res.responseJSON.status==1 && res.responseJSON.message  === '身份认证失败！')
        {
            //清空本地会话token
            localStorage.removeItem('token');
            //跳转login.html
            location.href='login.html';
        }

    }
})