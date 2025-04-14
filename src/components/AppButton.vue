<script setup lang="ts">
const props = defineProps<{
  disabled?: boolean
  loading?: boolean
}>()

</script>

<template>
  <button :disabled="disabled" :class="[{'loading': loading}, 'app-button']">
    <slot></slot>
  </button>
</template>

<style scoped>
.app-button {
  padding: 12px;
  min-width: 120px;
  height: 40px;
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  border-radius: 8px;
  color: var(--ui-light-gray);
  border: 1px solid var(--ui-accent);
  background: var(--ui-accent);
  transition: background 0.3s ease-in-out;
  cursor: pointer;
}

.app-button:hover {
  background: var(--ui-accent-active);
  border: 1px solid var(--ui-accent-active);
}

.app-button:focus {
  border: 2px solid var(--ui-accent);
  background: var(--ui-accent-active);
}

.app-button:disabled {
  opacity: 0.5;
}

.loading {
  animation: loading-animation 2s infinite;
}

@keyframes loading-animation {
  0% {
    box-shadow: 0 0 0 0px rgba(0, 0, 0, 0.2);
  }
  100% {
    box-shadow: 0 0 0 20px rgba(0, 0, 0, 0);
  }
}

</style>
