<template>
    <div class="account-form">
        <div class="account-form-container">
            <!-- <router-view></router-view> -->
            <transition name="login">
                <LoginForm v-show="isLogin===0" v-on:beRegister="beRegister"></LoginForm>
            </transition>
            <transition name="register">
                <RegisterForm v-show="isLogin===1" v-on:beLogin="beLogin"></RegisterForm>
            </transition>
            
        </div>
    </div>
</template>

<script>
import LoginForm from '@/components/account/LoginForm.vue'
import RegisterForm from '@/components/account/RegisterForm.vue'

export default {
    name: 'AccountForm',
    components: {
        LoginForm,
        RegisterForm
    },
    data() {
        return {
            isLogin: 0
        }
    },
    watch: {
        identity() {
            console.log(this.identity)
        }
    },
    methods: {
        beRegister() {
            this.isLogin = 1
            console.log(this.isLogin)
        },
        beLogin() {
            this.isLogin = 0
            console.log(this.isLogin)
        }
    }
}
</script>

<style scoped>
.account-form {
    background-color:#ffffff;
}
.account-form-container {
    width: 300px;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    overflow: hidden;
}

.login-form, .register-form {
    position: absolute;
    top: 0;
}
/*vue过渡*/
.login-enter {
    right: -300px;
}
.login-enter-active {
    transition: right 0.8s;
}
.login-enter-to {
    right: 0px;
}

.login-leave {
    left: 0px;
}
.login-leave-active {
    transition: left 0.8s;
}
.login-leave-to {
    left: -300px;
}

/*vue过渡*/ 
.register-enter {
    right: -300px;
}
.register-enter-active {
    transition: right 0.8s;
}
.register-enter-to {
    right: 0px;
}

.register-leave {
    left: 0px;
}
.register-leave-active {
    transition: left 0.8s;
}
.register-leave-to {
    left: -300px;
}
/*vue过渡*/ 
</style>