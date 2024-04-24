<template>
<b-card no-body class="mb-4 card">
    <div class="d-flex">
        <div class="w-50">
            <b-card-img :src="`https://picsum.photos/400/400/?image=${number}`" alt="Image" height="200px"></b-card-img>
        </div>
        <div class="w-50">
            <b-card-body :title="productDetails.ProductName">
                <b-card-text>
                    <div class="d-flex justify-content-between mt-2">
                        <div>
                            <span class="">{{ this.$t('common').quantity }}</span>
                            <div class="mt-2" v-if="productDetails.Quantity > 0">
                                <select v-model="selectedQuantity" name="quantity" id="carquantitys" class="select">
                                    <option v-for="(item, index) in limitQuantity(productDetails.Quantity)" :key="index" :value="item">{{
                                    item }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="mb-0">{{ this.$t('common').in_stock }} </p>
                            <h3 class="primary-colour"> {{ productDetails.Quantity }}</h3>
                        </div>
                    </div>
                </b-card-text>
                <div>
                    <b-button class="col-md-12 buy-button-color" v-if="productDetails.Quantity > 0" @click="onSubmit()">{{ this.$t('common').buy }}</b-button>
                </div>
            </b-card-body>
        </div>
    </div>
</b-card>
</template>

<script>
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
Vue.use(BootstrapVue);


export default {
    props: {
        productDetails: {
            type: Object,
            required: true,
            default: []
        },
        number: {
            type: Number,
            required: true,
            default: 1
        }
    },
    data() {
        return {
            selectedQuantity: 1
        }
    },
    methods: {
        limitQuantity(quantity) {
            let tempQuantity = quantity
            if (quantity > 100) {
                tempQuantity = 100;
            }
            return tempQuantity;
        },
        onSubmit() {
            let givenVal = {
                selectedQuantity: this.selectedQuantity,
                ...this.productDetails
            }
            this.$emit('onPurchaseOrder', givenVal)
        }
    }
}
</script>
