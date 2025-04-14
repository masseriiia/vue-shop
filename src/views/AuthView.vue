<script setup lang="ts">
import axios from "axios";
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router'
import AppButton from '@/components/AppButton.vue'
import { startSession } from '@/services/api/authApi.ts'
import { computed, reactive, ref } from 'vue'
import { useCurrentUserStore } from '@/stores/currentUser.ts'
import Input from "@/components/Input.vue";

const toast = useToast();
const userStore = useCurrentUserStore()
const { isLoggedIn } = storeToRefs(userStore)
const router = useRouter();
const auth = reactive({
  email: '',
  password: '',
})
const showEmailError = ref(false)
const showPasswordError = ref(false)
const isDisable = ref(false)

const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const emailErrorText = computed(() => {
  const email = auth.email.trim();
  if (email.length === 0) return 'Это поле обязательно'
  if (!validateEmail(email)) return 'Неверный формат email'
  return ''
})

const validate = () => {
  const isEmailValid = auth.email.length > 0 && validateEmail(auth.email)
  const isPasswordValid = auth.password.length > 0
  if(auth.email.length === 0) {
      showEmailError.value = true
    }
    if(auth.password.length === 0) {
      showPasswordError.value = true
    }
  return isEmailValid && isPasswordValid
}

const handleLoginSubmit = async () => {
  if(!validate()) return 

  try{
    isDisable.value = true
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
    }
  }finally {
    isDisable.value = false
  }
}

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  if(target.name === 'email') {
    showEmailError.value = auth.email.length === 0 || !validateEmail(auth.email)
  } else if(target.name === 'password') {
    showPasswordError.value = auth.password.length === 0
  }
}

const handleLogout = () => {
  userStore.logout()
}

</script>

<template>
  <template v-if="userStore.isLoggedIn">
    <div class="auth">
      <form class="auth-card">
        <div class="auth-field">
          <label class="auth-field-label-auth" for="password">Вы авторизованы как</label>
          <Input disabled v-model:data="userStore.user.email" type="text"/>
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
          <Input @input="handleInput" :disabled="false" name="email" :error="showEmailError" v-model:data="auth.email"/>
          <div class="error">
            <p v-show="showEmailError" class="error-text">
              {{ emailErrorText }}
            </p>
          </div>
        </div>
        <div class="auth-field">
          <label class="auth-field-label" for="password">Пароль</label>
          <Input @input="handleInput" :disabled="false" name="password" :error="showPasswordError" v-model:data="auth.password" type="password"/>
          <div class="error">
            <p v-show="showPasswordError" class="error-text">Это поле обязательно</p>
          </div>
        </div>
        <AppButton :loading="isDisable" :disabled="isDisable">Войти</AppButton>
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
  gap: 16px;
  border-radius: 8px;
  width: 100%;
  max-width: 320px;
  background-color: var(--ui-white);
}

.auth-field{
  display: flex;
  flex-direction: column;
  gap: 8px;
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
