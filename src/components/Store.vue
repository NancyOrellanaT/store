<template>
  <div class="container">
    <h1>{{ messageWelcome }}</h1>
    <div class="buy-counter">
      <p>Number of selected elements: {{ quantityProducts }}</p>
      <img src="../assets/carro.png" alt="Shopping cart" width="40px">
    </div>
    <div class="content">
      <ul>
        <li v-for="product in products">
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
            <button v-if="product.selectedAmount > 0" class="btn btn-danger mx-2">Delete from cart</button>
            <button class="btn btn-success mx-2">Add to your cart</button>
          </div>
          <hr>
        </li>
      </ul>
      <div class="total mx-3">
        <p>
          <b>Total to pay:</b>
          {{ total }}
        </p>
      </div>
      <div class="d-flex flex-row-reverse">
        <button class="btn btn-primary p-2">BUY</button>
        <button class="btn btn-info p-2 mx-2" v-if="quantityProducts > 0">Clean shopping cart</button>
      </div>
      <br>
    </div>
  </div>
</template>

<script>
export default {
  name: "Store",
  data: function() {
    return {
      products: [
        {
          name: "adfa",
          image: "6.png",
          quantityAvailable: 2,
          description: "sfgsdgsdfg",
          price: "adfdaf",
          selectedAmount: 1
        },
        {
          name: "fadsfas",
          image: "6t.jpg",
          quantityAvailable: 1,
          description: "sfgsdgsdfg",
          price: "dsfaf",
          selectedAmount: 0
        }
      ],
      quantityProducts: 1,
      total: 0
    };
  },
  props: {
    messageWelcome: String
  },
  methods: {
    getImgUrl(pic) {
      return require("../assets/" + pic);
    }
  }
};
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
</style>
