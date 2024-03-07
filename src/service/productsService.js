import ProductsMongo from "../daos/mongodb/productsDao.js"
import Services from "./classService.js"
const productsMongo = new ProductsMongo()


export default class ProductService extends Services {
    constructor() {
        super(productsMongo)
    }

    async getProducts(page, limit, category, sort) {
        try {
            return await productsMongo.getProducts(page, limit, category, sort)
        } catch(error) {
            console.error(error)
        }
    }

    async updateProduct(pid, obj) {
        try {
            return await productsMongo.updateProduct(pid, obj)
        } catch(error) {
            console.error(error)
        }
    }
}