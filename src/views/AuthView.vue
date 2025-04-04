<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router'
import AppButton from '@/components/AppButton.vue'
import { startSession } from '@/services/api/auth-api.js'
import { onMounted, reactive, ref } from 'vue'
import { useCurrentUserStore } from '@/stores/currentUser.ts'

const toast = useToast();
const userStore = useCurrentUserStore()
const { user, isLoggedIn } = storeToRefs(userStore)
const router = useRouter();
const isUserLoading = ref(true)
const auth = reactive({
  email: '',
  password: '',
})

const showToast = () => {
  if (userStore.isLoggedIn) {
    toast.success('Вы успешно авторизовались');
  } else {
    toast.error(userStore.message);
  }
};

const onSubmitButton = async () => {
  isUserLoading.value = true
  try{
    await startSession(auth.email, auth.password)
    await showToast(userStore.message)
    if (userStore.isLoggedIn) {
      router.push('/catalog');
    }
    auth.email = ''
    auth.password = ''
  } catch (e) {
    console.error(e)
  } finally {
    isUserLoading.value = false
  }
}

const handleLogout = () => {
  userStore.logout()
  userStore.fetchCurrentUser()
}

onMounted(async () => {
  await userStore.fetchCurrentUser()
  isUserLoading.value = false
})

</script>

<template>
  <template v-if="isUserLoading">
    <div>Загрузка...</div>
  </template>

  <template v-else-if="isLoggedIn && user">
    <div class="auth">
      <form class="auth-form">
        <div class="form-group">
          <label class="form-group-label-auth" for="password">Вы авторизованы как</label>
          <input disabled class="form-group-input-auth" v-model="user.email" type="text" />
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
          <input class="form-group-input" v-model="auth.email" type="text" />
        </div>
        <div class="form-group">
          <label class="form-group-label" for="password">Password</label>
          <input class="form-group-input" v-model="auth.password" type="password" />
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
  gap: 10px;
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

.form-group-input {
  padding: 12px 16px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
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
