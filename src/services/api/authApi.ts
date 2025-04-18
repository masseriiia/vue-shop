import { setToken } from '@/services/api/authTokenService.js'
import { instance } from '@/services/api/baseApi.js'

export async function startSession(email: string, password: string) {
    const data = await instance.post('/auth/start_session', { email, password})
    setToken(data.data.token)
}
