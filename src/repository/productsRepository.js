import ProductsMongo from "../daos/mongodb/productsDao.js"
import ProductsDTO from "../dto/productsDto.js"
const productsMongo = new ProductsMongo()

export default class UserRepository {
    constructor() {
        this.dao = productsMongo
    }

    async getInfo(id) {
        try {
            const productsInfo = await this.dao.findById(id)
            const safeInfo = new ProductsDTO(productsInfo)
            return safeInfo
        } catch (error) {
            throw new Error(error.message);
        }
    }
}