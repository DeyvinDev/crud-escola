const express = require('express')
const app = express()


const cors = require('cors')
app.use(cors())

app.use(express.json())
// LOG
app.use((req,res,next) =>{
    console.log("####### LOG de requisição ######")
    console.log("Time: ", new Date().toLocaleString())
    console.log("metodo: ", req.method)
    console.log("Rota: ", req.url)
    next()
})

// Roteadores
const AlunoController = require('./routes/AlunoController')
app.use(AlunoController)

const ProfessorController = require('./routes/ProfessorController')
app.use(ProfessorController)

// executa
app.listen(3000, () => {
    console.log("Api rodando em http://localhost:3000")
})
