import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { getCurrentUserData } from '@/services/api/userApi.js'
import { deleteToken } from '@/services/api/authTokenService'
import type { User } from '@/types/user'

export const useCurrentUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const isLoading = ref(false)

  const isLoggedIn = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  async function fetchCurrentUser() {
    isLoading.value = true
    try {
      const data = await getCurrentUserData()
      user.value = data
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
