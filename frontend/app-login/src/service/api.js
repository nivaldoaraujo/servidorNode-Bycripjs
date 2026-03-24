const BASE_URL = 'http://localhost:3027'

export async function loginRequest(login, senha) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ login, senha })
  })

  return res
}

export async function registerRequest(login, senha) {
  const res = await fetch(`${BASE_URL}/registro`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ login, senha })
  })

  return res
}
