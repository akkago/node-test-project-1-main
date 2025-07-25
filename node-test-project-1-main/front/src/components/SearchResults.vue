<script setup>
defineProps({
  results: {
    type: Array,
    default: () => []
  },
  isHistory: {
    type: Boolean,
    default: false
  }
})
</script>
<template>
  <div class="results">
    <h2>{{ isHistory ? 'Предыдущий запрос:' : 'Результаты поиска:' }}</h2>

    <div v-if="results.length === 0">
      <p class="no-results">
        {{ isHistory ? 'История пуста' : 'Ничего не найдено.' }}
      </p>
    </div>
    <ul v-else class="results-list">
      <li v-for="(item, index) in results" :key="index" class="result-item">
        <h3 class="result-title">
          <a :href="item.link" target="_blank" rel="noopener noreferrer">
            {{ item.title }}
          </a>
        </h3>
        <p class="result-description">{{ item.descr }}</p>
        <p class="result-date">{{ item.date }}</p>
      </li>
    </ul>
  </div>
</template>


<style scoped>
.results {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.no-results {
  color: #888;
  font-style: italic;
}

.results-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.result-item {
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #fff;
  border-left: 4px solid #007bff;
  border-radius: 6px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

.result-title {
  margin: 0 0 0.5rem;
  font-size: 1.2rem;
}

.result-title a {
  color: #007bff;
  text-decoration: none;
}

.result-title a:hover {
  text-decoration: underline;
}

.result-description {
  margin: 0.5rem 0;
  color: #333;
}

.result-date {
  font-size: 0.875rem;
  color: #666;
}
</style>
