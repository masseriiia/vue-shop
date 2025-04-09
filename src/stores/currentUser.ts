import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { getCurrentUserData } from '@/services/api/userApi.js'
import { deleteToken } from '@/services/api/authTokenService'

interface UserProps {
  id: number
  email: string
  name: string
  role: string
}

export const useCurrentUserStore = defineStore('user', () => {
  const user = ref<UserProps | null>(null);
  const isLoading = ref(false)

  const isLoggedIn = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  async function fetchCurrentUser() {
    isLoading.value = true 
    try {
      const data = await getCurrentUserData()
      user.value = data
      console.log(123)
    } finally {
      isLoading.value = false  
    }
  }

  function logout() {
    user.value = null
    deleteToken()
  }

  return { user, isLoggedIn, isAdmin, fetchCurrentUser, logout, isLoading }
})
