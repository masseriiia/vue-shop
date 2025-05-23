<script setup lang="ts">
import { GOODS_LIMIT } from '@/utils/constants'
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const modelTotal = defineModel<number>('total', { default: 0 })

const currentPage = computed(() => Number(route.query.page) || 1)
const totalPages = computed(() => Math.ceil(modelTotal.value / GOODS_LIMIT))

const isDisabledLeft = computed(() => currentPage.value === 1)
const isDisabledRight = computed(() => currentPage.value >= totalPages.value)

const visiblePages = computed(() => {
  const range = 2
  const total = totalPages.value
  const pages: (number | string)[] = []

  pages.push(1)

  if (currentPage.value - range > 1) {
    pages.push('...')
  }

  const start = Math.max(2, currentPage.value - range)
  const end = Math.min(total - 1, currentPage.value + range)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (currentPage.value + range < total - 1) {
    pages.push('...')
  }

  if (total > 1) {
    pages.push(total)
  }

  return pages
})
</script>

<template>
  <nav class="pagination">
    <div class="pagination-content">
      <RouterLink
        v-if="!isDisabledLeft"
        class="pagination-link"
        :to="{ query: { page: currentPage - 1 } }"
      >
        <span class="pagination-link-left"></span>
      </RouterLink>
      <span v-else class="pagination-link">
        <span
          :class="['pagination-link-left', { 'pagination-link-disabled': isDisabledLeft }]"
        ></span>
      </span>

      <div class="pagination-pages">
        <template v-for="page in visiblePages" :key="'page-' + page">
          <span v-if="page === '...'">{{ page }}</span>
          <RouterLink
            v-else
            :to="{ query: { page } }"
            :class="['pagination-page', { 'pagination-active': page === currentPage }]"
          >
            {{ page }}
          </RouterLink>
        </template>
      </div>

      <RouterLink
        v-if="!isDisabledRight"
        class="pagination-link"
        :to="{ query: { page: currentPage + 1 } }"
      >
        <span class="pagination-link-right"></span>
      </RouterLink>
      <span v-else class="pagination-link">
        <span
          :class="['pagination-link-right', { 'pagination-link-disabled': isDisabledRight }]"
        ></span>
      </span>
    </div>
  </nav>
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

.pagination-page {
  padding: 12px;
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
  border: none;
  cursor: pointer;
  background: none;
}

.pagination-page-link {
  color: var(--ui-accent);
}

.pagination-active {
  color: var(--ui-white);
  background: var(--ui-accent);
}

.pagination-link-disabled {
  opacity: 0.5;
}

.pagination-link {
  position: relative;
  height: 20px;
  width: 20px;
}
.pagination-link-left::after {
  position: absolute;
  content: '';
  width: 20px;
  height: 20px;
  background-image: url('@/assets/icons/chevron-left.svg');
}

.pagination-link-right::before {
  position: absolute;
  content: '';
  width: 20px;
  height: 20px;
  background-image: url('@/assets/icons/chevron-right.svg');
}
</style>
