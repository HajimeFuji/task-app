<template>
  <div class="page-wrap">
    <div class="content">
      <h1 class="app-name">Daily To Do</h1>
      <div class="btn btn--white">
        <img src="../assets/google-logo.png" alt="" class="btn__logo">
        <p class="btn__text" @click="login">Googleアカウントでログイン</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex"

export default {
  name: 'HomeView',
  methods: {
    ...mapActions(['login'])
  }
}
</script>

<style lang="scss" scoped>

.app-name {
  color: #FFFFFF;
  font-size: 24px;
  text-align: center;
  margin-bottom: 48px;
}

.page-wrap {
  height: calc(100vh - 56px);
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 56px;
}

.btn {
  background-color: #FFFFFF;
  border-radius: 50px;
  border: none;
  height: 32px;
  width: 240px;
  display: flex;
  align-items: center;
  justify-content: center;

  &__logo {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }

  &__text {
    color: #404040;
    font-size: 14px;
    font-weight: bold;
    padding-top: 2px;
  }
}

</style>
