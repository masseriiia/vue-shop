<script setup lang="ts">
import { uploadFile } from '@/services/api/filesApi'
import axios from 'axios'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import AppLoading from './AppLoading.vue'

interface AppInputProps {
  disabled?: boolean
  name?: string
  error?: string | null
}

withDefaults(defineProps<AppInputProps>(), {
  disabled: false,
  name: '',
  error: null,
})

const emit = defineEmits<{
  (e: 'error', value: string): void
}>()

const model = defineModel<string>()
const toast = useToast()
const isLoading = ref(false)

async function uploadAndSetFile(file: File) {
  const data = await uploadFile(file)
  model.value = 'https://shop-api.public.homekube.ru' + data.data.fileUrl
}

async function handleImageUploader(event: Event) {
  event.preventDefault()
  const target = event.target as HTMLInputElement
  if (!target.files?.length) return
  try {
    isLoading.value = true
    await uploadAndSetFile(target.files[0])
  } catch (error) {
    if (axios.isAxiosError(error) && error.status === 400 && error.response?.data.message) {
      emit('error', error.response?.data.errors.file)
      toast.error(error.response?.data.message)
    } else if (error instanceof Error) {
      toast.error(error.message)
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="file-uploader">
    <div class="file-wrapper">
      <input
        class="input-file"
        type="file"
        @change="handleImageUploader"
        :disabled="disabled"
        id="input-file"
      />
      <label class="upload-label" for="input-file">
        <AppLoading v-if="isLoading" />

        <div v-else>
          <div v-if="model" class="upload-content">
            <img :src="model" class="upload-image" alt="Изображение" />
          </div>
          <div v-else>
            <p class="upload-text">Кликните чтобы добавить изображение</p>
          </div>
        </div>
      </label>
    </div>

    <div class="error">
      <p v-show="error" class="error-text">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<style>
.file-uploader {
  width: 220px;
  height: 112px;
}

.file-wrapper {
  position: relative;
  cursor: pointer;
}

.input-file {
  position: absolute;
  opacity: 0;
}

.upload-label {
  margin-top: 10px;
  width: 220px;
  height: 112px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  cursor: pointer;
  border: 1px dashed var(--ui-accent);
  transition: all 0.3s ease-in-out;
}

.upload-label:hover {
  background-color: var(--ui-light-gray);
  border: 1px solid var(--ui-accent);
}

.upload-content {
  width: 220px;
  height: 112px;
  border-radius: 8px;
}

.upload-image {
  width: 220px;
  height: 112px;
  object-fit: contain;
  border-radius: 8px;
  border: 1px solid var(--ui-accent);
}

.upload-text {
  text-align: center;
  width: 127px;
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
  line-height: 14px;
  color: var(--ui-red);
}
</style>
