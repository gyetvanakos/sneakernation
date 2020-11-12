<template>
  <v-container>
    <v-row>
      <v-col offset-md="3" md="6">
        <div id="info">
          <v-text-field v-model="email" label="Email" required> </v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            required
          >
          </v-text-field>

          <v-btn @click.prevent="signIn()"> Login </v-btn>
          <v-btn @click.prevent="signOut()"> SignOut </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "firebase";
import "firebase/firestore";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    signIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.replace("/admin");
        })
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === "auth/wrong-password") {
            alert("Wrong password");
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
    },

    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert("Logged Out");
          this.$router.replace("/");
        })
        .catch((error) => {
          alert(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#info {
  padding: 20px;
}
</style>