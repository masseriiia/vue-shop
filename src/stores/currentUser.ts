import { defineStore } from 'pinia'
import { getCurrentUserData } from '@/services/api/user-api.js'
import { deleteToken, getAuthToken } from '@/services/api/auth-token-service'

export const useCurrentUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isLoggedIn: !!getAuthToken(),
    isAdmin: false,
    message: ''
  }),
  actions: {
     async fetchCurrentUser() {
      try {
        const data = await getCurrentUserData()
        this.user = data
        this.isLoggedIn = !!data
        if(this.user.role === "admin") {
          this.isAdmin = true
        }
      } catch (e) {
        console.log(e)
        this.isLoggedIn = false
      }
    },
    logout() {
      if(this.user?.role === "admin") {
        this.isAdmin = false
      }
      this.user = null
      this.isLoggedIn = false
      deleteToken()
    }
  }
})
