<template>
    <div v-if="isLoggedIn" class="image-container">
        <img v-for="image in allImages" v-bind:key="image.id" :src="image.link" />
    </div>
    <h2 v-else>Log in to get started!</h2>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'ImageList',
    computed: mapGetters(['allImages', 'isLoggedIn']),
    methods: mapActions(['fetchImages']),
    created(){
        this.fetchImages();
    }
}
</script>

<style scoped>
.image-container {
    column-count: 3;
    column-gap: 0;
}
img {
    max-width: 100%;
    padding: 5px;
    animation-name: fadeInOut;
    animation-duration: 1s;
}
@keyframes fadeInOut {
    0% {
        opacity:0;
    }
    25% {
        opacity:0.25;
    }
    50% {
        opacity:0.5;
    }
    75% {
        opacity:0.75;
    }
    100% {
        opacity:1;
    }
}
</style>