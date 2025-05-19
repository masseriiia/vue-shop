<script setup lang="ts">
interface AppButtonProps {
  disabled?: boolean
  loading?: boolean
  size?: 'small'
  to?: string | object
}

withDefaults(defineProps<AppButtonProps>(), {
  disabled: false,
  loading: false,
})
</script>

<template>
  <component
    :is="to ? 'RouterLink' : 'button'"
    :to="to"
    v-bind="to ? { to } : {}"
    :class="to ? ['app-button', size] : ['app-button', size, { loading: loading }]"
    :disabled="to ? undefined : disabled"
  >
    <slot></slot>
  </component>
</template>

<style scoped>
.app-button {
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

.small {
  font-family: var(--font-family);
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  color: var(--ui-light-gray);
  min-width: 80px;
  height: 22px;
  border-radius: 8px;
  color: var(--ui-light-gray);
  border: 1px solid var(--ui-accent);
  background-color: var(--ui-accent);
}

a {
  display: block;
  width: 100%;
  max-width: 80px;
}
</style>
