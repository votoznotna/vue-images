<template>
    <div v-if="isUploading" class="spinning-bar" >
        <div class="ui active centered inline loader"></div>
    </div>
    <div v-else class="dropper">
        <input 
            type="file" 
            @change="uploadImages($event.target.files)"
            multiple
            accept="image/*"
        />
        <span>Drag files here!</span>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'UploadForm',
    computed: mapGetters(['isUploading']),
    methods: mapActions(['uploadImages'])
}
</script>

<style scoped>
    .spinning-bar {
        height: 30vh;
        border: 2px dashed black;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .dropper {
        height: 30vh;
        border: 2px dashed black;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }
    .dropper:hover {
        background-color: #eee;
    }
    input {
        height: 30vh;
        width: 100%;
        position: absolute;
        opacity: 0;
    }
</style>