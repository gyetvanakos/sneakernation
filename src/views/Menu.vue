<template>
  <v-container>
    <v-row>
      <v-col offset-md="1" md="6">
        <div class="pa-2" id="info">
          <v-simple-table dense id="menu-table">
            <thead>
              <tr>
                <th></th>
                <th class="text-left" style="width: 60%">Sneakers</th>
                <th class="text-left" style="width: 20%">Sizes</th>
                <th class="text-left" style="width: 5%"></th>
                <th class="text-left" style="width: 15%">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in menuItems" :key="item.name">
                <td id="td_product_image">
                  <v-img v-bind:src="item.image"></v-img>
                </td>
                <td>
                  <span id="td_name">{{ item.name }}</span
                  ><br />
                  <span id="menu_item_color">{{ item.color }}</span>
                </td>
                <td>
                  <v-select
                    :items="item.sizes"
                    label="Size"
                    outlined
                    :value="selectedSize"
                    @change="sizeChange"
                  ></v-select>
                </td>
                <td></td>
                <td>{{ item.price }} DKK</td>
                <td>
                  <v-btn small text v-on:click="addToBasket(item)">
                    <div>Add</div>
                  </v-btn>
                </td>
                <td>{{ item.add }}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </div>
      </v-col>
      <v-col md="5">
        <div class="pa-2" id="info">
          <v-simple-table
            dense
            id="menu-table"
            v-if="basket.length > 0"
            class="pt-5"
          >
            <thead>
              <tr>
                <th class="text-left" style="width: 40%">Quantity</th>
                <th class="text-left" style="width: 50%">Size</th>
                <th class="text-left" style="width: 50%">Name of Item</th>
                <th class="text-left" style="width: 20%">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in basket" :key="item.name">
                <td>
                  <v-btn @click="removeFromBasket(item)" color="white">
                    ◀
                  </v-btn>
                  {{ item.quantity }}
                  <v-btn @click="addToBasket(item)" color="white"> ▶ </v-btn>
                </td>
                <td>{{ item.size }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.price }}</td>
              </tr>
            </tbody>
          </v-simple-table>

          <v-simple-table v-else>
            <p>The basket is empty</p>
          </v-simple-table>

          <v-divider></v-divider>
          <v-row id="basket_checkout" class="mt-3" style="margin: 0">
            <v-col>
              <p>Subtotal:</p>
              <p>Delivery:</p>
              <p>Total amount:</p>
            </v-col>
            <v-col class="text-right">
              <p>{{ subTotal }} DKK</p>
              <p v-show="subTotal >= 700">Free delivery</p>
              <p v-show="subTotal < 700">10 DKK</p>
              <p>
                <b>{{ total }} DKK</b>
              </p>
            </v-col>
          </v-row>
          <v-row style="margin: 0">
            <v-col>
              <v-btn class="cartbtn"
                ><router-link tag="li" to="/cart">Checkout</router-link></v-btn
              >
            </v-col>

            <v-col md="3">
              <v-btn class="cartbtn" @click="deleteBasket" color="incomplete"
                ><v-icon left> delete </v-icon> Delete</v-btn
              >
            </v-col>
          </v-row>
        </div>
      </v-col>
      <v-snackbar v-model="snackbar">
        Please select a size before press the add button[]
        <template v-slot:action="{ attrs }">
          <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-row>
  </v-container>
</template>

<script>
import { dbMenuAdd } from "../environments/environment";

export default {
  data() {
    return {
      selectedSize: 0,
      currentSize: null,
      basketDump: [],
      currentShoes: {},
      id: 1,
      snackbar: false,
    };
  },
  beforeCreate() {
    this.$store.dispatch("setMenuItems");
  },
  methods: {
    sizeChange(value) {
      this.currentSize = value;
    },
    deleteBasket() {
      this.$store.dispatch("deleteAllBasketItems");
    },

    addToBasket(item) {
      if (this.currentSize !== null) {
        this.currentShoes.id = item.id;
        this.currentShoes.size = this.currentSize;
        this.currentShoes.image = item.image;
        this.currentShoes.price = item.price;
        this.currentShoes.name = item.name;
        this.currentShoes.quantity = 1;

        this.basketDump.push(this.currentShoes);
        this.$store.commit("addBasketItems", this.basketDump);
        this.basketDump = [];
      } else {
        this.snackbar = true;
      }
    },
    removeFromBasket(item) {
      this.currentShoes.id = item.id;
      this.currentShoes.size = item.size;
      this.currentShoes.image = item.image;
      this.currentShoes.price = item.price;
      this.currentShoes.name = item.name;
      this.currentShoes.quantity = 1;

      this.basketDump.push(this.currentShoes);
      console.log(this.basketDump);
      this.$store.commit("removeBasketItems", this.basketDump);
      this.basketDump = [];
    },
  },
  computed: {
    basket() {
      return this.$store.getters.getBasketItems;
    },
    menuItems() {
      return this.$store.getters.getMenuItems;
    },
    subTotal() {
      var subCost = 0;
      for (var items in this.basket) {
        var individualItem = this.basket[items];
        subCost += individualItem.quantity * individualItem.price;
      }
      return subCost;
    },
    total() {
      var deliveryPrice = 10;
      var totalCost = this.subTotal;
      if (totalCost <= 700) {
        return (totalCost += deliveryPrice);
      } else {
        return totalCost;
      }
    },
  },
};
console.log(dbMenuAdd);
</script>

<style lang="scss" scoped>
nav ul {
  text-decoration: none;
}

.col:last-child,
h1 {
  text-align: left;
}

#info {
  background-color: white;
}

tr,
th {
  font-weight: 300;
}

#td_name {
  font-weight: bold;
}

tr,
td,
th {
  padding: 10px 10px 10px 10px;
}

#menu_item_color {
  font-style: italic;
  font-weight: 300;
  color: map-get($colorz, darkgrey);
  font-size: 13px;
}

#basket_checkout {
  font-size: 13px;
}
#basket_checkout p:first-child {
  line-height: 6px;
}

#td_product_image {
  max-width: 100px;
  padding: 0;
}

.cartbtn {
  list-style-type: none;
}
</style>