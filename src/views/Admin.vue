<template>
  <v-container>
    <v-snackbar top v-model="updatedSucces">
      {{ updatedText }}
      <v-btn color="pink" text @click="updatedSucces = false"> Close </v-btn>
    </v-snackbar>

    <v-row>
      <v-col offset-md="2" md="5">
        <h1>Add New Item</h1>
        <div class="pa-2" id="info">
          <v-simple-table dense id="menu-table">
            <thead>
              <tr>
                <th class="text-left" style="width: 70%">Name</th>
                <th class="text-left" style="width: 70%">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in menuItems" :key="item.name">
                <td>
                  <span id="td_name">{{ item.name }}</span
                  ><br />
                  <span id="menu_item_color">{{ item.color }}</span>
                </td>
                <td>{{ item.price }}</td>
                <td>
                  <v-btn @click.stop="dialog = true" @click="editItem(item)">
                    edit
                  </v-btn>
                </td>
                <td>
                  <v-btn @click="deleteItem(item.id)"> delete </v-btn>
                </td>
                <td>{{ item.add }}</td>
              </tr>
            </tbody>
            <v-btn color="complete" to="/addNew"> Add Item </v-btn>
          </v-simple-table>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-dialog v-model="dialog" max-width="390">
        <v-card>
          <h1>Edit item</h1>
          <div class="pa-5" id="info">
            <v-text-field required v-model="item.name" outlined></v-text-field>
            <v-text-field required v-model="item.color" outlined></v-text-field>
            <v-text-field required v-model="item.price" outlined></v-text-field>

            <v-btn
              color="complete"
              @click="updateItem()"
              @click.stop="dialog = false"
            >
              Edit item
            </v-btn>
            <v-btn @click.stop="dialog = false" color="incomplete">
              Cancel
            </v-btn>
          </div>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { dbMenuAdd } from "../environments/environment";

export default {
  data() {
    return {
      basket: [],
      dialog: false,
      item: [],
      activeEditItem: null,
      updatedSucces: false,
      updatedText: "Product has been updated",
    };
  },
  beforeCreate() {
    this.$store.dispatch("setMenuItems");
  },
  methods: {
    editItem(item) {
      this.item = item;
      this.activeEditItem = item.id;
    },
    updateItem() {
      console.log;
      dbMenuAdd
        .doc(this.activeEditItem)
        .update(this.item)
        .then(() => {
          this.updatedSucces = true;
          console.log("Document successfully written!");
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });
    },
    deleteItem(id) {
      dbMenuAdd
        .doc(id)
        .delete()
        .then(function () {
          console.log("Document successfully deleted!");
        })
        .catch(function (error) {
          console.error("Error removing document: ", error);
        });
    },
    addToBasket(item) {
      if (this.basket.find((itemInArray) => item.name === itemInArray.name)) {
        item = this.basket.find(
          (itemInArray) => item.name === itemInArray.name
        );
        this.inicreasQtn(item);
      } else {
        this.basket.push({
          name: item.name,
          price: item.price,
          quantity: 1,
        });
      }
    },
    increaseQtn(item) {
      item.quantity++;
    },
    decreaseQtn(item) {
      item.quantity--;

      if (item.quantity === 0) {
        this.basket.splice(this.basket.indexOf(item), 1);
      }
    },
  },
  computed: {
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
      return totalCost + deliveryPrice;
    },
  },
};
</script>

<style lang="scss" scoped>
h1{
  @include infobox_mixin(5px, map-get($colorz, white),10px,5px,map-get($colorz, white,));
  font-weight: bold;
  text-transform: uppercase;
  font-size: 16px;
  text-align: right;
}

.col:last-child, h1{
  text-align: left;
}

#info{
    background-color: white;
}

tr, th{
    font-weight: 300;
}

#td_name{
    font-weight: bold;
}

tr, td, th{
    padding:10px 10px 10px 10px;
}

#menu_item_color{
    font-style: italic;
    font-weight: 300;
    color: map-get($colorz, darkgrey);
    font-size:13px;
}

#basket_checkout{
    font-size:13px
}
#basket_checkout p:first-child{
    line-height:6px
}
</style>