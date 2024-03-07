import { Router } from "express"
import ProductController from "../controller/productsController.js"
import { checkUserRole } from "../middlewares/userVerification.js"
const controller = new ProductController()

const routerMongo = Router()

routerMongo.get('/', controller.getProducts)

routerMongo.get('/:pid', controller.findById)

routerMongo.put('/:pid', checkUserRole('admin'), controller.updateProduct)

routerMongo.delete('/:pid', checkUserRole('admin'), controller.delete)

routerMongo.post('/', checkUserRole('admin'), controller.create)

export default routerMongo