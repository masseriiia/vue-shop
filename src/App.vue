<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import { useCurrentUserStore } from './stores/currentUser'
import { storeToRefs } from 'pinia'
import AppLoading from './components/AppLoading.vue'
import { watchEffect } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const userStore = useCurrentUserStore()
const { isLoading } = storeToRefs(userStore)

watchEffect(() => {
  document.title = route.meta.title as string || 'Vue Shop'
})
</script>

<template>
  <template v-if="isLoading">
    <AppLoading />
  </template>
  <template v-else>
    <div class="app-container">
      <AppHeader />
      <main class="main">
        <RouterView />
      </main>
      <AppFooter />
    </div>
  </template>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main {
  flex: 1;
}
</style>
