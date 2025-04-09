import { instance } from '@/services/api/baseApi.js'
import { getAuthToken } from '@/services/api/authTokenService.js'

export async function getCurrentUserData() {
  const token = getAuthToken()

  if (!token) {
    console.log('Токен не найден');
    return
  }

  try {
    const response = await instance.get('/users/me')
    return response.data
  } catch (error) {
    throw error
  }
}

