<template>
    <div class="main_content_warp">
        <div class="title button-color">
            <h2>{{ this.$t('common').product_shopping }}</h2>
        </div>
        <div v-if="!isLoading">
            <div class="d-flex flex-wrap justify-content-between product-wrapper row">
                <div v-for="(pData, Pinx) in productList" :key=Pinx class="col-6">
                    <product-card class="" :productDetails="pData" :number="paginationConfig.imgOrder + Pinx + pageNumber"
                        @onPurchaseOrder="orderProduct"></product-card>
                </div>
            </div>
            <div class="d-flex justify-content-end">
                <b-pagination @input="linkGen" v-model="pageNumber" :total-rows="paginationConfig.totalCount"
                    :per-page="paginationConfig.pageSize" aria-controls="my-table"></b-pagination>
            </div>
        </div>
        <loading :isLoading="isLoading" v-if="isLoading"></loading>
    </div>
</template>



<script>
const productCard = () => import("~/components/productShopping/productCard.vue");
const Loading = () => import('~/components/common/loader.vue')

export default {
    components: {
        productCard,
        Loading
    },
    layout: function ({ store }) {
        let applayout = store.state.dynamicLayout;
        return applayout;
    },
    async fetch() {
        this.initializeProductData()
    },
    data() {
        return {
            pageNumber: 1,
        }
    },
    computed: {
        productList() {
            return this.$store.getters['shopping/getProductList'];
        },
        isLoading() {
            return this.$store.getters['shopping/getProductLoader'];
        },
        paginationConfig() {
            return this.$store.getters['shopping/getPagination'];
        }
    },
    methods: {
        initializeProductData() {
            this.$store.dispatch('shopping/initializeProductList')
        },
        orderProduct(product) {
            this.$store.dispatch('shopping/initializeOrderProduct', product)
        },
        linkGen(pageNum) {
            this.pageNumber = pageNum
            this.$store.dispatch('shopping/setPagination', pageNum)
        },
    }
}
</script>