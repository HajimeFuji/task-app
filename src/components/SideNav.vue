<template>
<div class="side-nav">
    <div class="user">
        <img v-if="photoURL" :src="photoURL" alt="" class="user__img">
        <img v-else src="../assets/cat.jpg" alt="" class="user__img">
        <p v-if="userName" class="user__name">{{ userName }}</p>
        <p v-else class="user__name">ユーザー</p>
    </div>
    <nav>
        <router-link to="/" class="side-nav__link" @click="toggleSideNav">Home</router-link>
        <router-link to="/form" class="side-nav__link" @click="toggleSideNav">>Add To Do</router-link>
        <router-link to="/list" class="side-nav__link" @click="toggleSideNav">>To Do List</router-link>
    </nav>
</div>
<div class="overlay" @click="toggleSideNav"></div>

</template>

<script>
// import { computed } from '@vue/runtime-core'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
export default {
    name: 'SideNav',
    methods: {
        ...mapActions(['toggleSideNav'])
    },
    computed: {
        ...mapGetters(['userName','photoURL'])
    }
}

</script>

<style lang="scss" scoped>
.side-nav {
    background-color: #FFFFFF;
    height: 100vh;
    width: 50vw;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;

    nav {
        display: flex;
        flex-flow: column;
        row-gap: 28px;
        padding-top: 28px;
        padding-left: 20px;
    }

    &__link {
        color: #221233;
        column-gap: 28px;
        font-size: 14px;
        text-decoration: none;
    }
}

.user {
    height: 56px;
    padding-left: 20px;
    border-bottom: 1px solid rgba($color: #404040, $alpha: 0.5);
    display: flex;
    align-items: center;

    &__img {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        margin-right: 10px;
    }

    &__name {
        color: #221233;
        font-size: 14px;
    }
}

.overlay {
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba($color: #221233, $alpha: 0.5);
    z-index: 1;
}

</style>
