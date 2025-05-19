<script setup lang="ts"></script>

<template>
  <div class="error">
    <div class="content">
      <img src="@/assets/images/404.png" alt="404" />
      <p class="title">Такой страницы не существует</p>
    </div>
  </div>
</template>

<style scoped>
.error {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
}

.content {
  padding-bottom: 38px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 680px;
  border-radius: 8px;
  background-color: var(--ui-white);
  box-shadow: 0 4px 4px 0 rgba(39, 81, 102, 0.17);
}

.title {
  font-family: var(--font-family);
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  color: var(--ui-black);
}
</style>
