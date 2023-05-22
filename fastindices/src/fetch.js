// fetch.js
import { ref } from 'vue'

function fetchData(url, handleData) {
    const data = ref(null)
    const error = ref(null)

    fetch(url)
        .then((res) => res.json())
        .then((json) => (data.value = handleData(json)))
        .catch((err) => (error.value = err))

    return { data, error }
}