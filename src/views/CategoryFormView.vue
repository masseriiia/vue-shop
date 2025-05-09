<script setup lang="ts">
import { computed, ref } from 'vue';
import { createCategory, fetchCategoryById, updateCategory } from '@/services/api/categoriesApi';
import { useToast } from 'vue-toastification';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import AppInput from '@/components/AppInput.vue';
import AppButton from '@/components/AppButton.vue';
import type { Category } from '@/types/category';
import AppLoading from '@/components/AppLoading.vue';

const router = useRouter();
const route = useRoute()
const toast = useToast();
const category = ref<Category | null>(null)
const errorMessage = ref('')
const originalName = ref('')
const isEditForm = computed(() => route.params.id ? true : false)
const title = computed(() => isEditForm.value ? 'Редактирование категории' : 'Создание категории')
const isLoading = ref(false)
const isSubmit = ref(false)

async function prefetchCategory() {
    if(isEditForm.value) {
        try {
            isLoading.value = true
            category.value = await fetchCategoryById(Number(route.params.id))
            if(category.value) originalName.value = category.value.name
        } catch(error) {
            if(axios.isAxiosError(error) && error.status === 404 && error.response?.data.message) {
                router.push({name: '404'})
                toast.error(error.response?.data.message)
            }
        } finally {
            isLoading.value = false
        }
    }
}

prefetchCategory()

const handleCategorySubmit = (async (event: Event) => {
    event.preventDefault()
    if(isEditForm.value) {
        if (!category.value?.id) return;
        if (category.value.name === originalName.value) {
            toast.info("Вы ничего не изменили")
            return
        }
        try {
            isSubmit.value = true
            await updateCategory(Number(route.params.id), originalName.value)
            toast.success("Категория успешно изменена")
            router.push({name: 'categories'});
        } catch(error) {
            if(axios.isAxiosError(error) && error.status === 400 && error.response?.data.message) {
                errorMessage.value = error.response?.data.errors.name
            }else if(error instanceof Error){
                toast.error(error.message)
            }
        } finally {
            isSubmit.value = false
        }
    } else {
        try {
            isSubmit.value = true
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
        } finally {
            isSubmit.value = false
        }
    }
})
</script>

<template>
    <AppLoading v-if="isLoading"/>
    <div v-else class="category-form">
            <form class="category-form-content">
                <h1 class="category-form-title">{{ title }}</h1>
                <div class="category-form-field">
                    <label class="category-form-name">Название</label>
                    <AppInput v-model="originalName" :error="errorMessage"/>
                </div>
                <AppButton :loading="isSubmit" :disabled="isSubmit" class="category-form-button" @click="handleCategorySubmit">Сохранить</AppButton>
            </form>
        </div>
</template>

<style scoped>
.category-form {
    padding: 24px;
    border-radius: 8px;
    background-color: var(--ui-white);
}

.category-form-content {
    display: flex;
    flex-direction: column;
    width: 304px;
    gap: 24px;
}

.category-form-title {
    font-family: var(--font-family);
    font-weight: 600;
    font-size: 30px;
    line-height: 36px;
    letter-spacing: -0.01em;
    color: var(--ui-gray);
}

.category-form-name {
    margin-bottom: 8px;
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    color: var(  --ui-dark-gray);
}

.category-form-field {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 272px;
}

.category-form-button {
    align-self: flex-start;
}
</style>