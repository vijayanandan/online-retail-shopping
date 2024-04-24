<template>
    <div class="shoppingLayout">
        <div class="page-wraper">
            <div class="w-100">
                <!-- <retail-header></retail-header> -->
                <div v-bind:class="{ 'app-main showSidebar': (menuList.length > 0) }">
                    <retail-sidebar></retail-sidebar>
                    <div>
                        <nuxt :class="['ndc-wrapper']" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
 const retailHeader = () => import('../components/scaffolds/retailHeader.vue');
 const retailSidebar = () => import('../components/scaffolds/retailSidebar.vue');

export default {
    name: 'shoppingLayout',
    components: {
        retailHeader,
        retailSidebar
    },
    computed:{
        menuList : function(){
            return this.$store.getters.getMenuData;
        }
    }
  
}
</script>
