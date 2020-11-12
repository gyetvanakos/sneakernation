<template>
  <v-container>
    <v-row>
      <v-col offset-md="2" md="5">
        <h1>New product</h1>
        <div class="pa-2" id="info">
          <v-text-field
            label="Name of Product"
            required
            v-model="name"
            outlined
          ></v-text-field>
          <v-text-field
            label="Color"
            required
            v-model="color"
            outlined
          ></v-text-field>
          <v-text-field
            label="Price"
            required
            v-model="price"
            outlined
          ></v-text-field>
          <v-file-input label="file input" @change="uploadImage"></v-file-input>

          <v-btn
            color="complete"
            @click="addNewMenuItem()"
            :disabled="btnDisable"
          >
            Add Item
          </v-btn>
          <v-btn color="incomplete"> Cancel </v-btn>
        </div>
      </v-col>
      <v-col md="3">
        <h1>Product info</h1>
        <div class="pa-2" id="info">
          <v-simple-table id="menu-table">
            <thead>
              <tr>
                <th class="text-left" style="width: 70%">Name</th>
                <th class="text-left" style="width: 100px">Price DKK</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span id="td_name"> {{ name }} </span><br />
                  <span id="menu_item_color"> {{ color }} </span>
                </td>
                <td id="preview_menuitem_price">{{ price }} </td>
              </tr>
            </tbody>
          </v-simple-table>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import { dbMenuAdd, fb } from "../../environments/environment";

export default {
  data() {
    return {
      name: "",
      color: "",
      price: "",
      size: [],
      image: null,
      staticSizeList: [39, 40, 41, 42, 43, 44, 45, 46, 47],
      btnDisable: true,
    };
  },

  methods: {
    uploadImage(e) {
      let file = e;
      var storageRef = fb.storage().ref("products/" + file.name);
      let uploadTask = storageRef.put(file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot);
        },
        (error) => {
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.image = downloadURL;
            this.btnDisable = false;
            console.log("File available at", downloadURL);
          });
        }
      );
    },
    addNewMenuItem() {
      dbMenuAdd.add({
        sizes: this.staticSizeList,
        name: this.name,
        color: this.color,
        price: this.price,
        image: this.image,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  @include infobox_mixin(
    5px,
    map-get($colorz, white),
    10px,
    5px,
    map-get($colorz, white)
  );
  font-weight: bold;
  text-transform: uppercase;
  font-size: 16px;
  text-align: right;
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
</style>