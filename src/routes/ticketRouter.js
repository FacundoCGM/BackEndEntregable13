import { Router } from "express"
import TicketController from "../controller/ticketController.js"

const controller = new TicketController()

const routerTicket = Router()

routerTicket.post('/user/:uid/cart/:cid', controller.generateTicket)

export default routerTicket