<template>
    <nav class="sidebar">
        <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group> -->
        
        <el-menu 
          :default-active="$route.path" 
          router 
          class="el-menu-vertical" 
          @open="handleOpen" 
          @close="handleClose" 
          :collapse="isCollapse">
            <!-- <h1 class="welcome">欢迎 </h1> -->
            <h1 class="system-name">医药管理系统</h1>
            <!-- <h1 class="admin-name"><span>{{$store.state.userInfo.name}}</span> 管理员</h1> -->
            <el-menu-item index="/admin/index-page">
                <i class="el-icon-s-promotion"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="/admin/medicine">
                <i class="el-icon-s-goods"></i>
                <span slot="title">药品信息</span>
            </el-menu-item>
            <el-menu-item index="/admin/dealer">
                <i class="el-icon-phone"></i>
                <span slot="title">药品经销商</span>
            </el-menu-item>
            <el-menu-item index="/admin/customer">
                <i class="el-icon-user-solid"></i>
                <span slot="title">顾客信息</span>
            </el-menu-item>
            <el-menu-item :disabled="this.identity == 0 || this.identity == 1" index="/admin/purchaser">
                <i class="el-icon-s-cooperation"></i>
                <span slot="title">采购人员</span>
            </el-menu-item>
            <el-menu-item :disabled="this.identity == 0 || this.identity == 1" index="/admin/salesman">
                <i class="el-icon-s-shop"></i>
                <span slot="title">销售人员</span>
            </el-menu-item>
            <el-menu-item index="/admin/user-info">
                <i class="el-icon-info"></i>
                <span slot="title">我的信息</span>
            </el-menu-item>
            <el-menu-item index="/help">
                <i class="el-icon-question"></i>
                <span slot="title">用户手册</span>
            </el-menu-item>
        </el-menu>
    </nav>
</template>



<script>
  export default {
    name: 'Sidebar',
    data() {
      return {
        identity: this.$store.state.userInfo.identity,
        isCollapse: false
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>
.el-menu-vertical:not(.el-menu--collapse) {
    width: 200px; 
}
.el-menu-vertical {
  height: 100vh;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  min-height: 400px;
  overflow: auto;
}
.welcome, .system-name {
    padding-left: 20px;
    margin-top: 15px;
    margin-bottom: 15px;
}
.system-name {
  color: #41b883;
  font-weight: bold;
  font-size: 18px;
}
.admin-name {
    margin-bottom: 15px;
}
.admin-name>span {
    color: mediumaquamarine;
}
</style>

