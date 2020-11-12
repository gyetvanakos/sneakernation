<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-col offset-md="3">
        <div v-if="currentUser" class="pl-5">
          <v-avatar>
            <img
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John the Admin"
            />
          </v-avatar>
        </div>
      </v-col>
      <ul>
        <router-link tag="li" to="/"> HOME</router-link>
        <router-link tag="li" to="/menu"> SNEAKERS</router-link>
        <router-link tag="li" to="/login"> LOGIN</router-link>
        <router-link tag="li" to="/admin">
          <v-icon>lock</v-icon> ADMIN</router-link
        >
      </ul>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-btn @click="drawer = !drawer" class="pl-5">MENU</v-btn>
      <v-col id="navcart" offset-md="10"
        ><router-link tag="li" to="/cart" class="pl-5">
          <v-btn> CART </v-btn></router-link
        >
      </v-col>
    </v-app-bar>
  </div>
</template>

<script>
import { db } from "../environments/environment";

import firebase from "firebase";
import "firebase/firestore";
import store from "../store/index.js";

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    store.dispatch("setUser", user);
  } else {
    store.dispatch("setUser", null);
  }
});

export default {
  data: () => ({ drawer: null }),
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
  },
};

console.log(db);
</script>

<style lang="scss" scoped>
nav ul {
  padding: 0;
  margin-top: 20px;
  text-decoration: none;
}

nav li {
  color: map-get($colorz, orange);
  margin-left: 15%;
  padding: 5px 20px;
  list-style-type: none;
}

nav li i {
  margin-right: 10px;
}

nav li:last-child {
  position: absolute;
  bottom: 40px;
}

#navcart {
  list-style-type: none;
}

#user {
  padding-left: 50px;
}
</style>