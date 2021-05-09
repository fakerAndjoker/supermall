<template>
  <div class="user">
    <div class="account">
      <div class="head">
        <img src="~assets/img/profile/avatar.svg" alt="">
      </div>
      <div class="login">
        <div>登录/注册</div>
        <div class="phone">
          <div>
            <img src="~assets/img/profile/phone.svg" alt="">
          </div>
          <div>暂无绑定手机号</div>
        </div>
      </div>
      <div class="arrow-left">
        <img src="~assets/img/common/arrow-left.svg" alt="">
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "User"
  }
</script>

<style scoped>
  .user {
    background-color: var(--color-tint);
  }

  .account {
    display: flex;
    height: 90px;
    align-items: center;
  }

  .head {
    margin-left: 10px;
  }

  .head img {
    width: 60px;
    height: 60px;
  }

  .login {
    margin-left: 10px;
    color: white;
  }

  .phone {
    display: flex;
    text-align: center;
    align-items: center;
    font-size: 14px;
  }

  .phone img {
    width: 24px;
    height: 30px;
    margin-left: -8px;
  }

  .arrow-left {
    text-align: right;
    flex: 1;
    margin-right: 10px;
  }

  .arrow-left img {
    width: 20px;
    height: 30px;
  }
</style>
