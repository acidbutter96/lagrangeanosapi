import * as Yup from 'yup'
import bcrypt from 'bcryptjs'
import Student from '../models/Student'

class StudentController {

    async create(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string()
                .required(),
            document: Yup.string()
                .required(),
            email: Yup.string()
                .email()
                .required(),
            birthday: Yup.string()
                .required(),
            course: Yup.string()
                .required(),
            password: Yup.string()
                .required()
                .min(6),
            classes: Yup.array()
                .required(),
            monitoring: Yup.boolean()
                .required()
        })

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                code: 103,
                message: "Error: Dados inválidos!"
            })
        }

        var data = req.body

        const emailExists = await Student.findOne({ email: data.email })
        if (emailExists) {
            return res.status(400).json({
                error: true,
                code: 102,
                message: "Error: Este e-mail já está cadastrado!"
            })
        }

        data.classes.map((item)=>{
            item.payment = 0
            item.active = false
            item.subscriptiondate = new Date()
        })

        return res.json(data.classes)

        data.password = await bcrypt.hash(data.password, 8)

        const user = await Student.create(data, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 101,
                message: "Error: Usuário não foi cadastrado com sucesso!"
            })

            return res.status(200).json({
                error: false,
                message: "Usuário cadastrado com sucesso!",
                dados: user
            })
        })
    }


}

export default new StudentController()