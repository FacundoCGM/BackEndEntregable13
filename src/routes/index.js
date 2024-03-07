import { Router } from "express"
import routerMongo from "./productsMongoRouter.js"
import routerUsers from "./usersRouter.js"
import routerTicket from "./ticketRouter.js"

export default class MainRouter {
    constructor() {
        this.router = Router()
        this.initRoutes()
    }

    initRoutes() {
        this.router.use("/products", routerMongo)
        this.router.use("/users", routerUsers)
        this.router.use("/ticket", routerTicket)
    }

    getRouter() {
        return this.router
    }
}