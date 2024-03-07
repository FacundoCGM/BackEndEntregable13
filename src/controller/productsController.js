import ProductService from '../service/productsService.js'
import Controllers from './classController.js'
const productService = new ProductService()
import { HttpResponse, errorsDictionary } from '../../utils/httpResponse.js' 
const httpResponse = new HttpResponse()
import { logger } from '../../utils/logger.js' 



export default class ProductController extends Controllers {
    constructor() {
        super(productService)
    }

    async getProducts(req, res, next) {
        try {
            const {page, limit, category, sort} = req.query
            const products = await productService.getProducts(page, limit, category, sort)
            if(!products){
                return httpResponse.NotFound(res, errorsDictionary.FIND)
            } else {
                return httpResponse.Ok(res, products)
            }
        } catch(error) {
            logger.error('Error crítico')
            next(error)
        }
    }

    async updateProduct(req, res, next) {
        try {
            const { pid } = req.params
            const { obj } = req.body
            const updatedProduct = await productService.updateProduct(pid, obj)
            if(!updatedProduct){
                return httpResponse.Unauthorized(res, errorsDictionary.UPDATE)
            } else {
                return httpResponse.Ok(res, updatedProduct)
            }
        } catch(error) {
            logger.error('Error crítico')
            next(error)
        } 
    }

    async productsMock(req, res, next) {
        try {
            const products = await productService.productsMock()
            if(!products){
                return httpResponse.Unauthorized(res, errorsDictionary.CREATE)
            } else {
                return httpResponse.Ok(res, products)
            }
        } catch(error) {
            logger.error('Error crítico')
            next(error)
        } 
    }
}