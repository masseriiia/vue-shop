<script setup lang="ts">
import axios from "axios";
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router'
import AppButton from '@/components/AppButton.vue'
import { startSession } from '@/services/api/authApi.js'
import { reactive } from 'vue'
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

const onSubmitButton = async () => {
  try{
    await startSession(auth.email, auth.password)
    await userStore.fetchCurrentUser()
    toast.success('Вы успешно авторизовались');
    if (isLoggedIn.value) {
      router.push('/catalog');
    }
    auth.email = ''
    auth.password = ''
  } catch (error) {
    if(axios.isAxiosError(error) && error.status === 400 && error.response.data.message) {
      toast.error(error.response.data.message);
    }
  }
}

const handleLogout = () => {
  userStore.logout()
}

</script>

<template>
  <template v-if="userStore.isLoggedIn">
    <div class="auth">
      <form class="auth-form">
        <div class="form-group">
          <label class="form-group-label-auth" for="password">Вы авторизованы как</label>
          <Input disabled v-model:data="userStore.user.email" type="text"/>
        </div>
        <AppButton option="base" @click="handleLogout">Выйти из аккаунта</AppButton>
      </form>
    </div>
  </template>

  <template v-else>
    <div class="auth">
      <form class="auth-form" @submit.prevent="onSubmitButton">
        <div class="form-group">
          <label class="form-group-label" for="email">Email</label>
          <Input :disabled="false" v-model:data="auth.email" type="text"/>
        </div>
        <div class="form-group">
          <label class="form-group-label" for="password">Пароль</label>
          <Input :disabled="false" v-model:data="auth.password" type="password"/>
        </div>
        <AppButton option="base">Войти</AppButton>
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

.auth-form {
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  border-radius: 8px;
  width: 100%;
  max-width: 320px;
  background-color: var(--ui-white);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group-label {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: var(--ui-dark-gray);
}

.form-group-label-auth {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: var(--ui-dark-gray);
  opacity: 0.33;
}

.form-group-input-auth {
  padding: 12px 16px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  opacity: 0.33;
}
</style>
