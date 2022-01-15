<template>
  <div class="account">
      <div class="background"></div>
      <AccountContainer></AccountContainer>
  </div>
</template>

<script>
import AccountContainer from '@/components/account/AccountContainer'

export default {
    name: 'Account',
    components: {
        AccountContainer,

    }
}
</script>

<style scoped>
.account {
    position: relative;
    width: 100%;
    height: 100vh;
    background-color: #ebe3e0;
}
.account .background {
    width: 100%;
    height: 100%;
    background: url('../assets/image/b0b178a13b4df2109e4f812acdbd237c20711b35.png') no-repeat;
    filter: blur(5px) grayscale(30%);
    background-size: 100% 100%;
}
.account-container {
    position: absolute;
    width: 700px;
    height: 500px;
    /* border-radius: 4px; */
    background-color: lightgreen;
    left: calc(50% - 350px);
    top: calc(50% - 250px);
    /* overflow: hidden; */
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}

</style>