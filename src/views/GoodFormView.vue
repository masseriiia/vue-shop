<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import AppButton from '@/components/AppButton.vue';
import AppFormLabel from '@/components/AppFormLabel.vue';
import AppInput from '@/components/AppInput.vue';
import AppLoading from '@/components/AppLoading.vue';
import AppSelect from '@/components/AppSelect.vue';
import { fetchCategories } from '@/services/api/categoriesApi';
import { createGood, fetchGoodById, updateGood } from '@/services/api/goodsApi';
import type { Category } from '@/types/category';
import { useToast } from 'vue-toastification';
import { is404Error } from '@/utils/is404Error';
import { getFormValidationErrors } from '@/utils/getFormValidationErrors';

const router = useRouter();
const route = useRoute()
const toast = useToast();
const categories = ref<Category[]>([])
const good = ref({
    name: '',
    price: null,
    oldPrice: null,
    photoUrl: '',
    categoryId: 0
})
const errors = ref<Record<string, string>>({})
const isEditForm = computed(() => route.params.id ? true : false)
const title = computed(() => isEditForm.value ? 'Редактирование товара' : 'Создание товара')
const isLoading = ref(false)
const isSubmit = ref(false)

async function prefetchCategories() {
    categories.value = await fetchCategories()
}

async function checkAndLoadGoodData() {
    if(isEditForm.value) {
        good.value = await fetchGoodById(Number(route.params.id))
    }
}

async function preloadAndInitGoodsForm() {
    try{
        isLoading.value = true
        await prefetchCategories()
        await checkAndLoadGoodData()
    } catch(error) {
        if(is404Error(error)) {
            router.push({name: '404'})
            return
        }

        if(error instanceof Error) {
            toast.error(error.message)
        }
    } finally {
        isLoading.value = false
    }
}

preloadAndInitGoodsForm()


const handleGoodSubmit = async (event: Event) => {
    event.preventDefault()
    if(isEditForm.value) {
        try {
            isSubmit.value = true
            console.log(good.value)
            await updateGood(good.value)
            toast.success("Товар сохранен")
            router.push({name: 'goods'});
        } catch(error) {
            const { validationErrors, validationErrorMessage } = getFormValidationErrors(error)

            if(validationErrors) {
                errors.value = validationErrors
            }
            
            if(validationErrorMessage) {
                toast.error(validationErrorMessage)
                return
            }

            if(error instanceof Error) {
                toast.error(error.message)
            }
        } finally {
            isSubmit.value = false
        }
    } else {
        try {
            isSubmit.value = true
            console.log(good.value)
            const data = await createGood(good.value)
            router.push({name: 'goodsEdit', params: {id: data.id}})
            preloadAndInitGoodsForm()
            toast.success("Товар успешно создан")
        } catch(error) {
            const { validationErrors, validationErrorMessage } = getFormValidationErrors(error)

            if(validationErrors) {
                errors.value = validationErrors
            }
            
            if(validationErrorMessage) {
                toast.error(validationErrorMessage)
                return
            }

            if(error instanceof Error) {
                toast.error(error.message)
            }
        } finally {
            isSubmit.value = false
        }
    }
}
</script>

<template>
    <AppLoading v-if="isLoading"/>
    <div v-else class="good-form">
        <form class="good-form-content">
            <h1 class="good-form-title">{{ title }}</h1>
            <AppFormLabel text="Название">
                <AppInput v-model="good.name" :error="errors?.name"/>
            </AppFormLabel>
                
            <AppFormLabel text="Цена">
                <AppInput v-model.number="good.price" type="number" :error="errors?.price"/>
            </AppFormLabel>

            <AppFormLabel text="Старая цена">
                <AppInput v-model.number="good.oldPrice" type="number" :error="errors?.oldPrice"/>
            </AppFormLabel>
                
            <AppFormLabel text="Изображение">
                <AppInput v-model="good.photoUrl" :error="errors?.photoUrl"/>
                <img v-if="good.photoUrl" class="good-form-image" :src="good.photoUrl" alt="Изображение">
                <div v-else class="good-form-image">Добавьте изображение</div>
            </AppFormLabel>

            <AppFormLabel text="Категория">
                <AppSelect :options="categories" v-model.number="good.categoryId" type="number" :error="errors?.categoryId" placeholder="Выберете категорию"/>
            </AppFormLabel>

            <AppButton :loading="isSubmit" :disabled="isSubmit" class="good-form-button" @click="handleGoodSubmit">Сохранить</AppButton>
        </form>
    </div>
</template>

<style scoped>
.good-form {
    padding: 24px;
    border-radius: 8px;
    background-color: var(--ui-white);
}

.good-form-content {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.good-form-title {
    font-family: var(--font-family);
    font-weight: 600;
    font-size: 30px;
    line-height: 36px;
    letter-spacing: -0.01em;
    color: var(--ui-gray);
}

.good-form-name {
    margin-bottom: 8px;
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    color: var(--ui-dark-gray);
}

.good-form-field {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 520px;
}

.good-form-image {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 220px;
    height: 112px;
    border-radius: 8px;
    background-color: var(--ui-light-gray);
}

.good-form-button {
    align-self: flex-start;
}
</style>