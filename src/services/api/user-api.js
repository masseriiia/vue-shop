import { instance } from '@/services/api/base-api.js'
import { getAuthToken } from '@/services/api/auth-token-service.js'

export async function getCurrentUserData() {
  const token = getAuthToken()

  if (!token) {
    console.error('Нет токена авторизации!')
    return
  }
  try {
    const response = await instance.get('/users/me')
    return response.data
  } catch (e) {
    console.error(e)
  }
}

