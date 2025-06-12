<script setup lang="ts">
import { ref } from 'vue';
import { QuillEditor } from '@vueup/vue-quill'

const model = defineModel<string>()
let isFocused = ref(false)
</script>

<template>
  <div class="quill-wrapper" :class="{ focused: isFocused }">
    <QuillEditor
      theme="snow"
      content-type="html"
      v-model:content="model"
      @focus="isFocused = true"
      @blur="isFocused = false"
    />
  </div>
</template>

<style>
.quill-wrapper {
  border: 1px solid transparent;
  border-radius: 8px;
  transition: border-color 0.2s ease;
}

.quill-wrapper.focused {
  border-color: var(--ui-accent);
}

.ql-editor {
  min-height: 260px;
}

.ql-toolbar.ql-snow {
  border-radius: 8px 8px 0px 0px;
}

.ql-container.ql-snow {
  border-radius: 0 0 8px 8px;
}

</style>
