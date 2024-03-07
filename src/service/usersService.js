import UsersMongo from "../daos/mongodb/usersDao.js"
import Services from "./classService.js"
import UserRepository from "../repository/userRepository.js"
const userRepository = new UserRepository()
const usersMongo = new UsersMongo()


export default class UserService extends Services {
    constructor() {
        super(usersMongo)
    }

    async register(user) {
        try {
            return await usersMongo.register(user)
        } catch (error) {
            console.error(error)
        }
    }

    async login(email, password) {
        try {
            return await usersMongo.login(email, password)
        } catch (error) {
            console.error(error)
        }
    }

    async getInfo(id) {
        try {
            const userInfo = await userRepository.getInfo(id)
            return userInfo
        } catch (error) {
            console.log(error);
          }
    }
}