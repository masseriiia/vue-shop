<script setup lang="ts">
import { ref } from 'vue';
import AppButton from './AppButton.vue';
import AppInput from './AppInput.vue';
import { createCategory } from '@/services/api/categoriesApi';
import { useToast } from 'vue-toastification';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const toast = useToast();
const category = ref('')
const errorMessage = ref('')

const handleCategorySubmit = (async (event: Event) => {
    event.preventDefault()
    try {
        await createCategory(category.value.trim())
        toast.success("Категория успешно создана")
        category.value = ''
        router.push({name: 'categories'});

    } catch (error) {
        if(axios.isAxiosError(error) && error.status === 400 && error.response?.data.message) {
            errorMessage.value = error.response?.data.errors.name
        } else if(error instanceof Error) {
            toast.error(error.message)
        }
    }
})
</script>

<template>
    <div class="new-category">
        <form class="new-category-content">
            <h1 class="new-category-title">Создание категории</h1>
            <div class="new-category-field">
                <label class="new-category-name">Название</label>
                <AppInput v-model:data="category" :error="errorMessage"/>
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
    line-height: 120%;
    letter-spacing: -0.01em;
    color: var(--ui-gray);
}

.new-category-name {
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