<script setup lang="ts">
import { ref } from 'vue';
import AppButton from '@/components/AppButton.vue'
import { deleteCategory, fetchCategories } from '@/services/api/categoriesApi';
import { formatDate } from '@/utils/formatDate'
import { useToast } from 'vue-toastification';
import type { Category } from '@/types/category';
import { formatName } from '@/utils/formatName';
import AppLoading from '@/components/AppLoading.vue';
import axios from 'axios';

    const toast = useToast();
    const categories = ref<Category[] | null>(null)
    const isLoading = ref(true)

    async function prefetchCategory() {
        try{
            isLoading.value = true
            categories.value = await fetchCategories()
        } finally {
            isLoading.value = false
        }
    }
    prefetchCategory()
    

    const onClickDelete = (async (item: Category) => {
        const category = confirm(`Уверены что хотите удалить категорию "${item.name}"?`)

        if(!category) return null

        try {
            isLoading.value = true
            await deleteCategory(item.id)
            categories.value = await fetchCategories()
            toast.success("Категория удалена")
        } catch(error) {
            if(axios.isAxiosError(error) && error.status === 401 && error.response?.data) {
                toast.error(error.response?.data)
            }   else if(error instanceof Error){
                toast.error(error.message)
            }
            
        } finally {
            isLoading.value = false
        }
    })

</script>

<template>
    <AppLoading v-if="isLoading"/>
    <div v-else class="categories">
        <table>
            <thead>
                <tr class="header">
                    <td>id</td>
                    <td class="name">Название</td>
                    <td>Время создания</td>
                    <td>Время обновления</td>
                    <td>
                    <AppButton size="small" :to="{name: 'categoriesNew'}">Создать</AppButton>
                    </td>
                    <td></td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item of categories" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td class="name">{{ formatName(item.name) }}</td>
                    <td>{{ formatDate(item.createdAt) }}</td>
                    <td>{{ formatDate(item.updatedAt) }}</td>
                    <td>
                        <AppButton size="small" :to="{name: 'categoriesEdit', params: {id: item.id}}">Изменить</AppButton>
                    </td>
                    <td>
                        <AppButton size="small" @click="onClickDelete(item)">Удалить</AppButton>
                    </td>
                    <td></td>
                </tr>
            </tbody>
        </table>
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