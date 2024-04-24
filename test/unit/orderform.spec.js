import Vue from "vue";
import { mount } from '@vue/test-utils'
import OrderForm from '@/project/productSeller/form.vue'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate);

describe('Product Order Form Testing', () => {
    let wrapper

    beforeEach(() => {
        wrapper = mount(OrderForm, {
            mocks: {
                $v: {
                    product: {
                        name: { $error: false, required: true },
                        quantity: { $error: false, required: true, numeric: true }
                    },
                    $invalid: false
                }
            },
            stubs: ['client-only']
        })
    })

    test('check product class properties initial state is empty', () => {
        expect(wrapper.vm.product.name).toBe('')
        expect(wrapper.vm.product.quantity).toBe('')
    })

    test('check Loader initial state is false', () => {
        expect(wrapper.vm.isLoading).toBe(false)
    })

    test('check product name value updating', async () => {
        const textInput = wrapper.find('#productName')
        await textInput.setValue('vijayanandan')
        expect(wrapper.vm.product.name).toBe('vijayanandan')
    })

    test('check product quantity value updating', async () => {
        const textInput = wrapper.find('#productQuantity')
        await textInput.setValue('8')
        expect(wrapper.vm.product.quantity).toBe('8')
    })

    test('check product name validation working', async () => {
        await wrapper.setData({
            product: { name: '' }
        })
        const clearButton = wrapper.find('#submit')
        await clearButton.trigger('click')

        expect(wrapper.vm.$v.product.name.$error).toBe(true)
        expect(wrapper.vm.$v.product.name.required).toBe(false)

        await wrapper.setData({
            product: { name: 'vijayanandan' }
        })

        expect(wrapper.vm.$v.product.name.$error).toBe(false)
        expect(wrapper.vm.$v.product.name.required).toBe(true)
    })

    test('check product quantity validation working', async () => {
        await wrapper.setData({
            product: { quantity: '' }
        })
        const clearButton = wrapper.find('#submit')
        await clearButton.trigger('click')

        expect(wrapper.vm.$v.product.quantity.$error).toBe(true)
        expect(wrapper.vm.$v.product.quantity.required).toBe(false)

        await wrapper.setData({
            product: { quantity: 'a' }
        })

        expect(wrapper.vm.$v.product.quantity.$error).toBe(true)
        expect(wrapper.vm.$v.product.quantity.required).toBe(true)
        expect(wrapper.vm.$v.product.quantity.numeric).toBe(false)

        await wrapper.setData({
            product: { quantity: '*' }
        })

        expect(wrapper.vm.$v.product.quantity.$error).toBe(true)
        expect(wrapper.vm.$v.product.quantity.required).toBe(true)
        expect(wrapper.vm.$v.product.quantity.numeric).toBe(false)

        await wrapper.setData({
            product: { quantity: '8' }
        })

        expect(wrapper.vm.$v.product.quantity.$error).toBe(false)
        expect(wrapper.vm.$v.product.quantity.required).toBe(true)
        expect(wrapper.vm.$v.product.quantity.numeric).toBe(true)
    })

    test('Check user allowed to submit form', async () => {
        await wrapper.setData({
            product: {
                name: 'vijayanandan',
                quantity: '9'
            }
        })
        const submitButton = wrapper.find('#submit')
        await submitButton.trigger('click')

        expect(wrapper.vm.$v.$invalid).toBe(false)
    })

  
