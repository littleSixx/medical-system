<template>
  <div class="admin">
      <Sidebar></Sidebar>
      <Header></Header>
      <PageHeader></PageHeader>
      
      <div class="container clearfix">
          <router-view></router-view>
      </div>
      
  </div>
</template>

<script>
import Sidebar from '@/components/admin/Sidebar.vue'
import PageHeader from '@/components/PageHeader'
import Header from '@/components/Header'

export default {
    name: 'Admin',
    components: {
        Sidebar,
        PageHeader,
        Header
    },
    methods: {
        
    }
}
</script>

<style scoped>
.admin {
    /* position: relative; */
}
.admin .sidebar {
    /* position: absolute; */
    position: fixed;
    z-index: 2;
    top: 0px;
    left: 0px;
}
.admin .container {
    margin-left: 230px;
    margin-right: 5%;
    min-width: 500px;
    /* margin-right: 230px; */
    /* width: 1100px; */
    
    /* background-color: mistyrose; */
}

</style>