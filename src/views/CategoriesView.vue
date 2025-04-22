<script setup lang="ts">
import { useCurrentCategoryStore } from '@/stores/currentCategory';
import { computed, onMounted } from 'vue';
import AppButton from '@/components/AppButton.vue'
import { deleteCategory } from '@/services/api/categoriesApi';
import { formatDate } from '@/utils/formateDate'
import { useToast } from 'vue-toastification';
import type { Category } from '@/types/category';
import { formatName } from '@/utils/formatName';

    const toast = useToast();
    const categoryStore = useCurrentCategoryStore()
    const data = computed(() => categoryStore.category)

    const onClickDelete = (async (item: Category) => {
        const category = confirm(`Уверены что хотите удалить категорию "${item.name}"?`)

        if(!category) return null

        try {
            await deleteCategory(item.id)
            await categoryStore.fetchCurrentCategory()
            toast.success("Категория удалена")
        } catch(error) {
            toast.error(error)
        }
    })

    onMounted(async() => {
        await categoryStore.fetchCurrentCategory()
    })

</script>

<template>
    <div class="categories">
        <table class="table">
            <thead>
                <tr class="header">
                    <td class="table-cell">id</td>
                    <td class="table-cell name">Название</td>
                    <td class="table-cell">Время создания</td>
                    <td class="table-cell">Время обновления</td>
                    <td class="table-cell">
                        <RouterLink :to="{name: 'newCategory'}">
                            <AppButton customClass="app-button-secondary">Создать</AppButton>
                        </RouterLink>
                    </td>
                    <td class="table-cell"></td>
                    <td class="table-cell"></td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item of data" :key="item.id">
                    <td class="table-cell">{{ item.id }}</td>
                    <td class="table-cell name">{{ formatName(item.name) }}</td>
                    <td class="table-cell">{{ formatDate(item.createdAt) }}</td>
                    <td class="table-cell">{{ formatDate(item.updatedAt) }}</td>
                    <td class="table-cell">
                        <RouterLink :to="{name: 'categoriesEdit', params: {id: item.id}}">
                            <AppButton customClass="app-button-secondary">Изменить</AppButton>
                        </RouterLink>
                    </td>
                    <td class="table-cell">
                        <AppButton customClass="app-button-secondary" @click="onClickDelete(item)">Удалить</AppButton>
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
        line-height: 140%;
        color: var(--ui-gray);
    }
</style>