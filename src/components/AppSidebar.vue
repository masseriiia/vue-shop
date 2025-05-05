<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const activeItem = computed(() => route.name)

</script>

<template>
    <div class="sidebar">
        <ul class="sidebar-menu">
            <li :class="['sidebar-menu-item',{active: activeItem === 'categories' || activeItem === 'newCategory' || activeItem === 'categoriesEdit'}]">
                <RouterLink :to="{name: 'categories'}">
                    Категории
                </RouterLink>
            </li>
            <li :class="['sidebar-menu-item',{active: activeItem === 'goods'}]">
                <RouterLink :to="{name: 'goods'}">
                    Товары
                </RouterLink>
            </li>
            <li :class="['sidebar-menu-item',{active: activeItem === 'banners'}]">
                <RouterLink to="/admin/banners">
                    Баннеры
                </RouterLink>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.sidebar {
    border-radius: 8px;
    background-color: var(--ui-white);
}

.sidebar-menu-item {
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    color: var(--ui-black);
    cursor: pointer;
    transition: color 0.3s ease-in-out;

    a {
        padding: 8px 20px;
        display: block; 
        color: var(--ui-black);
    }
}
.sidebar-menu-item:first-child {
    border-radius: 8px 8px 0 0;

    a {
        border-radius: inherit;
    }
}

.sidebar-menu-item:last-child {
    border-radius: 0 0 8px 8px;

    a {
        border-radius: inherit;
    }
}

.sidebar-menu-item:hover {
    color: var(--ui-white);
    background: var(--ui-accent-active);
    
    a {
        color: var(--ui-white);
        background: var(--ui-accent-active);
    }
}

.active {
    background: var(--ui-accent-active);
    
    a {
        color: var(--ui-white);
    }
}

</style>