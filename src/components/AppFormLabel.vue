<script setup lang="ts">
defineProps<{
  text?: string
}>()
</script>

<template>
  <div class="app-form-label">
    <label class="app-form-label-text">{{ text }}</label>
    <slot></slot>
  </div>
</template>

<style scoped>
.app-form-label {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 520px;
}
.app-form-label-text {
  margin-bottom: 8px;
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: var(--ui-dark-gray);
}
</style>
