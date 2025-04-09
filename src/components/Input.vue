<script setup lang="ts">

const props = defineProps<{
    disabled: boolean
    type: string
}>()

const model = defineModel<string>('data')

</script>

<template>
    <input :disabled="disabled" :class="[disabled ? 'form-input-auth' : 'form-input'] " v-model="model" :type="type"/>
</template>

<style scoped>

.form-input {
  padding: 12px 16px;
  border: 1px solid #d9d9d9;
  font-size: 14px;
  border-radius: 8px;
}

.form-input:focus {
    outline: 1px solid var(--ui-gray);
}

.form-input-auth {
  padding: 12px 16px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  opacity: 0.33;
}
</style>