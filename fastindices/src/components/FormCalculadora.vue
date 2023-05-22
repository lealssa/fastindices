<script>
import { useField, useForm } from 'vee-validate'
import { useIndiceStore } from '../stores/indices'
import { watchEffect } from 'vue'

export default {
    setup() {

        const indiceStore = useIndiceStore()

        useForm({
            validationSchema: {
                valor(value) {
                    if (value?.length >= 1) return true
                    return 'Insira um valor'
                },
                taxa(value) {
                    if (value?.length > 0) return true
                    return 'Insira uma taxa de juros'
                },
                tipo(value) {
                    if (value == 'Pré-fixado' || value == 'Pós-fixado') return true
                    return 'Selecione Pré-fixado ou Pós-fixado'
                },
                prazo(value) {
                    if (value?.length > 0) return true
                    return 'Insira um prazo'
                }
            },
        })
        const valor = useField('valor')
        const taxa = useField('taxa')
        const tipo = useField('tipo')
        const prazo = useField('prazo')

        // Definir valores padrão
        prazo.value.value = "12"
        tipo.value.value = "Pré-fixado"

        watchEffect(() => {
            if (tipo.value.value == 'Pós-fixado') {

                taxa.value.value = '90';
            }
            else if (tipo.value.value == 'Pré-fixado') {
                if (indiceStore.SELIC.data !== null)
                    taxa.value.value = `${indiceStore.SELIC.data}`
                else
                    taxa.value.value = ""
            }
        })


        return { valor, taxa, tipo, prazo, indiceStore }
    },
    computed: {
        rendimento() {

            const tipo = this.tipo.value.value
            const valor = parseFloat(this.valor.value.value)
            const taxa = parseFloat(this.taxa.value.value)
            const prazo = parseFloat(this.prazo.value.value)

            let taxaCalculo = 0

            if (tipo == "Pós-fixado")
                taxaCalculo = taxa * (this.indiceStore.SELIC.data / 100)
            else
                taxaCalculo = taxa

            const res = valor * Math.pow(1 + (taxaCalculo / 100) / 12, prazo)

            return isNaN(res) ? 0 : res
        },
        taxaLabel() {
            if (this.tipo?.value?.value == 'Pós-fixado') {
                return '% da SELIC a.a (%)';
            } else {
                return 'Taxa a.a (%)';
            }
        }
    }
}
</script>

<template>
    <v-row class="mx-auto" align="center" justify="center">
        <v-col cols="12">
            <div class="text-center py-4 text-blue-grey-lighten-4">
                <h1>Simular rendimento</h1>
            </div>            
        </v-col>
        <v-col cols="12" xs="9" sm="9" md="9" lg="9" xl="6">
            <div>
                <form @submit.prevent="submit">
                    <v-text-field class="text-blue-grey-lighten-4" v-model="valor.value.value"
                        :error-messages="valor.errorMessage.value" label="Valor" placeholder="R$ 0,00"></v-text-field>

                    <v-row>
                        <v-col>
                            <v-text-field class="text-blue-grey-lighten-4" v-model="taxa.value.value"
                                :error-messages="taxa.errorMessage.value" :label="taxaLabel" placeholder="13,75"
                                :loading="indiceStore.SELIC.data == null && taxa.value.value == ''"></v-text-field>
                        </v-col>
                        <v-col>
                            <v-combobox class="text-blue-grey-lighten-4" v-model="tipo.value.value"
                                :error-messages="tipo.errorMessage.value" :items="['Pré-fixado', 'Pós-fixado']"
                                :disabled="indiceStore.SELIC.data == null"></v-combobox>
                        </v-col>
                    </v-row>

                    <v-text-field class="text-blue-grey-lighten-4" v-model="prazo.value.value"
                        :error-messages="prazo.errorMessage.value" label="Prazo a.m" placeholder="12"></v-text-field>
                </form>
            </div>
            <div class="text-center text-blue-grey-lighten-4">
                <p>Valor no vencimento</p>
                <h1 class="text-green-lighten-4">{{ new Intl.NumberFormat('pt-BR', {
                    style:
                        'currency', currency: 'BRL'
                }).format(rendimento)
                }}</h1>                
            </div>
        </v-col>
    </v-row>
</template>