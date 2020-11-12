<template>
  <v-container>
    <v-row>
      <v-col offset-md="2" md="8">
        <div class="pa-2" id="info">
          <v-simple-table
            dense
            id="menu-table"
            v-if="basket.length > 0"
            class="pt-5"
          >
            <thead>
              <tr>
                <th class="text-left" style="width: 30%">Quantity</th>
                <th class="text-left" style="width: 10%"></th>
                <th class="text-left" style="width: 20%">Size</th>
                <th class="text-left" style="width: 20%">Name of Item</th>
                <th class="text-left" style="width: 20%">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in basket" :key="item.name">
                <td>
                  {{ item.quantity }}
                </td>
                <td id="td_product_image">
                  <v-img v-bind:src="item.image"></v-img>
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
            <v-btn>Checkout</v-btn>
          </v-row>
        </div>
      </v-col>
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
    };
  },
  beforeCreate() {
    this.$store.dispatch("setMenuItems");
  },
  methods: {
    sizeChange(value) {
      console.log(value);
      this.currentSize = value;
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
      var totalCost = this.subTotal + 10;
      console.log(this.$store.getters.getBasketItems);
      if (totalCost <= 700) {
        return (totalCost += deliveryPrice - 10);
      } else {
        return (totalCost -= deliveryPrice);
      }
    },
  },
};
console.log(dbMenuAdd);
</script>

<style lang="scss" scoped>
.col:last-child {
  text-align: left;
}

.basket {
  align-items: center;
  justify-content: center;
  display: flex;
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
  max-width: 40px;
  padding: 0;
}
</style>