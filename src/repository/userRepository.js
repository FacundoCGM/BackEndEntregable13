import UsersMongo from "../daos/mongodb/usersDao.js"
import UserDTO from "../dto/userDto.js"
const usersMongo = new UsersMongo()

export default class UserRepository {
    constructor() {
        this.dao = usersMongo
    }

    async getInfo(id) {
        try {
            const userInfo = await this.dao.findById(id)
            const safeInfo = new UserDTO(userInfo)
            return safeInfo
        } catch (error) {
            throw new Error(error.message);
        }
    }
}