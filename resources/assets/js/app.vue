<template>
    <div id="app">
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>

</script>

<style lang="less">
    .size{
        width: 100%;
        height: 100%;
    }

    #app {
        .size;
    }
</style>