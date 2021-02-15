import * as Yup from 'yup'
import bcrypt from 'bcryptjs'
import Class from '../models/Class'

class ClassController {

    async create(req, res) {
        const schema = Yup.object().shape({
            subject: Yup.string()
            .required(),
            subclass: Yup.string()
                .required(),
            vacancies: Yup.number()
                .required(),
            studentsin: Yup.number()
                .required(),
            professor: Yup.string()
            .required(),
            price: Yup.number()
            .required()
        })

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                code: 103,
                message: "Error: Dados inválidos!"
            })
        }

        const data = req.body

        const classExists = await Class.findOne({ subject:  data.subject})
        if (classExists && classExists.subclass == data.subclass) {
            return res.status(400).json({
                error: true,
                code: 102,
                message: "Error: Esta turma já está cadastrada!"
            })
        }


        const classe = await Class.create(data, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 101,
                message: "Error: Turma não foi cadastrado com sucesso!"
            })

            return res.status(200).json({
                error: false,
                message: "Turma cadastrado com sucesso!",
                dados: classe
            })
        })
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            _id: Yup.string()
                .required(),
            name: Yup.string(),
            email: Yup.string()
                .email(),
            password: Yup.string()
                .min(6)
        })

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                code: 108,
                message: "Erro: Dados do formulário inválido!"
            })
        }

        const { _id, email } = req.body

        const usuarioExiste = await Class.findOne({ _id: _id })

        if (!usuarioExiste) {
            return res.status(400).json({
                error: true,
                code: 109,
                message: "Erro: Usuário não encontrado!"
            })
        }

        if (email != usuarioExiste.email) {
            const emailExiste = await Class.findOne({ email })
            if (emailExiste) {
                return res.status(400).json({
                    error: true,
                    code: 110,
                    message: "Erro: Este e-mail já está cadastrado!"
                })
            }
        }

        var dados = req.body
        if (dados.password) {
            dados.password = await bcrypt.hash(dados.password, 8)
        }

        await Class.updateOne({ _id: dados._id }, dados, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 111,
                message: "Erro: Usuário não foi editado com sucesso!"
            })

            return res.json({
                error: false,
                message: "Usuário editado com sucesso!"
            })
        })
    }

    async delete(req, res) {
        const usuarioExiste = await Class.findOne({ _id: req.params.id })

        if (!usuarioExiste) {
            return res.status(400).json({
                error: true,
                code: 104,
                message: "Erro: Usuário não encontrado"
            })
        }

        const user = await Class.deleteOne({ _id: req.params.id }, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 105,
                message: "Error: Usuário não foi apagado com sucesso!"
            })
        })

        return res.json({
            error: false,
            message: "Usuário apagado com sucesso!"
        })
    }
}

export default new ClassController()