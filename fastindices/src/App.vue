<script setup>
import { onMounted } from 'vue';
import IndiceContainer from './components/IndiceContainer.vue'
import FormCalculadora from './components/FormCalculadora.vue';
import { useIndiceStore } from './stores/indices';

const indiceStore = useIndiceStore()

onMounted(() => {
  indiceStore.fetchIndices()
})

</script>

<template>
  <v-app>

    <v-container class="gradient-background fill-height" fluid>
      <IndiceContainer />
      <v-divider class="d-none d-xl-flex"></v-divider>     
      <FormCalculadora />
    </v-container>

    <v-footer class="d-flex flex-column" color="green-lighten-5">
      <div class="font-weight-thin text-green-darken-5">
        <strong>Fast Índices {{ new Date().getFullYear() }}</strong>
      </div>
    </v-footer>
  </v-app>
</template>

<style scoped>
.gradient-background {
  background: linear-gradient(to right, #2e679f, #a2b0d5);
}
</style>
