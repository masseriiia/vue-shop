<script setup lang="ts">
import AppLoading from '@/components/AppLoading.vue'
import { deleteGood, fetchGoods } from '@/services/api/goodsApi'
import type { Good, Goods } from '@/types/good'
import { reactive, ref, watch } from 'vue'
import { useToast } from 'vue-toastification'
import AppTableView, { type AppTableViewColumnDefinition } from './AppTableView.vue'
import AppButton from '@/components/AppButton.vue'
import { formatDate } from '@/utils/formatDate'
import { formatName } from '@/utils/formatName'
import { fetchCategories } from '@/services/api/categoriesApi'
import type { Category } from '@/types/category'
import axios from 'axios'
import AppPagination from '@/components/AppPagination.vue'
import { useRoute, useRouter } from 'vue-router'
import { is404Error } from '@/utils/is404Error'

const router = useRouter()
const route = useRoute()
const toast = useToast()
const goods = ref<Goods>({
  items: [],
  page: 0,
  limit: 0,
  total: 0,
})
const categories = ref<Category[]>([])
const isLoading = ref(true)
const pagination = reactive({
  page: Number(route.query.page) || 1,
  limit: 10,
  total: 0,
})

async function prefetchGoods() {
  try {
    isLoading.value = true
    goods.value = await fetchGoods({ limit: pagination.limit, page: pagination.page })
    await updatePagination(goods.value.page, goods.value.limit, goods.value.total)
    categories.value = await fetchCategories()
  } catch(error) {
    if (is404Error(error)) {
        router.push({ name: '404' })
        return
      }
  } finally {
    isLoading.value = false
  }
}

prefetchGoods()

async function updatePagination(page: number, limit: number, total: number) {
  pagination.page = page
  pagination.limit = limit
  pagination.total = total
}

const onClickDelete = async (item: Good) => {
  const category = confirm(`Уверены что хотите удалить товар "${item.name}"?`)
  if (!category) return null
  try {
    isLoading.value = true
    await deleteGood(item.id)
    goods.value = await fetchGoods({ limit: pagination.limit, page: 1 })
    await updatePagination(goods.value.page, goods.value.limit, goods.value.total)
    toast.success('Товар удалён')
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

const getCategoryName = (id: number) => {
  return categories.value?.find((category) => category.id === id)?.name || null
}

const columns: AppTableViewColumnDefinition[] = [
  { name: 'id', title: 'Id' },
  { name: 'name', title: 'Название' },
  { name: 'price', title: 'Цены' },
  { name: 'createdAt', title: 'Создан' },
  { name: 'updatedAt', title: 'Обновлен' },
  { name: 'categoryId', title: 'Категория' },
  { name: 'create', slot: 'create' },
  { name: 'delete', slot: 'delete' },
]

watch(
  () => pagination.page,
  async () => {
    try {
      isLoading.value = true
      goods.value = await fetchGoods({ limit: pagination.limit, page: pagination.page })
      router.push({ query: { ...route.query, page: pagination.page }})
    } finally {
      isLoading.value = false
    }
  },
)
</script>

<template>
  <AppLoading v-if="isLoading" />
  <div v-else class="goods">
    <AppTableView :cols="columns" :data="goods.items">
      <template #th-create>
        <AppButton size="small" :to="{ name: 'goodsNew' }">Создать</AppButton>
      </template>
      <template #row="{ rowData }">
        <td>{{ rowData.id }}</td>
        <td class="name">{{ formatName(rowData.name) }}</td>
        <td class="prices">
          <span>{{ rowData.price }}</span>
          <span class="price-old">{{ rowData.oldPrice }}</span>
        </td>
        <td>{{ formatDate(rowData.createdAt) }}</td>
        <td>{{ formatDate(rowData.updatedAt) }}</td>
        <td>{{ getCategoryName(rowData.categoryId) }}</td>
        <td>
          <AppButton size="small" :to="{ name: 'goodsEdit', params: { id: rowData.id } }">
            Изменить
          </AppButton>
        </td>
        <td>
          <AppButton size="small" @click="onClickDelete(rowData)">Удалить</AppButton>
        </td>
      </template>
    </AppTableView>
    <AppPagination
      v-model:limit="pagination.limit"
      v-model:page="pagination.page"
      v-model:total="pagination.total"
    />
  </div>
</template>

<style scoped>
.goods {
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.name {
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 107px;
}

.prices {
  display: flex;
  flex-direction: column;
}

.price-old {
  text-decoration: line-through;
  color: var(--ui-gray);
  opacity: 0.5;
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
