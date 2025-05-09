<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const activeItem = computed(() => route.name)

const links = [
    {id: 1, title: 'Категории', to: {name: 'categories'}},
    {id: 2, title: 'Товары', to: {name: 'goods'}},
    {id: 3, title: 'Баннеры', to: {name: 'banners'}},
]
</script>

<template>
    <div class="sidebar">
        <div class="sidebar-menu">
            <RouterLink v-for="link of links" :key="link.id" :to="link.to" :class="['sidebar-menu-item',{active: activeItem === link.to.name || activeItem === link.to.name + 'New' || activeItem === link.to.name + 'Edit'}]">
                {{ link.title }}
            </RouterLink>
        </div>
    </div>
</template>

<style scoped>
.sidebar {
    border-radius: 8px;
    background-color: var(--ui-white);
}

.sidebar-menu {
    display: flex;
    flex-direction: column;
}

.sidebar-menu-item {
    padding: 8px 20px;
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    color: var(--ui-black);
    cursor: pointer;
    transition: all 0.3s ease-in-out;
}
.sidebar-menu-item:first-child {
    border-radius: 8px 8px 0 0;
}

.sidebar-menu-item:last-child {
    border-radius: 0 0 8px 8px;
}

.sidebar-menu-item:hover {
    color: var(--ui-white);
    background: var(--ui-accent-active);
}

.active {
    background: var(--ui-accent-active);
    color: var(--ui-white);
}

</style>