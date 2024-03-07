import TicketService from "../service/ticketService.js"
import Controllers from "./classController.js"
import { logger } from "../../utils/logger.js" 

const ticketService = new TicketService()

export default class TicketController extends Controllers {
    constructor() {
        super(ticketService)
    }

    async generateTicket(req, res, next) {
        try {
            const { uid } = req.params
            const { cid } = req.params

            const ticket = await ticketService.generateTicket(uid, cid)
            if(!ticket) res.status(404).json({msg: 'Error generate ticket'});
            else res.status(200).json(ticket)
        } catch(error) {
            logger.error('Error crítico')
            next(error)
        }
    }
}