<template>
  <div class="LoginForm">
        <h1 class="supermarket">医药管理信息系统</h1>
        <h1 class="welcome">欢迎使用~</h1>
        <form action="javascript:;">
            <div class="account-div">
                <p>账号</p>
                <el-input
                    class="account"
                    placeholder="请输入账号"
                    v-model="loginAccount"
                    clearable
                    autofocus
                    size="small">
                </el-input>
            </div>
            <div class="password-div">
                <p>密码</p>
                <el-input
                    placeholder="请输入密码" 
                    v-model="loginPassword"
                    show-password
                    class="password"
                    size="small"
                    @keydown.enter.native="loginBtnClick">
                </el-input>
            </div>
            <div class="identity-div">
                <p>身份</p>
                <el-radio v-model="loginIdentity" label="0">采购 </el-radio>
                <el-radio v-model="loginIdentity" label="1">销售</el-radio> 
                <el-radio v-model="loginIdentity" label="2">管理员</el-radio> 
            </div>
            <div class="login-btn-div">
                <el-button round class="login-btn" size="small" @click="loginBtnClick">登录</el-button>
            </div>
        </form>
        <div class="create-account">
            <a class="create-link" @click="registerBtnClick">注册</a>
        </div>
  </div>
</template>

<script>
import qs from 'qs'
import {request} from '@/network/request.js'

export default {
    name: 'LoginForm',
    data() {
        return {
            loginAccount: '',
            loginPassword: '',
            loginIdentity: '2'
        }
    },
    methods: {
        registerBtnClick() {
            this.$emit('beRegister')
        },
        loginBtnClick() {
            let data = {
                loginAccount: this.loginAccount,
                loginPassword: this.loginPassword,
                loginIdentity: this.loginIdentity
            }
            console.log(qs.stringify(data))
            request({
                url: '/UserLoginServlet',
                method: 'post',
                data: qs.stringify(data)
            }, res => {
                console.log("登陆成功")
                console.log(res)
                if(res.data.success === 1) {
                    window.localStorage.setItem("token",res.data.token)
                    window.localStorage.setItem("userInfo",JSON.stringify(res.data))
                    this.$store.commit('setUserInfo')
                    // console.log("token为："+res.data.token)
                    this.$router.push('/admin/index-page')
                }
                else if(res.data.success === 0) {
                    window.alert("账号、密码或身份错误")
                }

            }, err => {
                console.log(err)
                window.alert("出错啦")
            })
        }
    }
}
</script>

<style scoped>
.login-form {
    position: absolute;
}
form>div>p {
    font-size: 14px;
    color: #cccccc;
    margin-bottom: 5px;
}
form>div, .create-account {
    width: 230px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
}
input {
    border: none;
    border-bottom: 1px solid #cccccc;
}
.login-btn-div {
    text-align: center;
}
.login-btn {
    width: 100px;
}
h1.supermarket {
    width: 230px;
    font-size: 24px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 40px;
}
h1.welcome {
    width: 230px;
    font-size: 16px;
    margin-left: auto;
    margin-right: auto;    
    margin-top: 10px;
    color: #c0c4cc;
}
.create-link {
    color: #6a8b58;
    transition: all 0.2s;
}
.create-link:hover {
    color: #a4c4b5;
    text-underline-offset: 3px;
    text-decoration: underline #676179;
}
.create-account {
    text-align: right;
}
</style>