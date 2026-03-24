const express = require('express')
const cors = require('cors')
const db = require("./db")
const bcrypt = require('bcryptjs')
const app = express()

app.use(cors())
app.use(express.json())
//funções post
app.post('/registro', async (req, res) => {
    const {login, senha} = req.body
    const senhaHash = await bcrypt.hash(senha, 10)
    const sql = "INSERT INTO usuario (login, senha) VALUES (?, ?)"
    db.query(sql, [login, senhaHash], (erro) => {
        if(erro){
            return res.status(500).json(erro)
        }
        res.json({msg: "Usuário cadastrado sem hash"})
    })
})
//função de comparação de senhas
app.post('/login', (req, res) => {

    const { login, senha } = req.body

    const sql = "SELECT * FROM usuario WHERE login = ?"

    db.query(sql, [login], async (erro, resultado) => {

        if (erro) return res.status(500).json(erro)

        if (resultado.length === 0) {
            return res.status(401).json({ msg: "Usuário não encontrado" })
        }

        const usuario = resultado[0]

        //  compara hash
        const senhaValida = await bcrypt.compare(senha, usuario.senha)

        if (!senhaValida) {
            return res.status(401).json({ msg: "Senha incorreta" })
        }

        res.json({ msg: "Login com bcrypt OK!" })
    })
})


const PORT = 3027

app.listen(PORT, () => {
    console.log("Servidor rodando na porta: ", PORT)
})