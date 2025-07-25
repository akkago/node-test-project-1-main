<script setup>
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['search'])
const query = ref('')

function onSubmit() {
  try {
    const trimmed = query.value.trim()

    if (!trimmed || /\s/.test(trimmed)) {
      alert('Введите только одно слово без пробелов')
      return
    }

    emit('search', trimmed)
    query.value = ''
  } catch (e) {
    alert('Ошибка поиска')
    console.log(e)
  }
}
</script>
<template>
  <form @submit.prevent="onSubmit" class="search-form">
    <input
        v-model="query"
        type="text"
        placeholder="Введите слово"
        class="search-input"
    />
    <button type="submit" class="search-button">Искать</button>
  </form>
</template>


<style scoped>
.search-form {
  display: flex;
  gap: 0.5rem;
}

.search-input {
  flex: 1;
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.search-button {
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.search-button:hover {
  background-color: #0056b3;
}
</style>
