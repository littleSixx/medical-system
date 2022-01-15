<template>
  <div class="register-form">
        <h1 class="register-font">注册</h1>
        <form action="javascript:;">
            <div class="account-div">
                <p>账号</p>
                <el-input
                    class="account"
                    placeholder="请输入账号"
                    v-model="register_info.register_account"
                    clearable
                    autofocus
                    size="small">
                </el-input>
            </div>
            <div class="nickname-div">
                <p>昵称</p>
                <el-input
                    class="account"
                    placeholder="请输入姓名"
                    v-model="register_info.register_name"
                    clearable
                    size="small">
                </el-input>
            </div>
            <div class="password-div">
                <p>密码</p>
                <el-input
                    placeholder="请输入密码" 
                    v-model="register_info.register_password" 
                    show-password 
                    class="password"
                    size="small">
                </el-input>
            </div>
            <div class="password-div">
                <p>确认密码</p>
                <el-input
                    placeholder="请输入密码" 
                    v-model="register_info.register_password_confirm" 
                    show-password 
                    class="password"
                    size="small">
                </el-input>
            </div>
            <div class="identity-div">
                <p>身份</p>
                <el-radio v-model="register_info.identity" label="0">顾客</el-radio>
                <el-radio v-model="register_info.identity" label="1">采购</el-radio> 
                <el-radio v-model="register_info.identity" label="2">管理员</el-radio> 
            </div>
            <div class="register-btn-div">
                <el-button round @click.native="registerBtnClick" size="small">注册</el-button>
            </div>
        </form>

        <div class="login-page">
            <a class="login-link" @click="changeBtnClick">已有帐号?</a>
        </div>
  </div>
</template>

<script>
import qs from 'qs'
import {request} from '@/network/request'
export default {
    name: 'RegisterFrom',
    data() {
        return {
            register_info: {
                register_account: '',
                register_name: '',
                register_password: '',
                register_password_confirm: '',
                identity: '0'
            }
            
        }
    },
    watch: {
        registerIdentity() {
            console.log(this.identity)
        }
    },
    methods: {
        changeBtnClick() {
            this.$emit('beLogin');
        },
        registerBtnClick() {
            request({
                url: '/AddUserServlet',
                method: 'post',
                data: qs.stringify(this.register_info)
            }, res => {
                console.log(res)
                if(res.data.success === 1) {
                    window.localStorage.setItem("token",res.data.token)
                    window.localStorage.setItem("userInfo",JSON.stringify(res.data))
                    this.$store.commit('setUserInfo')
                    // console.log("token为："+res.data.token)
                    this.$router.push('/admin/index-page')
                } else if(res.data.success === 0) {
                    window.alert("注册失败，已存在该用户")
                }
            })
        },
    }
}
</script>

<style scoped>
.register-form {
    background-color:#ffffff;
    height: 100%;
    width: 300px;
    margin-left: auto;
    margin-right: auto;
}

form>div>p {
    font-size: 14px;
    color: #cccccc;
    margin-bottom: 5px;
}
form>div, .login-page {
    width: 230px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 13px;
}
input {
    border: none;
    border-bottom: 1px solid #cccccc;
}
.register-btn-div {
    text-align: center;
}
.register-btn {
    width: 100px;
}
h1.register-font {
    width: 230px;
    font-size: 24px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 25px;
}

.login-link {
    color: #6a8b58;
    transition: all 0.2s;
}
.login-link:hover {
    color: #a4c4b5;
    text-underline-offset: 3px;
    text-decoration: underline #676179;
}
.login-page {
    text-align: right;
}
</style>