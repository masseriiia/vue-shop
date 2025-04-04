<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import { useCurrentUserStore } from '@/stores/currentUser.ts'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const userStore = useCurrentUserStore()
const { user, isLoggedIn } = storeToRefs(userStore)

onMounted(async () => {
  await userStore.fetchCurrentUser()
})
</script>

<template>
  <header class="app-header">
    <div class="container">
      <div class="content">
        <nav class="nav-section">
          <h1 class="logo"><RouterLink to="/">Vue Shopping</RouterLink></h1>
          <ul class="menu">
            <li class="menu-item">
              <RouterLink to="/catalog">Товары</RouterLink>
            </li>
            <li class="menu-item">
              <RouterLink to="/shops">
                Магазины
              </RouterLink>
            </li>
          </ul>
        </nav>
        <div class="avatar" v-if="isLoggedIn">
          <RouterLink to="/profile">
            <p>{{ user?.name ? `${user.name.split(" ")[0][0]}${user.name.split(" ")[1][0]}` : '' }}</p>
            <p></p>
          </RouterLink>
        </div>
        <RouterLink v-else  to="/auth">
          <AppButton option="base">
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

.logo {
    font-family: var(--second-family);
    font-weight: 700;
    font-size: 48px;
    line-height: 64px;

    a {
      color: var(--ui-accent);
    }
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
    width: 120px;
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
