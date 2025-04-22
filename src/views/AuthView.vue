<script setup lang="ts">
import axios from "axios";
import { computed, reactive, ref } from 'vue'
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router'
import AppButton from '@/components/AppButton.vue'
import { startSession } from '@/services/api/authApi.ts'
import { useCurrentUserStore } from '@/stores/currentUser.ts'
import AppInput from "@/components/AppInput.vue";

const toast = useToast();
const userStore = useCurrentUserStore()
const { user, isLoggedIn } = storeToRefs(userStore)
const router = useRouter();
const auth = reactive({
  email: '',
  password: '',
})
const tuched = reactive({email: false, password: false})
const isLoading = ref(false)

const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const emailErrorText = computed(() => {
  const email = auth.email.trim();
  if (email.length === 0) return 'Это поле обязательно'
  if (!validateEmail(email)) return 'Неверный формат email'
  return null
})

const passwordErrorText = computed(() => {
  const password = auth.password
  if (password.length === 0) return 'Это поле обязательно'
  return null
})

const isSubmitDisabled = computed(() => {
  return !!emailErrorText.value || !!passwordErrorText.value
})

const handleLoginSubmit = async () => {
  isLoading.value = true
  try{
    await startSession(auth.email, auth.password)
    await userStore.fetchCurrentUser()
    toast.success('Вы успешно авторизовались');
    auth.email = ''
    auth.password = ''

    if (isLoggedIn.value) {
      router.push('/catalog');
    }
  } catch (error) {
    if(axios.isAxiosError(error) && error.status === 400 && error.response?.data.message) {
      toast.error(error.response?.data.message);
    } else if(error instanceof Error)  {
      toast.error(error.message)
    }
  } finally {
    isLoading.value = false
  }
}

const handleLogout = () => {
  userStore.logout()
}

</script>

<template>
  <template v-if="isLoggedIn && user">
    <div class="auth">
      <form class="auth-card">
        <div class="auth-field">
          <label class="auth-field-label-auth" for="password">Вы авторизованы как</label>
          <AppInput disabled v-model:data="user.email"/>
        </div>
        <AppButton @click="handleLogout">Выйти из аккаунта</AppButton>
      </form>
    </div>
  </template>

  <template v-else>
    <div class="auth">
      <form class="auth-card" @submit.prevent="handleLoginSubmit">
        <div class="auth-field">
          <label class="auth-field-label" for="email">Email</label>
          <AppInput name="email" :error="tuched.email ? emailErrorText : null" v-model:data="auth.email" v-model:tuched="tuched.email"/>
        </div>
        <div class="auth-field">
          <label class="auth-field-label" for="password">Пароль</label>
          <AppInput name="password" :error="tuched.password ? passwordErrorText : null" v-model:data="auth.password" v-model:tuched="tuched.password" type="password"/>
        </div>
        <AppButton :loading="isLoading" :disabled="isSubmitDisabled">Войти</AppButton>
      </form>
    </div>
  </template>
</template>

<style scoped>
.auth {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
}

.auth-card{
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 14px;
  border-radius: 8px;
  width: 100%;
  max-width: 320px;
  background-color: var(--ui-white);
}

.auth-field{
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.auth-field-label {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: var(--ui-dark-gray);
}

.auth-field-label-auth {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: var(--ui-dark-gray);
  opacity: 0.33;
}

</style>
