import { setToken } from '@/services/api/authTokenService.js'
import { instance } from '@/services/api/baseApi.js'

export function startSession(email: string, password: string) {
  return instance
    .post('/auth/start_session', { email, password})
    .then((res) => {
      setToken(res.data.token)
    })
    .catch((error) => {
      throw error
    })
}
