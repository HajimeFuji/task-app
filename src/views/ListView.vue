<template>
<div class="page-wrap">
    <h1 class="app-name">To Do List</h1>
    <router-link to="/form" class="to-form" v-if="taskCheck">You can add task here</router-link>
    <div class="list-wrap">
        <div class="list" v-for="task in tasks" :key="task.task">
            <h2 class="list-title">{{ task.title }}</h2>
            <div class="list-time">
                <fa class="fa-clock" :icon="['far','clock']" />
                <p class="list-time__text">{{ task.start }}<span> - </span>{{ task.end }}</p>
            </div>
            <router-link :to="{ name: 'form' ,params: {'task_id': task.id}}">
                <fa class="fa-pen" :icon="['fas','pen']" />
            </router-link>
            <fa @click="deleteCheck(task.id)" class="fa-trash" :icon="['fas','trash-can']" />
        </div>
    </div>
</div>

</template>

<script>
import { mapActions } from "vuex"
export default {
    name: 'ListView',
    created(){
        // store内のindex.js/stateからデータtasks[]をとってくる
        this.tasks = this.$store.state.tasks
    },
    data(){
        return{
            tasks: []
        }
    },
    methods: {
        deleteCheck(id) {
            if(confirm('Do you really want to delete this task?')) {
                this.deleteTask(id)
            }
        },

        ...mapActions(['deleteTask'])
    },
    computed: {
        taskCheck(){
            return this.tasks.length === 0
        }
    }
}

</script>

<style lang="scss" scoped>
.page-wrap {
    padding-top: 48px;
    padding-bottom: 72px;
}

.app-name {
    color: #FFFFFF;
    font-size: 24px;
    text-align: center;
    margin-bottom: 36px;
}

.to-form {
    color: #FFFFFF;
    display: block;
    font-size: 18px;
    text-align: center;
}

.list-wrap {
    display: flex;
    flex-flow: column;
    row-gap: 24px;
}

.list {
    background-color: #FFFFFF;
    border-radius: 2px;
    height: 80px;
    width: 300px;
    margin: 0 auto;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    position: relative;

    &-title {
        color: #221233;
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        margin-bottom: 24px;
    }

    &-time {
        display: flex;
        align-items: center;
        justify-content: center;

        &__text {
            font-size: 14px;
            font-weight: bold;
        }
    }
}

.fa-clock {
    margin-right: 4px;
}

.fa-pen {
    position: absolute;
    top: 14px;
    right: 14px;
}

.fa-trash {
    position: absolute;
    bottom: 14px;
    right: 14px;
}

a {
    color: inherit;
}

</style>
