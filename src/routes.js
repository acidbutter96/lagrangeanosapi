import { Router } from 'express'
import authMiddleware from './app/middlewares/auth'
import ProductController from './app/controllers/ProductController'
import StudentController from './app/controllers/StudentController'
import Student from './app/models/Student'


const routes = new Router()

routes.post('/v1/products',ProductController.create)

routes.post('/v1/students',StudentController.create)
routes.post('/v1/external/sendinblue',StudentController.sendinblue)


export default routes
