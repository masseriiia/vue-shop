import { setToken } from '@/services/api/auth-token-service.js'
import { instance } from '@/services/api/base-api.js'
import { useCurrentUserStore } from '@/stores/currentUser.js'
import { storeToRefs } from 'pinia'

export function startSession(email, password) {
  const userStore = useCurrentUserStore();
  return instance
    .post('/auth/start_session', { email, password})
    .then((res) => {
      setToken(res.data.token)
      userStore.isLoggedIn = true
      return userStore.fetchCurrentUser();
    })
    .catch((err) => {
      userStore.message = err.response?.data.message
      console.error('Ошибка!',err.response?.data.message)
    })
}


