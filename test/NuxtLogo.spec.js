import { mount, createLocalVue } from '@vue/test-utils'
import projectSeller from '@/project/productSeller/form.vue'
import VueI18n from 'vue-i18n'
import Axios from 'axios';
import BootstrapVue from 'bootstrap-vue';

// Create a localVue instance
const localVue = createLocalVue();

// Register VueI18n with localVue
localVue.use(VueI18n);
localVue.use(BootstrapVue);

// Mock the $t function
const $t = key => key;
const $ws = Axios.create({
    baseURL:'https://uiexercise.theproindia.com/api'
})

describe('Project Seller Test Case', () => {
    const wrapper = mount(projectSeller, {
        localVue,
        mocks: {
            $t,
            $ws 
          },
    })

    test('product seller properties: initial state is empty', () => {
        expect(wrapper.vm.product.name).toBe('')
        expect(wrapper.vm.product.quantity).toBe('')
    })


    test('product seller: check the product quantity value updating', async()=> {
        const textInput = wrapper.find('#productQuantity')
        await textInput.setValue('10')

        expect(wrapper.vm.product.quantity).toBe('10')
    })

    test('product seller:  check the  product name value updating', async()=> {
        const textInput = wrapper.find('#productName')
        await textInput.setValue('vijayanandan')

        expect(wrapper.vm.product.name).toBe('vijayanandan')
    })


    test('product seller: check the product name validation working', async()=> {
        expect(wrapper.vm.$v.product.name.$error).toBe(false)
        expect(wrapper.vm.$v.product.name.required).toBe(true)

        await wrapper.setData({ 
            product: {
                name: ''
            }
        })
        const clearButton = wrapper.find('#submit')

        await clearButton.trigger('click')

        expect(wrapper.vm.$v.product.name.$error).toBe(true)
        expect(wrapper.vm.$v.product.name.required).toBe(false)


        await wrapper.setData({ 
            product: {
                name: 'vijayanandan'
            }
        })

        expect(wrapper.vm.$v.product.name.$error).toBe(false)
        expect(wrapper.vm.$v.product.name.required).toBe(true)

    })


    test('product seller: check product quantity validation working', async()=> {
        expect(wrapper.vm.$v.product.quantity.$error).toBe(false)
        expect(wrapper.vm.$v.product.quantity.required).toBe(true)

        await wrapper.setData({ 
            product: {
                quantity: ''
            }
        })
        const clearButton = wrapper.find('#submit')

        await clearButton.trigger('click')

        expect(wrapper.vm.$v.product.quantity.$error).toBe(true)
        expect(wrapper.vm.$v.product.quantity.required).toBe(false)

        await wrapper.setData({ 
            product: {
                quantity: 'a'
            }
        })

        expect(wrapper.vm.$v.product.quantity.$error).toBe(true)
        expect(wrapper.vm.$v.product.quantity.required).toBe(true)
        expect(wrapper.vm.$v.product.quantity.numeric).toBe(false)

        await wrapper.setData({ 
            product: {
                quantity: '*'
            }
        })

        expect(wrapper.vm.$v.product.quantity.$error).toBe(true)
        expect(wrapper.vm.$v.product.quantity.required).toBe(true)
        expect(wrapper.vm.$v.product.quantity.numeric).toBe(false)

        await wrapper.setData({ 
            product: {
                quantity: '8'
            }
        })

        expect(wrapper.vm.$v.product.quantity.$error).toBe(false)
        expect(wrapper.vm.$v.product.quantity.required).toBe(true)
        expect(wrapper.vm.$v.product.quantity.numeric).toBe(true)

    })

    test('product seller: Check user allowed to submit form', async() => {
        await wrapper.setData({
            product: {
                name: 'vijay',
                quantity: '5'
            }
        })
        const submitButton = wrapper.find('#submit')
        await submitButton.trigger('click')

        expect(wrapper.vm.$v.$invalid).toBe(false)
    })

    test('product seller: Empty the order form when click clear button', async () => {

        await wrapper.setData({
            product: {
                name: 'vijay',
                quantity: '5'
            }
        })
        const clearButton = wrapper.find('button.clear')

        await clearButton.trigger('click')

        expect(wrapper.vm.product.name).toBe('')
        expect(wrapper.vm.product.quantity).toBe('')
    })
})
