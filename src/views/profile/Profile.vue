<template>
  <div class="profile">
    <nav-bar class="profileNav">
      <template v-slot:center>
        <div>贫道法号乱来</div>
      </template>
    </nav-bar>
    <user></user>
    <div class="account">
      <div class="balance">
        <div>
          <span class="number">0.00</span>
          <span>元</span>
        </div>
        <div class="name">我的余额</div>
      </div>
      <div class="discount">
        <div>
          <span class="number">0</span>
          <span>个</span>
        </div>
        <div class="name">我的优惠</div>
      </div>
      <div class="integral lastItem">
        <div>
          <span class="number">0</span>
          <span>分</span>
        </div>
        <div class="name">我的积分</div>
      </div>
    </div>
    <div class="function">
      <profile-navigation>
        <template slot="img">
          <img src="~assets/img/profile/message.svg" alt="">
        </template>
        <template slot="title">
          <div>我的消息</div>
        </template>
      </profile-navigation>
      <profile-navigation>
        <template slot="img">
          <img src="~assets/img/profile/shopping.svg" alt="">
        </template>
        <template slot="title">
          <div>积分商城</div>
        </template>
      </profile-navigation>
      <profile-navigation>
        <template slot="img">
          <img src="~assets/img/profile/vip.svg" alt="">
        </template>
        <template slot="title">
          <div>会员卡</div>
        </template>
      </profile-navigation>
      <profile-navigation>
        <template slot="img">
          <img src="~assets/img/profile/cart.svg" alt="">
        </template>
        <template slot="title">
          <div>我的购物车</div>
        </template>
      </profile-navigation>
      <profile-navigation>
        <template slot="img">
          <img src="~assets/img/profile/pointer.svg" alt="">
        </template>
        <template slot="title">
          <div>下载购物APP</div>
        </template>
      </profile-navigation>
    </div>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import User from "./childComponents/User";
  import ProfileNavigation from "./childComponents/ProfileNavigation";

  export default {
    name: "Profile",
    components: {
      NavBar,
      User,
      ProfileNavigation
    }
  }
</script>

<style scoped>
  .profile {

  }

  .profileNav {
    background-color: var(--color-tint);
    font-size: 18px;
    color: white;
    box-shadow: 0 1px 1px rgba(242,242,242, 1);
  }

  .account {
    display: flex;
    border-bottom: 15px solid rgb(242, 242, 242);
  }

  .account > div {
    flex: 1;
    text-align: center;
    padding: 15px;
    border-right: 2px solid rgb(242, 242, 242);
  }

  .account .lastItem {
    border-right: none;
  }

  .account span {
    font-size: 12px;
  }

  .account .number {
    color: red;
    font-weight: bolder;
    font-size: 22px;
  }

  .account .name {
    font-size: 14px;
  }

  .function img {
    width: 35px;
    height: 44px;

  }
</style>
