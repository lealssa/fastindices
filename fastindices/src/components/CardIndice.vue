<script setup>
import { useIndiceStore } from '../stores/indices'

const props = defineProps({
    indiceName: String
})

const indiceStore = useIndiceStore()
const indice = indiceStore[props.indiceName]

function formatData(data, indiceName) {
    if (indiceName === 'IPCA' || indiceName === 'SELIC' || indiceName == 'IGPM') {
        return `${new Intl.NumberFormat('pt-BR', { maximumSignificantDigits: 4 }).format(data)}%`
    } else if (indiceName === 'BTC') {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data)
    } else {
        return data;
    }
}

</script>

<template>
    <v-card class="text-green-lighten-3" color="transparent" width="288" height="160" :loading="indice.data == null && indice.error == null">
        <v-card-item :title="indice.info.name" class="text-orange-lighten-4">
            <template v-slot:subtitle>
                <v-icon icon="mdi-information" size="15"></v-icon>
                {{ indice.info.description }}
            </template>
        </v-card-item>

        <v-card-text class="text-center">
            <div class="" v-if="indice.data == null && indice.error == null">
                <v-icon icon="mdi-finance" color="" size="40"></v-icon>
            </div>

            <div class="" v-else-if="indice.error != null">
                <v-icon icon="mdi-alert-circle-outline" color="orange-lighten-2" size="40"></v-icon>
            </div>

            <div class="text-h4" v-else>
                {{ formatData(indice.data, props.indiceName) }}
            </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class=" text-center font-weight-thin py-1 text-orange-lighten-4">
            {{ indice.info.notes }}
        </v-card-text>
    </v-card>
</template>