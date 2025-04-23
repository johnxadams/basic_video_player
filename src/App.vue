<template>
  <v-app>
    <v-main>
      <div class="test">
        <Player />
      </div>
    </v-main>
  </v-app>
</template>
<script setup>
import Player from './components/Player.vue'
</script>

<style lang="scss" scoped>
.test {
  color: red;
}
</style>
