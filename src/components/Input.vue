<script setup lang="ts">

interface Props {
  type?: string
  disabled?: boolean
  name?: string
  error?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text'
})

const model = defineModel<string>('data')

</script>

<template>
    <input :disabled="props.disabled" :class="[{'input-error': error}, 'input']" v-model="model" :name="name" :type="type"/>
</template>

<style scoped>

.input {
  padding: 12px 16px;
  border: 1px solid var(--ui-pale-gray);
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  color: #000;
  border-radius: 8px;
}

.input:focus {
  outline: 1px solid var(--ui-gray);
}

.input:disabled {
  padding: 12px 16px;
  border: 1px solid var(--ui-pale-gray);
  border-radius: 8px;
  opacity: 0.33;
}

.input-error {
  border: 1px solid var(--ui-red);
}
</style>