//importat o msqly2
const mysql = require('mysql2')

//criar a conexão
const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'alunolab',
    database: 'sistema_login',
    port: '3303'
})
//conect
conexao.connect((erro) => {
    if(erro){
        console.log("Erro: ", erro)
    }else{
        console.log("Conectado ao banco de dados")
    }
})
module.exports = conexao