<script setup lang="ts">
import { VueSpinnerGears } from 'vue3-spinners';
</script>

<template>
    <div class="loading">
        <VueSpinnerGears color="gray" size="45" />
    </div>
</template>


<style scoped>
.loading  {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

</style>