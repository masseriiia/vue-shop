<script setup lang="ts">
import type { Category } from '@/types/category'

interface AppSelectProps {
  placeholder: string
  options?: Category[]
  error?: string | null
}

withDefaults(defineProps<AppSelectProps>(), {
  options: () => [],
})

const model = defineModel()
</script>

<template>
  <select :class="['select', { 'select-error': error }]" v-model="model" placeholder="placeholder">
    <option disabled :value="0">{{ placeholder }}</option>
    <option v-for="category of options" :key="category.id" :value="category.id">
      {{ category.name }}
    </option>
  </select>
  <div class="error">
    <p v-show="error" class="error-text">
      {{ error }}
    </p>
  </div>
</template>

<style scoped>
.select {
  padding: 12px 16px;
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  color: var(--ui-dark-gray);
  border: 1px solid var(--ui-pale-gray);
  border-radius: 8px;
  appearance: none;
  background: url('@/assets/icons/down.svg') no-repeat right center;
  background-position: right 10px center;
  background-size: 18px;
}

.select:focus {
  outline: 1px solid var(--ui-gray);
}

.select-error {
  border: 1px solid var(--ui-red);
}

.error {
  position: relative;
  margin-bottom: 8px;
}

.error-text {
  position: absolute;
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: var(--ui-red);
}
</style>
