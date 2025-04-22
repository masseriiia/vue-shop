<script setup lang="ts">

interface AppButtonProps {
  disabled?: boolean
  loading?: boolean
  customClass?: string
}

withDefaults(defineProps<AppButtonProps>(), {
  disabled: false,
  loading: false,
  customClass: ''
})

</script>

<template>
  <button :disabled="disabled" :class="['app-button', {'loading': loading}, customClass]">
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
  opacity: 0.5;
  border: 1px solid var(--ui-accent-active);
  animation: loading-animation 2s infinite;
}

.loading:focus {
  border: 1px solid var(--ui-accent-active);
}

@keyframes loading-animation {
  0% {
    box-shadow: 0 0 0 0px rgba(0, 0, 0, 0.2);
  }
  100% {
    box-shadow: 0 0 0 20px rgba(0, 0, 0, 0);
  }
}

.app-button-secondary {
  padding: 0px;
  min-width: 80px;
  font-family: var(--font-family);
  font-weight: 500;
  font-size: 12px;
  line-height: 167%;
  text-align: center;
  color: #f5f5f5;
  height: 22px;
  border-radius: 8px;
  color: var(--ui-light-gray);
  border: 1px solid var(--ui-accent);
  background-color: var(--ui-accent);
}

</style>
