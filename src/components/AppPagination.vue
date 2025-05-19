<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const modelLimit = defineModel<number>('limit')
const modelPage = defineModel<number>('page')
const modelTotal = defineModel<number>('total')

const pages = computed(() => {
  if(!modelTotal.value || !modelLimit.value) return
  return Math.ceil(modelTotal.value / modelLimit.value)
})

const onClickPrev = async () => {
  if (modelPage.value && modelPage.value > 1) {
    modelPage.value -= 1
  }
}

const onClickNext = async () => {
  if (modelPage.value && pages.value && modelPage.value < pages.value) {
    modelPage.value += 1
  }
}

const onClickPage = (page: number) => {
  modelPage.value = page
}
</script>

<template>
  <div class="pagination">
    <div class="pagination-content">
      <button class="pagination-button" @click="onClickPrev">
        <img src="@/assets/icons/chevron-left.svg" alt="Prev click" />
      </button>
      <ul class="pagination-pages">
        <li
          v-for="page in pages"
          :key="page"
          :class="['pagination-page', { 'pagination-active ': modelPage === page }]"
        >
          <RouterLink
            @click="onClickPage(page)"
            :class="['pagination-page-link', { 'pagination-active ': modelPage === page }]"
            :to="{ query: { page: page } }"
            >{{ page }}</RouterLink
          >
        </li>
      </ul>
      <button class="pagination-button" @click="onClickNext">
        <img src="@/assets/icons/chevron-right.svg" alt="Next click" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.pagination {
  padding: 12px;
  height: 48px;
  border-radius: 8px;
  background-color: var(--ui-white);
}

.pagination-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pagination-pages {
  display: flex;
  gap: 12px;
}

.pagination-button {
  border: none;
  background: none;
  cursor: pointer;
}

.pagination-page {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  font-family: var(--font-family);
  font-weight: 600;
  font-size: 12px;
  color: var(--ui-accent);
}

.pagination-page-link {
  color: var(--ui-accent);
}

.pagination-active {
  color: var(--ui-white);
  background: var(--ui-accent);
}
</style>
