<script setup lang="ts">
import { uploadFile } from '@/services/api/filesApi'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import AppLoading from './AppLoading.vue'
import { getFormValidationErrors } from '@/utils/getFormValidationErrors'

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
const progress = ref(0)
const inputId = ref(`file-input-${self.crypto.randomUUID()}`)

async function uploadAndSetFile(file: File) {
  const data = await uploadFile(file, (percent) => {
    progress.value = percent
  })
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
    const { validationErrors, validationErrorMessage } = getFormValidationErrors(error)

    if (validationErrorMessage) {
      emit('error', validationErrors.file)
      toast.error(validationErrorMessage)
    }

    if (error instanceof Error) {
      toast.error(error.message)
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="image-uploader">
    <div class="uploader-wrapper">
      <input
        class="uploader-input"
        type="file"
        @change="handleImageUploader"
        :disabled="disabled"
        :id="inputId"
      />
      <label class="uploader-label" :for="inputId">
        <template v-if="isLoading">
          <AppLoading class="uploader-loading" />
          <p>{{ progress }} %</p>
        </template>

        <div v-else>
          <div v-if="model" class="uploader-content">
            <img :src="model" class="uploader-image" alt="Изображение" />
          </div>
          <div v-else>
            <p class="uploader-text">Кликните чтобы добавить изображение</p>
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

<style scoped>
.image-uploader {
  width: 220px;
  height: 112px;
}

.uploader-wrapper {
  position: relative;
  cursor: pointer;
}

.uploader-input {
  position: absolute;
  opacity: 0;
}

.uploader-loading {
  height: 60px;
}

.uploader-label {
  margin-top: 10px;
  width: 220px;
  height: 112px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  cursor: pointer;
  border: 1px dashed var(--ui-accent);
  transition: all 0.3s ease-in-out;
}

.uploader-label:hover {
  background-color: var(--ui-light-gray);
  border: 1px solid var(--ui-accent);
}

.uploader-content {
  width: 220px;
  height: 112px;
  border-radius: 8px;
}

.uploader-image {
  width: 220px;
  height: 112px;
  object-fit: contain;
  border-radius: 8px;
  border: 1px solid var(--ui-accent);
}

.uploader-text {
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
