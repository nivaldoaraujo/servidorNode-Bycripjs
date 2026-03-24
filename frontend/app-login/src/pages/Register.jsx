import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerRequest } from '../service/api'

export default function Register() {
  const [login, setLogin] = useState('')
  const [senha, setSenha] = useState('')
  const navigate = useNavigate()

  const handleRegister = async () => {
    if (!login || !senha) {
      return alert('Preencha todos os campos')
    }

    try {
      const res = await registerRequest(login, senha)
      const data = await res.json()

      if (res.ok) {
        alert(data.msg)
        navigate('/')
      } else {
        alert('Erro ao cadastrar')
      }

    } catch {
      alert('Erro no servidor')
    }
  }

  return (
    <div style={styles.container}>
      <h2>Cadastro</h2>

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

      <button onClick={handleRegister}>Cadastrar</button>
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