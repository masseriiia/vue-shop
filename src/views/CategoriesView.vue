<script setup lang="ts">
import { ref } from 'vue'
import AppButton from '@/components/AppButton.vue'
import { deleteCategory, fetchCategories } from '@/services/api/categoriesApi'
import { formatDate } from '@/utils/formatDate'
import { useToast } from 'vue-toastification'
import type { Category } from '@/types/category'
import { formatName } from '@/utils/formatName'
import AppLoading from '@/components/AppLoading.vue'
import axios from 'axios'
import type { AppTableViewColumnDefinition } from './AppTableView.vue'
import AppTableView from './AppTableView.vue'

const toast = useToast()
const categories = ref<Category[]>([])
const isLoading = ref(true)

async function prefetchCategory() {
  try {
    isLoading.value = true
    categories.value = await fetchCategories()
  } finally {
    isLoading.value = false
  }
}
prefetchCategory()

const onClickDelete = async (item: Category) => {
  const category = confirm(`Уверены что хотите удалить категорию "${item.name}"?`)

  if (!category) return null

  try {
    isLoading.value = true
    await deleteCategory(item.id)
    categories.value = await fetchCategories()
    toast.success('Категория удалена')
  } catch (error) {
    if (axios.isAxiosError(error) && error.status === 401 && error.response?.data) {
      toast.error(error.response?.data)
    } else if (error instanceof Error) {
      toast.error(error.message)
    }
  } finally {
    isLoading.value = false
  }
}

const columns: AppTableViewColumnDefinition[] = [
  { name: 'id', title: 'Id' },
  { name: 'name', title: 'Название' },
  { name: 'createdAt', title: 'Время создания' },
  { name: 'updatedAt', title: 'Время обновления' },
  { name: 'create', slot: 'create' },
  { name: 'delete', slot: 'delete' },
]
</script>

<template>
  <AppLoading v-if="isLoading" />
  <div v-else class="categories">
    <AppTableView :cols="columns" :data="categories">
      <template #th-create>
        <AppButton size="small" :to="{ name: 'goodsNew' }">Создать</AppButton>
      </template>
      <template #row="{ rowData }">
        <td>{{ rowData.id }}</td>
        <td class="name">{{ formatName(rowData.name) }}</td>
        <td>{{ formatDate(rowData.createdAt) }}</td>
        <td>{{ formatDate(rowData.updatedAt) }}</td>
        <td>
          <AppButton size="small" :to="{ name: 'categoriesEdit', params: { id: rowData.id } }"
            >Изменить</AppButton
          >
        </td>
        <td>
          <AppButton size="small" @click="onClickDelete(rowData)">Удалить</AppButton>
        </td>
      </template>
    </AppTableView>
  </div>
</template>

<style scoped>
table {
  width: 100%;
  max-width: 872px;
  border-radius: 8px;
  border-collapse: collapse;
  background-color: var(--ui-white);
}

.header {
  width: 100%;
  background-color: var(--ui-header-bg);
}

.name {
  overflow: hidden;
  text-overflow: ellipsis;
  width: 107px;
}

td {
  padding: 10px;
  min-width: 70px;
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: var(--ui-gray);
}
</style>
