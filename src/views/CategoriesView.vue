<script setup lang="ts">
import { ref } from 'vue';
import AppButton from '@/components/AppButton.vue'
import { deleteCategory, fetchCategories } from '@/services/api/categoriesApi';
import { formatDate } from '@/utils/formateDate'
import { useToast } from 'vue-toastification';
import type { Category } from '@/types/category';
import { formatName } from '@/utils/formatName';
import AppLoading from '@/components/AppLoading.vue';

    const toast = useToast();
    const categories = ref<Category[] | null>(null)
    const isLoading = ref(true)

    async function asyncLoading() {
        try{
            isLoading.value = true
            categories.value = await fetchCategories()
        } finally {
            isLoading.value = false
        }
    }
    asyncLoading()
    

    const onClickDelete = (async (item: Category) => {
        const category = confirm(`Уверены что хотите удалить категорию "${item.name}"?`)

        if(!category) return null

        try {
            await deleteCategory(item.id)
            categories.value = await fetchCategories()
            toast.success("Категория удалена")
        } catch(error) {
            toast.error(error)
        }
    })

</script>

<template>
    <AppLoading v-if="isLoading"/>
    <div v-else class="categories">
        <table class="table">
            <thead>
                <tr class="header">
                    <td class="table-cell">id</td>
                    <td class="table-cell name">Название</td>
                    <td class="table-cell">Время создания</td>
                    <td class="table-cell">Время обновления</td>
                    <td class="table-cell">
                    <AppButton size="small" :to="{name: 'newCategory'}">Создать</AppButton>
                    </td>
                    <td class="table-cell"></td>
                    <td class="table-cell"></td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item of categories" :key="item.id">
                    <td class="table-cell">{{ item.id }}</td>
                    <td class="table-cell name">{{ formatName(item.name) }}</td>
                    <td class="table-cell">{{ formatDate(item.createdAt) }}</td>
                    <td class="table-cell">{{ formatDate(item.updatedAt) }}</td>
                    <td class="table-cell">
                        <AppButton size="small" :to="{name: 'categoriesEdit', params: {id: item.id}}">Изменить</AppButton>
                    </td>
                    <td class="table-cell">
                        <AppButton size="small" @click="onClickDelete(item)">Удалить</AppButton>
                    </td>
                    <td class="table-cell"></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
    .categories {
        width: 100%;
        width: 872px;
    }

    .table {
        width: 100%;
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

    .table-cell {
        padding: 10px;
        min-width: 70px;
        font-family: var(--font-family);
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: var(--ui-gray);
    }
</style>