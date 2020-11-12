<template>
  <v-container grid-list-xs>
    <v-row class="info_box">
      <v-col>
        <h2 class="text-center">SNEAKERNATION</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center" id="navcart"
        ><router-link tag="li" to="/menu">
          <v-btn color="white"> CHECK OUT OUR SNEAKERS </v-btn></router-link
        ></v-col
      >
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style lang="scss">
h2 {
  color: white;
  font-size: 75px;
}
</style>