<script setup lang="ts">
</script>

<template>
    <div class="categories">
        <RouterView/>
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
        white-space: nowrap; 
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
        line-height: 20px;
        color: var(--ui-gray);
    }
</style>