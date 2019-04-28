<template>
  <div class="container">
    <h1>{{ messageWelcome }}</h1>
    <div class="buy-counter">
      <p>Number of selected elements: {{ quantityProducts }}</p>
      <img src="../assets/carro.png" alt="Shopping cart" width="40px">
    </div>
    <div class="content">
      <ul>
        <li v-for="(product, index) in products" :key="product.id">
          <img
            class="image-product mx-4"
            :src="getImgUrl(product.image)"
            alt="Shopping cart"
            width="200px"
            align="left"
          >
          <p>
            <b>Name:</b>
            {{ product.name }}
          </p>
          <p>
            <b>Description:</b>
            {{ product.description }}
          </p>
          <p>
            <b>Price:</b>
            {{ product.price }}
            Bs.
          </p>
          <p>
            <b>Available:</b>
            {{ product.quantityAvailable }}
            <span v-if="product.quantityAvailable < 1">
              <i>(Now not in stock)</i>
            </span>
          </p>
          <p>
            <i>Amount selected to buy:</i>
            {{ product.selectedAmount }}
          </p>
          <div class="d-flex flex-row-reverse">
            <button
              v-if="product.selectedAmount > 0"
              v-on:click="deleteFromCart(index)"
              class="btn btn-danger mx-2"
            >Delete from cart</button>
            <button
              class="btn btn-success mx-2"
              v-if="product.quantityAvailable > 0"
              v-on:click="addToCart(index)"
            >Add to your cart</button>
          </div>
          <hr>
        </li>
      </ul>
      <div class="total mx-3">
        <p>
          <b>Total to pay:</b>
          {{ total }}
          Bs.
        </p>
      </div>
      <div class="d-flex flex-row-reverse">
        <button
          class="btn btn-primary p-2"
          v-if="quantityProducts > 0"
          v-on:click="buyProducts()"
        >BUY</button>
        <button
          class="btn btn-info p-2 mx-2"
          v-if="quantityProducts > 0"
          v-on:click="cleanCart()"
        >Clean shopping cart</button>
        <div v-if="finishedPurchase" class="alert alert-success mx-auto" role="alert">
          <b>Thank you for purchasing! :)</b>
        </div>
      </div>
      <br>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Store',
  data: function () {
    return {
      products: [
        {
          name: 'OnePlus 5',
          image: '5.jpg',
          quantityAvailable: 4,
          description: 'RAM: 8GB, GPU: Adreno 540, Storage: 64GB',
          price: 3200,
          selectedAmount: 0
        },
        {
          name: 'OnePlus 6',
          image: '6.png',
          quantityAvailable: 7,
          description: 'RAM: 6GB, GPU: Adreno 630, Storage: 256 GB',
          price: 4500,
          selectedAmount: 0
        },
        {
          name: 'OnePlus 6t',
          image: '6t.jpg',
          quantityAvailable: 1,
          description:
            'RAM: 8GB, GPU: Adreno 630, Storage: 256 GB UFS 2.1 2-LANE',
          price: 5900,
          selectedAmount: 0
        }
      ],
      quantityProducts: 0,
      total: 0,
      finishedPurchase: false
    }
  },
  props: {
    messageWelcome: String
  },
  methods: {
    getImgUrl (pic) {
      return require('../assets/' + pic)
    },
    addToCart (index) {
      this.addProduct(index)
      this.addTotal(index)
      this.increaseProducts()
    },
    addProduct (index) {
      this.products[index].quantityAvailable -= 1
      this.products[index].selectedAmount += 1
    },
    addTotal (index) {
      this.total += this.products[index].price
    },
    increaseProducts () {
      this.quantityProducts++
    },
    decreaseProducts () {
      this.quantityProducts -= 1
    },
    buyProducts () {
      this.total = 0
      this.quantityProducts = 0
      this.finishedPurchase = true
      this.setSelectedAmount()
      setTimeout(this.setFinishedPurchase, 3000)
    },
    setSelectedAmount () {
      this.products.forEach(product => {
        product.selectedAmount = 0
      })
    },
    deleteFromCart (index) {
      this.decreaseProducts()
      this.resetTotal(index)
      this.resetProductData(index)
    },
    resetProductData (index) {
      this.products[index].quantityAvailable += this.products[index].selectedAmount
      this.products[index].selectedAmount = 0
    },
    resetTotal (index) {
      this.total -= this.products[index].price
    },
    setFinishedPurchase () {
      this.finishedPurchase = false
    },
    cleanCart () {
      this.products.forEach(element => {
        element.quantityAvailable += element.selectedAmount
        element.selectedAmount = 0
      })
      this.total = 0
      this.quantityProducts = 0
    }
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
}
.buy-counter {
  text-align: right;
}
.btn-info {
  float: right;
  height: 70px;
}
.btn-primary {
  width: 150px;
}
li {
  list-style: none;
}
.total {
  text-align: right;
}
.image-product {
  float: left;
}
.alert {
  float: left;
  width: 650px;
  text-align: center;
}
</style>
