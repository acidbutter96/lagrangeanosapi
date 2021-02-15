import { Router } from 'express'
import authMiddleware from './app/middlewares/auth'
import ClassController from './app/controllers/ClassController'
import StudentController from './app/controllers/StudentController'


const routes = new Router()

routes.post('/v1/classes',ClassController.create)

routes.post('/v1/students',StudentController.create)

export default routes
