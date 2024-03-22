<script setup>
import Nav from "./components/nav/Nav.vue";
import Footer from "./components/footer/Footer.vue";
import Bottoms from "./components/bottoms/Bottoms.vue"
import { onMounted, ref } from "vue";

const loading = ref(true);

onMounted(() => {
    setTimeout(() => {
        loading.value = false;
    }, 1000);
    return loading;
});
</script>
<template>
    <div class="loader__div" v-if="loading">
        <div class="loader"></div>
    </div>
    <div class="wrapper" v-else>
        <Nav />
        <RouterView />
        <Footer />
        <Bottoms/>
    </div>
</template>

<style scoped>
.loader__div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100dvh;
}
.loader {
    width: 100px;
    aspect-ratio: 1;
    display: grid;
    border-radius: 50%;
    background: linear-gradient(0deg, rgb(0 0 0/50%) 30%, #0000 0 70%, rgb(0 0 0/100%) 0) 50%/8% 100%, linear-gradient(90deg, rgb(0 0 0/25%) 30%, #0000 0 70%, rgb(0 0 0/75%) 0) 50%/100% 8%;
    background-repeat: no-repeat;
    animation: l23 1s infinite steps(12);
}
.loader::before,
.loader::after {
    content: "";
    grid-area: 1/1;
    border-radius: 50%;
    background: inherit;
    opacity: 0.915;
    transform: rotate(30deg);
}
.loader::after {
    opacity: 0.83;
    transform: rotate(60deg);
}
@keyframes l23 {
    100% {
        transform: rotate(1turn);
    }
}
.fixed {
    position: fixed;
    top: 30px;
    right: 300px;
    z-index: -1;
    width: 340px;
    height: 120px;
    border: 1px solid black;
    background: #fff;
    opacity: 0;
    transform: translateX(100px);
    transition: 0.5s;
}

.fixed.active {
    opacity: 1;
    transform: translateX(0);
    z-index: 10;
}
</style>
