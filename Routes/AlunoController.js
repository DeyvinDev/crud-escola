const express = require('express')
const router = express.Router()

// mapeamento dos endpoint e a lógica
// Lista de alunos para simular o banco de dados
let alunos = [
    {
        id: 1,
        nome: "Deyvison Brito",
        cpf:"777777777777777",
        email: "deyvindev@gmail.com",
        dataNascimento: "17/12/2004",
        telefone: "61999999999"
    },
    {
        id: 2,
        nome: "Firmino fenomeno",
        cpf:"3591365254",
        email: "firminoria@outlook.com",
        dataNascimento: "23/12/0004",
        telefone: "611111111111"
    },
    {
        id: 3,
        nome: "Migão",
        cpf:"3591365254",
        email: "migaoenoisquita@gmail.com",
        dataNascimento: "23/12/1999",
        telefone: "6177777777777"
    }
]

// Criar
// - POST /alunos
router.post('/alunos', (req, res, next) => {
    const {nome, cpf, email, dataNascimento, telefone} = req.body
    // validar se os dados vieram
    if(!nome|| !cpf || !email || !dataNascimento) {
        return res.status(400).json({error: "nome, cpf, email e data de nascimento são obrigatorios"})
    }
    // validar se o CPF ja existe
    const aluno = alunos.find(aluno => aluno.cpf == cpf)
    if(aluno){
        return res.status(409).json({error: "CPF já cadastrado"})
    }
    // cadastrar o novo aluno na lista
    const novoAluno = {
        id: Date.now(),
        nome,
        cpf, 
        email,
        dataNascimento,
        telefone
    }
    // inserir o novo aluno na lista
    alunos.push(novoAluno)
    res.status(201).json({message: "Aluno cadastrado com sucesso!", novoAluno})
})

// Listar todos
// - GET /alunos
router.get('/alunos', (req, res, next) => {
    res.json(alunos)
})

// Buscar um
// - GET /alunos/{id}
router.get('/alunos/:id', (req, res, next) => {
    const idRecebido = req.params.id
    const aluno = alunos.find(p => p.id == idRecebido)
    if(!aluno) {
        return res.status(404).json({error: "Aluno não encontrado!!!" })
    } 
    res.json(aluno)
})

// atualizar
// - PUT /alunos/{id}
router.put('/alunos/:id', (req, res, next) => {
    const {nome, email, dataNascimento, telefone} = req.body
    if(!nome || !email || !dataNascimento){
        return res.status(400).json({error: "nome, email e data de nascimento são obrigatorios"})
    }
    // validar se o aluno com aquele ID existe na lista
    const idRecebido = req.params.id
    const aluno = alunos.find(aluno => aluno.id == idRecebido)
    if(!aluno){
        return res.status(404).json({error: "Aluno não encontrado"})
    }
    // sobreescreve os dados do aluno para atualizar
    aluno.nome = nome
    aluno.email = email
    aluno.dataNascimento = dataNascimento
    aluno.telefone = telefone
    res.json({message: "Aluno atualizado com sucesso"})
})

// deletar
// - DELETE /alunos/{id}
router.delete('/alunos/:id', (req, res, next) => {
    const idRecebido = req.params.id
    const aluno = alunos.find(aluno => aluno.id == idRecebido)
    if (!aluno) {
        return res.status(404).json({error:"Aluno não encontrado"})
    }
    alunos = alunos.filter(aluno => aluno.id != idRecebido)

    res.json({message: "Aluno excluido com sucesso"})
})

module.exports = router
