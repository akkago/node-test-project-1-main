<script setup>
import {onMounted, ref} from 'vue'
import SearchForm from './components/SearchForm.vue'
import SearchResults from './components/SearchResults.vue'

const results = ref([])
const isHistory = ref(true)

async function fetchInitialData() {
  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_PARSE_URL}`)

    if (!response.ok) throw new Error('Ошибка при загрузке истории')

    const data = await response.json()

    results.value = data
  } catch (e) {
    console.error(e)
    alert('Ошибка при загрузке истории')
  }
}

async function handleSearch(word) {
  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_PARSE_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ word })
    })

    if (!response.ok) throw new Error('Ошибка сервера')

    const data = await response.json()

    isHistory.value = false
    results.value = data
  } catch (e) {
    console.error(e)
    alert('Ошибка при получении результатов')
  }
}

onMounted(fetchInitialData)
</script>

<template>
  <div class="container">
    <h1>🔍 Поиск Новостей</h1>
    <SearchForm @search="handleSearch" />
    <SearchResults :results="results" :is-history="isHistory"/>
  </div>
</template>



<style scoped>
.container {
  max-width: 500px;
  margin: 3rem auto;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}
</style>
