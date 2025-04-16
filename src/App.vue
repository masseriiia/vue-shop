<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import { useCurrentUserStore } from './stores/currentUser'
import { storeToRefs } from 'pinia'
import Loading from './components/AppLoading.vue'

const userStore = useCurrentUserStore()
const { isLoading } = storeToRefs(userStore)

</script>

<template>
  <template v-if="isLoading">
    <Loading  />
  </template>
  <template v-else>
    <div class="app-container">
      <AppHeader />
      <main class="main">
        <RouterView/>
      </main>
    <AppFooter/>
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
