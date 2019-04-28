import {
  expect
} from 'chai'
import {
  shallowMount
} from '@vue/test-utils'
import Store from '@/components/Store.vue'

describe('Store.vue', function () {
  let wrapper

  beforeEach(function () {
    wrapper = shallowMount(Store)
  })

  it('test to appear the text of the span', () => {
    wrapper.vm.products[0].quantityAvailable = 0
    const expectedMessage = '(Now not in stock)'
    expect(wrapper.find('span').text()).to.equal(expectedMessage)
  })

  it('test to add to cart button', () => {
    wrapper.vm.addToCart(0)
    expect(wrapper.find('.delete-to-cart').exists()).to.equal(true)
  })

  it('test to increase the amount when you press the add button', () => {
    wrapper.vm.quantityProducts = 0
    wrapper.vm.addToCart(0)
    expect(wrapper.vm.quantityProducts).to.equal(1)
  })

  it('test to show the alert of thanks for the purchase', () => {
    wrapper.vm.buyProducts()
    expect(wrapper.find('.alert-success').exists()).to.equal(true)
  })

  it('test to verify that when the cart is cleaned the selected quantity of all the products is 0', () => {
    wrapper.vm.products[0].selectedAmount = 1
    wrapper.vm.cleanCart()
    const listProducts = wrapper.vm.products
    listProducts.forEach(product => {
      expect(product.selectedAmount).to.equal(0)
    })
  })
})
