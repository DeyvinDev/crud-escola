const express = require('express')
const router = express.Router()

// mapeamento dos endpoint e a lógica
// Lista de pessoas para simular o banco de dados
let pessoas = [
    {
        id: 1,
        nome: "Gay irritado",
        cpf:"35912854854",
        email: "gayirrita@trveco.com",
        dataNascimento: "17/12/0004"
    },
    {
        id: 2,
        nome: "Firmino fenomeno",
        cpf:"3591365254",
        email: "comedorde@trveco.com",
        dataNascimento: "23/12/0004"
    }
]

// Criar
// - POST /pessoas
router.post('/pessoas', (req, res, next) => {
const {nome, cpf, email, dataNascimento} = req.body
// validar se os dados ieram
if(!nome|| !cpf || !email || !dataNascimento)    {
    return res.status(400).json({error: "nome, cpf, email e data de nascimento são obrigatorios"})
}
// validar se o CPF ja existe
const pessoa = pessoas.find (pessoa => pessoa.cpf == cpf)
if(pessoa){
    return res.status(409).json({error: "CPF já cadastrado"})
}
// cadastrar a nova pessoa na lista
const novaPessoa = {
    id: Date.now(),
    nome,
    cpf, 
    email,
    dataNascimento
}
// inserir a nova pessoa montada na lista
pessoas.push(novaPessoa)
res.status(201).json({message: "Pessoa Cadastrada!!!!", novaPessoa})

})

// Listar todos
// - GET /pessoas
router.get('/pessoas', (req, res, next) => {
    res.json(pessoas)
})

// Buscar um
// - GET /pessoas/{id}
router.get('/pessoas/:id', (req, res, next) => {
    const idRecebido = req.params.id
    const pessoa = pessoas.find(p => p.id == idRecebido)
    if(!pessoa) {
        return res.status(404).json({error: "Pessoa não encontrada!!!" })
    } 
    res.json(pessoa)

})

// atualizar
// - PUT /pessoas/{id}
router.put('/pessoas/:id', (req, res, next) => {
    const {nome, email, dataNascimento} = req.body
if(!nome || !email || !dataNascimento){
    return res.status(400).json({error: "nome, email e data de nascimento são obrigatorios"})
}
// validar se a pessoa com aquele ID existe na lista
const idRecebido = req.params.id
const pessoa = pessoas.find(pessoa => pessoa.id == idRecebido)
if(!pessoa){
    return res.status(404).json({error: "pessoa não encontrada"})
}
// sobreescreve os dados das pessoas pra atualizar
pessoa.nome = nome
pessoa.email = email
pessoa.dataNascimento = dataNascimento
res.json({message: "Pessoa atualizada com sucesso"})
})

// deletar
// - DELETE /pessoas/{id}
router.delete('/pessoas/:id', (req, res, next) => {
    const idRecebido = req.params.id
    const pessoa = pessoas.find(pessoa => pessoa.id == idRecebido)
    if (!pessoa) {
        return res.status(404).json({error:"Pessoa não encontrada"})
    }
    pessoas = pessoas.filter(pessoa => pessoa.id != idRecebido)

    res.json({message: "Pessoa excluida com sucesso"})
})











module.exports = router