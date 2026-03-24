import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginRequest } from '../service/api'

export default function Login() {
  const [login, setLogin] = useState('')
  const [senha, setSenha] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    if (!login || !senha) {
      return alert('Preencha todos os campos')
    }

    try {
      const res = await loginRequest(login, senha)
      const data = await res.json()

      if (res.ok) {
        alert(data.msg)
        navigate('/admin')
      } else {
        alert(data.msg)
      }

    } catch {
      alert('Erro ao conectar com servidor')
    }
  }

  return (
    <div style={styles.container}>
      <h2>Login</h2>

      <input
        placeholder="Usuário"
        value={login}
        onChange={e => setLogin(e.target.value)}
      />

      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={e => setSenha(e.target.value)}
      />

      <button onClick={handleLogin}>Entrar</button>

      <p onClick={() => navigate('/register')} style={{ cursor: 'pointer', color: 'blue' }}>
        Criar conta
      </p>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    margin: '100px auto',
    gap: '10px'
  }
}