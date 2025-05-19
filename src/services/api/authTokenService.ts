const AUTH_TOKEN_KEY_NAME = 'vue_shoping_auth_token'

export function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY_NAME)
}

export function setToken(token: string): string | void | null {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token)
}

export function deleteToken() {
  return localStorage.removeItem(AUTH_TOKEN_KEY_NAME)
}
