<script setup>
import CardIndice from './CardIndice.vue'
import { useIndiceStore } from '../stores/indices'
import { computed } from 'vue'

const indiceStore = useIndiceStore()
const indiceNames = computed(() => Object.keys(indiceStore.$state))

</script>

<template>
    <v-row class="mx-auto" align="center" justify="center">
        <v-col cols="12">
            <div class="text-center text-blue-grey-lighten-4">
                <h1>Índices</h1>
            </div>
        </v-col>
        <v-col cols="auto" v-for="i in indiceNames" :key="i">
            <CardIndice :indiceName="i" />
        </v-col>
    </v-row>
</template>