<script setup lang="ts">
import { computed, ref } from 'vue';
import { createCategory, fetchCategoryById, updateCategory } from '@/services/api/categoriesApi';
import { useToast } from 'vue-toastification';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import AppInput from '@/components/AppInput.vue';
import AppButton from '@/components/AppButton.vue';
import type { Category } from '@/types/category';

const router = useRouter();
const route = useRoute()
const toast = useToast();
const category = ref<Category | null>(null)
const errorMessage = ref('')
const originalName = ref('')
const title = computed(() => route.name === 'categoriesEdit' ? 'Редактирование категории' : 'Создание категории')
const isEditForm = computed(() => route.params.id ? true : false)

async function asyncLoading() {
    if(isEditForm.value) {
        category.value = await fetchCategoryById(Number(route.params.id))
        if(!category.value || Number(route.params.id) !== category.value.id){
            router.push({name: '404'})
        }else {
            originalName.value = category.value.name;
        }
    }
}

asyncLoading()

const handleCategorySubmit = (async (event: Event) => {
    event.preventDefault()
    if(isEditForm.value) {
        if (!category.value) return;
        if (category.value.name === originalName.value) {
            toast.info("Вы ничего не изменили")
            return
        }
        try {
            await updateCategory(Number(route.params.id), originalName.value)
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
    } else {
        try {
            await createCategory(originalName.value.trim())
            toast.success("Категория успешно создана")
            originalName.value = ''
            router.push({name: 'categories'});

        } catch (error) {
            if(axios.isAxiosError(error) && error.status === 400 && error.response?.data.message) {
                errorMessage.value = error.response?.data.errors.name
            } else if(error instanceof Error) {
                toast.error(error.message)
            }
        }
    }
})
</script>

<template>
    <div class="new-category">
            <form class="new-category-content">
                <h1 class="new-category-title">{{ title }}</h1>
                <div class="new-category-field">
                    <label class="new-category-name">Название</label>
                    <AppInput v-model:data="originalName" :error="errorMessage"/>
                </div>
                <AppButton class="new-category-button" @click="handleCategorySubmit">Сохранить</AppButton>
            </form>
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
    line-height: 36px;
    letter-spacing: -0.01em;
    color: var(--ui-gray);
}

.new-category-name {
    margin-bottom: 8px;
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
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