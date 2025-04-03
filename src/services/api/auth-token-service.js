export function getAuthToken() {
  return localStorage.getItem('auth')
}

export function setToken(token) {
  localStorage.setItem("auth", JSON.stringify(token))
}

export function deleteToken() {
  return localStorage.removeItem("auth")
}
