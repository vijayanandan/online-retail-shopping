<template>
    <div>
        <div class="position-relative dataTable-wrapper">
            <div v-if="isLoading">
                <div class="overlay-loader"></div>
                <b-spinner size="50px" class="dataTable-loader m-auto"></b-spinner>
            </div>
        </div>
    </div>
    </template>
    
    <script>
    import Vue from "vue";
    import BootstrapVue from "bootstrap-vue";
    Vue.use(BootstrapVue);
    export default {
        props: ['isLoading']
    };
    </script>
    