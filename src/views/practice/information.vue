<template>
    <div style="text-align:center;border:1px solid black; width:400px;height:500px;" >
    <form >
        <br><br>
        <span>昵称:&nbsp</span><input type="text" v-model="form.customerName" ><br><br>
        <span>邮箱:&nbsp</span><input type="text" v-model="form.email" ><br><br>
        <button align="center" type="button" @click="update">修改个人信息</button>
        <button align="center" type="button" @click="Show">密码修改</button>
    </form>

    <br>
    <div v-if="isShow">
        <div><span>请输入您之前的密码</span>
            &nbsp &nbsp
            <input type="text" v-model="pw" >
        </div>
        <br>
        <div v-if="pw==form.password">
            <div><span>请输入您修改后的密码</span>
                &nbsp
                <input type="text" v-model="pw2" >
            </div>
        </div>
        <div v-if="pw!=form.password">
            <div>当前输入的密码不正确!</div>
        </div>
        <button align="center" type="button" @click="changePassword">点击修改密码</button>
    </div>
    <div style="font-size:12px;"><strong>备注</strong>:昵称修改后请使用昵称进行登录,如果需要更改您在教务系统中的真实姓名,请联系老师/教务进行处理</div>
</div>

  </template>
  
  <script>
  import request from "@/utils/request";
  
  export default {
    name: "information",
    data(){
      return{
        form:{
          customerName: "",
          password: "",
          customerId:"",
          loginCount:"",
          lastLoginTime:"",
          customerTypeId:1,
          email:"",
        },
        isShow:false,
        pw:"",
        pw2:""
      }
    },
    created(){
      this.loadUp();
    },
    methods:{
        Show(){
            this.isShow=true;
        },
      loadUp(){
        let res=sessionStorage.getItem("user");//先行获取这个对象
        this.form=JSON.parse(res);//重新变成一个json对象
      },
      update(){ //更新方法写成这样即可
          request.put("http://localhost:9090/customer/update",this.form).then(res => {
            if(res.code === 200){
              this.$message({//问题就在于这里面设置的正常返回值应该是整数200
                type:"success",
                message:"修改成功"
              })
            }else{
              this.$message({
                type:"error",
                message: "修改失败"
              })
            }
          });
      },
      changePassword(){
        this.form.password=this.pw2;
        this.update();
      }
    }
  }
  </script>
  
  <style scoped>
  input{
            height:40px;
            width:120px;
            border-radius:10px;
        }
        button{
            border:1px solid white;
            background:rgba(99,255,231,0.4);
            height:40px;
            width:160px;
            border-radius:10px;
        }
  
  </style>