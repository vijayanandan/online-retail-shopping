<template>
    <div class="container product-wrapper">
        <div class="title button-color">
            <h2>{{ this.$t('common').product_order }}</h2>
        </div>
        <div class="content">
            <b-form @submit.stop.prevent>
                <b-form-group label-class="mr-0 cls-required" class="col-md-10" id="input-group-1" label="Product Name" label-for="productName">
                    <b-form-input id="productName" v-model="product.name"  type="text" placeholder="Enter product name"
                        required></b-form-input>
                    <span id="span1" v-if="$v.product.name.$error && !$v.product.name.required" class="text-danger">{{ this.$t('errors').enter_product_name }}</span>
                </b-form-group>
                <b-form-group label-class="mr-0 cls-required" class="col-md-10" id="input-group-1" label="Quantity" label-for="productQuantity">
                    <b-form-input id="productQuantity" v-model="product.quantity" type="text" placeholder="Enter Quantity"
                        required></b-form-input>
                    <span v-if="$v.product.quantity.$error && !$v.product.quantity.required" class="text-danger">{{ this.$t('errors').select_quantity }}</span>
                    <span v-if="$v.product.quantity.$error && $v.product.quantity.required && !$v.product.quantity.numeric" class="text-danger">{{ this.$t('errors').number_allowed }}</span>
                </b-form-group>
                <div class="d-flex ml-3">
                    <b-button id="submit" class="mr-3 button-color" @click="onSubmit">{{ this.$t('common').submit }}</b-button>
                    <b-button id="clear" class="clear button-color" @click="clearFormData">{{ this.$t('common').clear }}</b-button>
                </div>
            </b-form>
        </div>

    </div>
</template>

<script>
import Vue from "vue";
import Vuelidate from 'vuelidate'
const { required, numeric } = require('vuelidate/lib/validators')
Vue.use(Vuelidate);

export default {
    layout : function({store}){
        let applayout = store.state.dynamicLayout;
        return applayout;
    },
    data() {
        return {
            product: {
                name: '',
                quantity: '',
                isActive: true
            },
        }
    },
    validations: {
        product: {
            name: {
                required
            },
            quantity: {
                required,
                numeric
            }            
        }
    },
    methods: {
        onSubmit() {
            this.$v.product.$touch()
            if(this.$v.product.$invalid) {
                return false
            }
            let data = {
                productName: this.product.name,
                quantity: parseInt(this.product.quantity),
                isActive: true
            }
            let serverUrl = '/Product/AddProduct'
           this.$ws.post(serverUrl,data)
            .then(() => {
                this.$bvToast.toast(`${this.product.name || ''} ordered successfully`, {
                    title: 'Success',
                    toaster: 'b-toaster-top-center',   
                    variant: 'success',
                    solid: true
                })
                this.clearFormData()
                this.$v.product.$reset()
            })
            .catch(() => {
            })
        },
        clearFormData() {
            this.product.name = ''
            this.product.quantity = ''
        }
    }
}

</script>