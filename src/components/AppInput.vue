<script setup lang="ts">

interface AppInputProps {
  type?: 'text' | 'password' | 'email' | 'number'
  disabled?: boolean
  name?: string
  error?: string | null
  tuchedEmail?: boolean
  tuchedPassword?: boolean
}

withDefaults(defineProps<AppInputProps>(), {
  type: 'text',
  disabled: false
})

const model = defineModel<string | null>('data')
const tuched = defineModel<boolean>('tuched')

const onBlur = () => {
  tuched.value = true
}

</script>

<template>
    <input @blur="onBlur" :disabled="disabled" :class="[{'input-error': error}, 'input']" v-model="model" :name="name" :type="type"/>
    <div class="error">
      <p v-show="error" class="error-text">
      {{ error }}
    </p>
    </div>
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

.error {
  position: relative;
  margin-bottom: 8px;
}

.error-text {
  position: absolute;
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 12px;
  line-height: 117%;
  color: var(--ui-red);
}
</style>