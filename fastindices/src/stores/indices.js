import { defineStore } from 'pinia'

export const useIndiceStore = defineStore({
    id: 'useIndiceStore',
    state: () => ({
        // INCC: { data: 0, error: 0, info: { name: "INCC", description: "A carniça da FGV não fornece API", notes: "Não medido" } },
        // IGPM: { data: 0, error: 0, info: { name: "IGPM", description: "A carniça da FGV não fornece API", notes: "Não medido" } },
        IPCA: { data: null, error: null, info: { name: "IPCA", description: "Acumulado dos últimos 12 meses", notes: null } },
        SELIC: { data: null, error: null, info: { name: "SELIC", description: "Taxa básica de juros", notes: null } },
        BTC: {
            data: null,
            error: null,
            info: {
                name: "Bitcoin",
                description: "Cotação do BTC no Mercado Bitcoin",
                notes:
                    `Obtido em ${new Intl.DateTimeFormat("pt-BR", {
                        dateStyle: "short",
                        timeStyle: "medium",
                    }).format(new Date())}`,
            },
        },
    }),
    actions: {
        fetchData(url, handleData, propName) {
            fetch(url)
                .then((res) => res.json())
                .then((json) => (this[propName].data = handleData(json)))
                .catch((err) => (this[propName].error = err))
        },
        fetchIPCA() {
            const date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth();
            if (month === 0) {
                month = 12;
                year--;
            }
            const period = `${year}${month.toString().padStart(2, '0')}`;
            const urlIPCA = `https://servicodados.ibge.gov.br/api/v3/agregados/7062/periodos/${period}/variaveis/1120?localidades=N1[all]&classificacao=315[7169]`;
            this.IPCA.info.notes = `Medido em ${new Date(year, month - 1).toLocaleString('pt-BR', { month: 'long' })} de ${year} pelo IBGE`
            this.fetchData(urlIPCA, (json) => json[0].resultados[0].series[0].serie[period], "IPCA")
        },
        fetchSELIC() {
            const date = new Date();
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            const period = `${day}/${month}/${year}`;
            const urlSELIC = `https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados?formato=json&dataInicial=${period}&dataFinal=${period}`;
            this.SELIC.info.notes = `Obtido em ${new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "medium",}).format(new Date())}`
            this.fetchData(urlSELIC, (json) => json[0].valor, "SELIC")
        },   
        fetchBTC() {
            const urlBTC = "https://www.mercadobitcoin.net/api/BTC/ticker/"
            this.fetchData(urlBTC, (json) => json.ticker.last, "BTC")
        },
        fetchIndices() {
            this.fetchIPCA()
            this.fetchSELIC()
            this.fetchBTC()
        }
    },
})