import * as Yup from 'yup'
import bcrypt from 'bcryptjs'
import Student from '../models/Student'
import Product from '../models/Product'
import { cpf } from 'cpf-cnpj-validator'
import sbtransactional from '../external/sendinblue/transactional'
import sbnewcontact from '../external/sendinblue/newcontact'
import http from 'http'
import fetch from 'node-fetch'

class StudentController {

    async create(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string()
                .required(),
            username: Yup.string()
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
            telephone: Yup.string()
                .required(),
            telephone2: Yup.string(),
            products: Yup.array()
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

        console.log(req.body.data)

        /* const emailExists = await Student.findOne({ email: data.email })
        if (emailExists) {
            return res.status(400).json({
                error: true,
                code: 102,
                message: "Error: Este e-mail já está cadastrado!"
            })
        }

        const usernameExists = await Student.findOne({ username: data.username })
        if (usernameExists) {
            return res.status(400).json({
                error: true,
                code: 102,
                message: "Error: Este nome de usuário já está cadastrado!"
            })
        }

        const cpfExists = await Student.findOne({ cpf: data.document })
        if (cpfExists) {
            return res.status(400).json({
                error: true,
                code: 102,
                message: "Error: Este cpf já está utilizado por outro usuário!"
            })
        }

        if (!cpf.isValid(data.document)) {
            return res.status(400).json({
                error: true,
                code: 102,
                message: "CPF inválido"
            })
        } */

        data.birthday = new Date(data.birthday)

        data.products.map((item) => {
            item.payment = 0
            item.active = false
            item.subscriptiondate = new Date()
        })

        //return res.json(data.products[0].productid)

        var jsonsend = {
            "data": {
                "sender":{
                    "name":"Lagrangeanos",
                    "email":"juliana.leao.rosa@gmail.com"
                },
                "to": [
                    {
                        "email": data.email,
                        "name": data.name.split(" ")[0] + " " + data.name.split(" ")[data.name.split(" ").length - 1] + ""
                    }
                ],
                "subject": "Hello world",
                "htmlContent": "<html><head></head><body><p>Hello,</p>This is my first transactional email sent from Sendinblue. No wait, the second</p></body></html>"
            }
        }

        const firstname = data.name.split(" ")[0]
        const lastname = data.name.split(" ")[data.name.split(" ").length - 1]

        const transactional = await sbtransactional(jsonsend)
        const newcontact = await sbnewcontact(data.email,data.telephone,firstname,lastname)
        /* const _class = await Product.findOne({ _id: data.products[0].productid })
        if (_class) {
            console.log({
                vacancies:_class.vacancies,
                studentsin:_class.studentsin
            })
            await Product.updateOne({ _id: data.products[0].productid },{
                vacancies:_class.vacancies,
                studentsin:_class.studentsin
            },(err)=>{

            })

            return res.json(_class)
        } */

        data.password = await bcrypt.hash(data.password, 8)

        const student = await Student.create(data, async (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 101,
                message: "Error: Usuário não foi cadastrado com sucesso! " + err
            })

        })

        return res.status(200).json({
            error: false,
            message: "Usuário cadastrado com sucesso!",
            dados: student,
            transactional,
            newcontact
        })


    }

    async sendinblue(req, res) {
        var data = req.body.data

        return res.json(teste)
    }


}

export default new StudentController()