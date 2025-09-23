const express = require('express')
const router = express.Router()

let professores = [
    {
        id: 1,
        nome: "Gustavo Clay",
        email: "Gustavo@Clay.com",
        cpf:"35912854854",
        curso: "ADS",
        disciplina: "Construção de back-end"
    },
    {
        id: 2,
        nome: "Marcelo Paiva",
        email: "Marcelo@Paiva.com",
        cpf:"3591365254",
        disciplina: "ADS",
        curso: "engenharia de software e metodos agéis"
    }
]

router.post('/professores', (req, res, next) => {
const {nome, cpf, email, disciplina, curso} = req.body

if(!nome|| !cpf || !email || !disciplina || !curso)    {
    return res.status(400).json({error: "nome, cpf, email, disciplina e curso são obrigatorios"})
}

const professor = professores.find (professor => professor.cpf == cpf)
if(professor){
    return res.status(409).json({error: "CPF já cadastrado"})
}
// cadastrar o novo professor na lista
const novoProfessor = {
    id: Date.now(),
    nome,
    cpf, 
    email,
    disciplina,
    curso
}
// inserir o novo Professor montada na lista
professores.push(novoProfessor)
res.status(201).json({message: "Professor Cadastrado!!!!", novoProfessor})

})

// Listar todos
// - GET /professores
router.get('/professores', (req, res, next) => {
    res.json(professores)
})

// Buscar um
// - GET /professores/{id}
router.get('/professores/:id', (req, res, next) => {
    const idRecebido = req.params.id
    const professor = professores.find(professor => professor.id == idRecebido)
    if(!professor) {
        return res.status(404).json({error: "Professor não encontrado!!!" })
    } 
    res.json(professor)

})

// atualizar
// - PUT /professores/{id}
router.put('/professores/:id', (req, res, next) => {
    const {nome, email, disciplina, curso} = req.body
if(!nome || !email || !disciplina || !curso){
    return res.status(400).json({error: "nome, email , disciplina, e curso são obrigatorios"})
}
// validar se o professor com aquele ID existe na lista
const idRecebido = req.params.id
const professor = professores.find(professor => professor.id == idRecebido)
if(!professor){
    return res.status(404).json({error: "Professor não encontrado"})
}
// sobreescreve os dados dos professores pra atualizar
professor.nome = nome
professor.email = email
professor.disciplina = disciplina
professor.curso = curso
res.json({message: "Professor atualizado com sucesso"})
})

// deletar
// - DELETE /professores/{id}
router.delete('/professores/:id', (req, res, next) => {
    const idRecebido = req.params.id
    const professor = professores.find(professor => professor.id == idRecebido)
    if (!professor) {
        return res.status(404).json({error:"Professor não encontrado"})
    }
    professores = professores.filter(professor => professor.id != idRecebido)

    res.json({message: "Professor excluido com sucesso"})
})



module.exports = router
