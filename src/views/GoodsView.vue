<script setup lang="ts">
import { fetchGoods } from '@/services/api/goodsApi';
import type { Good } from '@/types/good';
import { ref } from 'vue';

const goods = ref<Good[] | null>(null)

async function prefetchGoods() {
    goods.value = await fetchGoods()
}

prefetchGoods()



</script>

<template>
    <div class="goods">
       <h1>Goods</h1> 
    </div>
</template>

<style scoped>

</style>