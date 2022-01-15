<template>
    <div class="account-container">
        <div class="left-image"></div>
        <AccountForm></AccountForm>
    </div>
</template>

<script>
import AccountForm from '@/components/account/AccountForm'

export default {
    name: 'AccountContainer',
    data() {
        return {
            // isLogin: true
        }
    },
    components: {
        AccountForm,

    }
}
</script>

<style scoped>
.left-image, .account-form {
    width: 350px;
    height: 500px;
    float: left;
}
.left-image {
    background-color: lightpink;
    background-image: url('../../assets/image/0912225fe500f343c06f819722926176a9e21d06.jpg');
    background-size: 100% 100%;
    background-repeat: no-repeat;
}

</style>