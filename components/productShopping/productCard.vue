<template>
<b-card no-body class="overflow-hidden" style="max-width: 540px;">
    <b-row no-gutters>
        <b-col md="6">
            <b-card-img :src="`https://picsum.photos/400/400/?image=${number}`" alt="Image" class="rounded-0"></b-card-img>
        </b-col>
        <b-col md="6">
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
                            <div v-else>
                                <input type="number" v-model="selectedQuantity" id="quantity" name="quantity" min="1">
                                <span v-if="$v.selectedQuantity.$error && !$v.selectedQuantity.required"> {{ this.$t('errors').this_field_required }}</span>
                                <span
                                v-if="$v.selectedQuantity.$error && $v.selectedQuantity.required && !$v.selectedQuantity.numeric">{{ this.$t('errors').enter_valid_value }}</span>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="mb-0">{{ this.$t('common').in_stock }} </p>
                            <h3 class="primary-colour"> {{ productDetails.Quantity }}</h3>
                        </div>
                    </div>
                </b-card-text>
                <div>
                    <b-button class="col-md-12 button-color" v-if="productDetails.Quantity > 0" @click="onSubmit('buy')">{{ this.$t('common').buy }}</b-button>
                    <b-button class="col-md-12 button-color" v-if="productDetails.Quantity == 0" @click="onSubmit('restock')">{{ this.$t('common').order }}</b-button>
                </div>
            </b-card-body>
        </b-col>
    </b-row>
</b-card>
</template>

<script>
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
Vue.use(BootstrapVue);
import Vuelidate from 'vuelidate'
const { required ,numeric} = require('vuelidate/lib/validators')
Vue.use(Vuelidate);

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
            selectedQuantity: ''
        }
    },
    validations: {
        selectedQuantity: {
            required,
            numeric
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
        doValidate() {
            let isErrorData = true;
            this.$v.selectedQuantity.$touch()
            if (this.$v.selectedQuantity.$invalid) {
                isErrorData =  false
            }
            return isErrorData
        },
        onSubmit(givenType) {
            if(!this.doValidate && givenType == 'restock') {
                return false
            }
            let tmpProd = {
                selectedQuantity: this.selectedQuantity,
                ...this.productDetails
            }
            this.$emit('onPurchaseOrder', tmpProd)
        }
    }
}
</script>
