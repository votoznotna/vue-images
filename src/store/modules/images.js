import api from '../../api/imgur';
import { router } from '../../main';

const state = {
    images: [],
    isUploading: false
};

const getters = {
    allImages: state => state.images,
    isUploading: state => state.isUploading
};

const actions = {
    async fetchImages({ rootState, commit }) {
        const { token } = rootState.auth;
        const response = await api.fetchImages(token);
        commit('setImages', response.data.data);
    },
    async uploadImages({ rootState, commit }, images) {
        // Get the access token
        const { token } = rootState.auth;
        commit('setUploading', true);
        // Call our API module to do the upload
        await api.uploadImages(images, token);

        commit('setUploading', false);

        // Redirect our user to ImageList component
        router.push('/');
    }
};

const mutations = {
    setImages: (state, images) => {
        state.images = images;
    },
    setUploading: (state, value) => {
        state.isUploading = value;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}