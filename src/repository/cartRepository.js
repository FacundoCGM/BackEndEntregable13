import CartMongo from "../daos/mongodb/cartDao.js"
import CartDTO from "../dto/cartDto.js"
const cartMongo = new CartMongo()

export default class UserRepository {
    constructor() {
        this.dao = cartMongo
    }

    async getInfo(id) {
        try {
            const cartInfo = await this.dao.findById(id)
            const safeInfo = new CartDTO(cartInfo)
            return safeInfo
        } catch (error) {
            throw new Error(error.message);
        }
    }
}