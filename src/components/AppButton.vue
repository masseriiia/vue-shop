<script setup lang="ts">
 const props = defineProps<{
   option: string
 }>()
</script>

<template>
  <button :class="[option]">
    <slot></slot>
  </button>
</template>

<style scoped>
.base {
  padding: 12px;
  min-width: 120px;
  height: 40px;
  border-radius: 8px;
  color: var(--ui-light-gray);
  border: 1px solid var(--ui-accent);
  background: var(--ui-accent);
  transition: background 0.3s ease-in-out;
  cursor: pointer;
}

.base:hover {
  background: var(--ui-accent-active);
}

.base:focus {
  border: 2px solid var(--ui-accent);
  background: var(--ui-accent-active);
}
</style>
