<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import { useCurrentUserStore } from '@/stores/currentUser.ts'
import { computed } from 'vue'

const userStore = useCurrentUserStore()

const initials = computed(() => {
  if (!userStore.user?.name) return ''
  const firstName = userStore.user.name.split(" ")[0][0] || ''
  const lastName = userStore.user.name.split(" ")[1][0] || ''
  return `${firstName}${lastName}`
})

</script>

<template>
  <header class="app-header">
    <div class="container">
      <div class="content">
        <nav class="nav-section">
          <RouterLink to="/">
            <img src="@/assets/icons/logo.svg" alt="Logo">
          </RouterLink>
          <ul class="menu">
            <li class="menu-item">
              <RouterLink to="/catalog">Товары</RouterLink>
            </li>
            <li class="menu-item">
              <RouterLink to="/shops">Магазины</RouterLink>
            </li>
            <li v-if="userStore.isAdmin" class="menu-item">
              <RouterLink :to="{name: 'categories'}">Админ-панель</RouterLink>
            </li>
          </ul>
        </nav>
        <div class="avatar" v-if="userStore.isLoggedIn">
          <RouterLink to="/profile">
            <p>{{ initials }}</p>
          </RouterLink>
        </div>
        <RouterLink v-else  to="/auth">
          <AppButton>
            Войти
          </AppButton>
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<style scoped>
  .app-header {
    position: relative;
    padding-top: 26px;
    padding-bottom: 26px;
    background-color: var(--ui-white);
  }

  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .nav-section {
    display: flex;
    align-items: center;
    gap: 26px;
  }

  .menu {
    display: flex;
  }

  .menu-item {
    display: flex;
    align-items: center;
    min-width: 120px;
    height: 40px;
    font-family: var(--font-family);
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    border-radius: 8px;
    cursor: pointer;
    transition: color 0.3s ease-in-out;

    a {
      padding: 8px 16px 4px 16px;
      color: #757575;
    }
  }
  .menu-item a:hover {
    color: #595959;
  }

  .avatar {
    padding: 4px 6px;
    font-family: var(--font-family);
    font-weight: 600;
    font-size: 18px;
    line-height: 28px;
    border-radius: 100%;
    background-color: var(--ui-bluish);

    a {
      color: var(--ui-dark-blue);
    }
  }
</style>
