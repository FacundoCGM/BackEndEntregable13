import { Router } from "express"
import * as cartController from "../controller/cartController.js"
import { checkUserRole } from "../middlewares/userVerification.js"

const routerCartMongo = Router()

routerCartMongo.post('/', cartController.newCart)

routerCartMongo.post('/:cid/product/:pid', checkUserRole('user'), cartController.saveToCart)

routerCartMongo.delete('/:cid', cartController.cleanCart)

routerCartMongo.delete('/:cid/product/:pid', checkUserRole('user'), cartController.deleteOneProduct)

routerCartMongo.put('/:cid/product/:pid', checkUserRole('user'), cartController.updateQuantity)

routerCartMongo.put('/:cid', cartController.newProductsArrangement)

routerCartMongo.get('/all', cartController.getCarts)

export default routerCartMongo