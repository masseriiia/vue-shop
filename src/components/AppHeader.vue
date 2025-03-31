<script setup lang="ts">

import AppButton from '@/components/AppButton.vue'
</script>

<template>
  <header class="app-header">
    <div class="container">
      <div class="content">
        <nav class="nav-section">
          <h1 class="logo">Vue Shopping</h1>
          <ul class="menu">
            <li class="menu-item">
              <RouterLink to="/">Товары</RouterLink>
            </li>
            <li class="menu-item">
              <RouterLink to="/">
                Магазины
              </RouterLink>
            </li>
          </ul>
        </nav>
        <AppButton option="base">
          Войти
        </AppButton>
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
    line-height: 133%;
    color: var(--ui-accent);
  }

  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .nav-section {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .menu {
    display: flex;
  }

  .menu-item {
    padding: 8px 16px 4px 16px;
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
      color: #757575;
    }
  }
  .menu-item a:hover {
    color: #595959;
  }
</style>
