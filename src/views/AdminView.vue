<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue';

</script>

<template>
  <div class="admin">
    <div class="container">
      <div class="admin-content">
        <AppSidebar/>
        <div>
          <RouterView/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin {
  padding-top: 23px;
  padding-bottom: 23px;
}

.admin-content {
  display: flex;
  gap: 24px;
}
</style>
