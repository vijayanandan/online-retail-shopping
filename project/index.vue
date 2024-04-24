<template>
    <div class="d-flex justify-content-center align-items-center vh-100 home_page_banner">
        <b-card-group deck>
            <nuxt-link class="mr-2 action-icon-btn" to="productShopping"
                v-b-tooltip.hover="{ customClass: 'custom-tooltip' }" title="Product List">
                <b-card title=" Product Shopping">
                </b-card>
            </nuxt-link>
            <nuxt-link class="mr-2 action-icon-btn" to="ProductSeller"
                v-b-tooltip.hover="{ customClass: 'custom-tooltip' }" title="Product Seller">
                <b-card title="Product Seller">
                </b-card>
            </nuxt-link>
        </b-card-group>
    </div>
</template>
<script>
export default {
    name : "ProjectIndex",
    layout : function({store}){
        let applayout = 'default'
        return applayout;
    },
    data() {
        return {
        };
    },
}
</script>

