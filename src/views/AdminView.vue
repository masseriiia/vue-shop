<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'
</script>

<template>
  <div class="admin">
    <div class="container">
      <div class="admin-wrapper">
        <div>
          <AppSidebar />
        </div>
        <div class="admin-content">
          <RouterView />
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

.admin-wrapper {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 24px;
}
</style>
