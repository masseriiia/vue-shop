import { instance } from '@/services/api/baseApi.js'
import { getAuthToken } from '@/services/api/authTokenService.js'
import type { User } from '@/types/user';

export async function getCurrentUserData(): Promise<User | null> {
  const token = getAuthToken()

  if (!token) {
    console.log('Токен не найден');
    return null
  }

  const response = await instance.get<User>('/users/me')
  return response.data
}

