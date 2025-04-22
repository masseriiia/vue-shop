<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { updateCategory } from '@/services/api/categoriesApi';
import { useToast } from 'vue-toastification';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import AppInput from '@/components/AppInput.vue';
import AppButton from '@/components/AppButton.vue';
import { useCurrentCategoryStore } from '@/stores/currentCategory';
import type { Category } from '@/types/category';

const route = useRoute();
const router = useRouter();
const toast = useToast();
const categoryStore = useCurrentCategoryStore()
const originalName = ref('')
const category = computed<Category | null>(() => {
    return categoryStore.category.find(item => item.id === Number(route.params.id)) || null
})
const errorMessage = ref('')

const handleCategorySubmit = (async () => {
    if (!category.value) return;
    if (category.value.name === originalName.value) {
        toast.info("Вы ничего не изменили")
        return
    }
    try {
        await updateCategory(Number(route.params.id), category.value.name)
        toast.success("Категория успешно изменена")
        router.push({name: 'categories'});
    } catch(error) {
        if(axios.isAxiosError(error) && error.status === 400 && error.response?.data.message) {
            errorMessage.value = error.response?.data.errors.name
        }else if(error instanceof Error){
            toast.error(error)
        }
        console.log(error)
    }
})

onMounted(async() => {
    await categoryStore.fetchCurrentCategory()
    if(!category.value || Number(route.params.id) !== category.value.id){
        router.push({name: '404'})
    }else {
        originalName.value = category.value.name;
  }
})

</script>

<template>
    <div v-if="category" class="new-category">
        <div class="new-category-content">
            <h1 class="new-category-title">Редактирование категории</h1>
            <div class="new-category-field">
                <p class="new-category-text">Укажите новое название</p>
                <AppInput v-model:data="category.name" :error="errorMessage"/>
            </div>
            <AppButton class="new-category-button" @click="handleCategorySubmit">Сохранить</AppButton>
        </div>
    </div>
</template>

<style scoped>
.new-category {
    padding: 24px;
    border-radius: 8px;
    background-color: var(--ui-white);
}

.new-category-content {
    display: flex;
    flex-direction: column;
    width: 304px;
    gap: 24px;
}

.new-category-title {
    font-family: var(--font-family);
    font-weight: 600;
    font-size: 30px;
    line-height: 120%;
    letter-spacing: -0.01em;
    color: var(--ui-gray);
}

.new-category-text {
    margin-bottom: 8px;
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 16px;
    line-height: 140%;
    color: #1e1e1e;
}

.new-category-field {
    display: flex;
    flex-direction: column;
}

.new-category-input {
    width: 272px;
}

.new-category-button {
    align-self: flex-start;
}
</style>