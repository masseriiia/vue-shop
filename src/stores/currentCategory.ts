import { ref } from "vue";
import { defineStore } from "pinia";
import { useCurrentUserStore } from "./currentUser";
import { fetchCategories } from "@/services/api/categoriesApi";
import type { Category } from "@/types/category";

export const useCurrentCategoryStore = defineStore('category', () => {
    const userStore = useCurrentUserStore()
    const category = ref<Category[]>([])

    async function fetchCurrentCategory() {
        if(!userStore.isAdmin) return

        const data = await fetchCategories()
        category.value = data
    }

    return { category, fetchCurrentCategory }

})