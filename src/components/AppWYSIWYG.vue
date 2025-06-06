<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill';

const model = defineModel<string>()

</script>

<template>
  <QuillEditor theme="snow" content-type="html" v-model:content="model" />
</template>

<style>
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
