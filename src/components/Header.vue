<template>
  <div class="Header">
      <div class="header-content">
          <h1 class="welcome">欢迎 {{$store.state.userInfo.name}}</h1>
          <div class="user-area"><!--整个用户范围-->
              <div class="user-avatar"><!--整个用户范围-->
                <div class="avatar-content"><!--用于实现移入显示功能-->
                  <div class="avatar"><!--图标范围-->
                      <i class="el-icon-user"></i>
                  </div>
                  <div class="avatar-info">
                      <div class="user-account"><span><i>账号：</i><i>{{getAccount()}}</i></span></div>
                      <div class="user-identity"><span><i>身份：</i><i>{{getIdentity()}}</i></span></div>
                      <div class="login-out"><a @click="loginOutClick()">退出登录</a></div>
                  </div>
                </div>
                
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'Header',
    methods: {
        getIdentity() {
            if(this.$store.state.userInfo.identity === 0) {
                return "采购"
            }
            else if(this.$store.state.userInfo.identity === 1) {
                return "销售"
            }
            else if(this.$store.state.userInfo.identity === 2) {
                return "管理员"
            }
        },
        getAccount() {
            if(this.$store.state.userInfo.identity === 0) {
                return this.$store.state.userInfo.purchaser_account;
            }
            else if(this.$store.state.userInfo.identity === 1) {
                return this.$store.state.userInfo.salesman_account;
            }
            else if(this.$store.state.userInfo.identity === 2) {
                return this.$store.state.userInfo.admin_account;
            }
            
        },
        loginOutClick() {
            // this.$state.userInfo = null
            window.localStorage.removeItem("token")
            this.$store.commit('loginOut')
            this.$router.push('/account')
        }
    }
}
</script>

<style scoped>
.header-content {
    height: 55px;
    background-color: #304156;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    position: relative;
}
.welcome {
    position: absolute;
    font-size: 20px;
    color: #fffff8;
    margin-left: 210px;

}
.avatar-content {
    height: 55px;
}

.avatar {
    box-sizing: border-box;
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 2px solid #fffff8;
    border-radius: 50%;
    margin-top: 12px;
    line-height: 30px;
    transition: all 0.2s;
}
.avatar-content:hover .avatar{
    margin-top: 24px;
}

.user-area {
    position: absolute;
    right: 7%;
    top: 0%;
    text-align: center;
}
.el-icon-user:before {/* 控制icon大小 */
    font-size: 18px;
    color: #fffff8;
}

.user-avatar {
    position: relative;
}
.avatar-info {
    position: absolute;
    width: 150px;
    height: 0px;
    opacity: 0;
    background-image: linear-gradient(-45deg, white, #f3f7fa, #fcf7f6);
    left: calc(-75px + 15px);
    top: 55px;
    border-radius: 7px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    transition: all 0.2s;
    padding-top: 20px;
    padding-left: 10px;
    padding-right: 10px;
    text-align: center;
    z-index: 10;


}
.avatar-content:hover .avatar-info {
    height: 120px;
    opacity: 1;
    
}

.avatar-info > div{
    opacity: 0;
    margin-top: 10px;
    margin-bottom: 10px;
    transition: all 0.4s;
}
.avatar-content:hover .avatar-info > div {
    opacity: 1;
}

.user-account span, .user-identity span {
    width: 120px;
    text-overflow: ellipsis;
    white-space: normal;
    font-weight: 600;
}

.login-out a {
    font-weight: 600;
    color: #41b883;
}
</style>