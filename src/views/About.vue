<template>
  <v-container grid-list-xs>
    <v-row align-center class="info_box">
      <v-col md="5">
        <h1>ABOUT US</h1>
      </v-col>
    </v-row>
    <v-row align-center class="info_box" row wrap>
      <v-col sm2 xs12 offset-sm1>
        <h1>WHO ARE WE?</h1>
        <div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            nulla magna, pharetra id convallis vitae, condimentum volutpat
            augue. Mauris nec maximus nunc, quis ornare est. Etiam euismod lacus
            nibh, ac tincidunt sapien fermentum vitae. In ac rutrum elit, eu
            sollicitudin dui. Nullam pretium consequat mi, vel malesuada dui
            commodo eu. Duis non orci id elit condimentum rhoncus. Vivamus vel
            rhoncus velit. Curabitur in lorem iaculis, bibendum lacus et,
            fringilla justo. Aenean ultrices nec velit sed blandit.
          </p>
        </div>
      </v-col>
      <v-col sm2 xs12>
        <h1>WHY ARE WE THE BEST?</h1>
        <div>
          <p>
            Proin facilisis justo vitae venenatis cursus. Vivamus malesuada
            libero nulla, ut mattis ex imperdiet ac. In hac habitasse platea
            dictumst. Vivamus consequat pharetra dolor, at pulvinar nunc sodales
            et. Nullam condimentum mauris eu pulvinar ornare. Nulla facilisi.
          </p>
        </div>
      </v-col>
      <v-col sm2 xs12>
        <h1>WHY YOU SHOULD ORDER FROM US?</h1>
        <div>
          <p>
            Fusce et nibh id leo iaculis auctor. Nunc at lobortis nulla.
            Phasellus massa erat, aliquet a posuere sed, posuere eget massa. Sed
            elit tellus, iaculis non finibus a, tincidunt eget tortor. Donec
            cursus nec odio ut vehicula. Integer elementum semper mauris id
            dapibus.
          </p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.info_box:first-child .col h1 {
  font-size: 150%;
  padding: 50px;
}
</style>