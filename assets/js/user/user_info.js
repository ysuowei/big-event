$(function(){
    
    var form = layui.form;
  var layer = layui.layer;
    layui.form.verify({
        nickname:function(value, item){
            if(value.length<0||value.length>7){
                return '昵称长度为1~6'
            }
        }
    })
    function inituserinfo(){
        $.ajax({
            method:'GET', 
            url:'/my/userinfo',
            success: function(res){
                //console.log(res);
                if(res.status!==0){return '获取用户信息失败'}
                /*$('#username').val(res.data.username);
                $('#nickname').val(res.data.nickname || '');
                $('#email').val(res.data.email || '');*/

                
                //渲染用户信息
               form.val('formUserInfo', res.data);
            }
        })
    }
    inituserinfo();
    $('#reset').on('click', function(e){
        e.preventDefault();
        inituserinfo();
    })
    $('#form_Btn').on('click', function(e){
        e.preventDefault();
       // console.log(123);
        $.ajax({
            method: 'POST',
            url:'/my/userinfo',
            
            data: $(this).serialize(),
            success: function(res){
                if(res.status!==0){return layer.msg('用户信息更新失败')}
                layer.msg('用户信息更新成功');
                
               // console.log(123);
                //inituserinfo()
                windon.parent.getuserinfo()
                console.log(res);
                
            }
        })
        
    })
})