import MongoDao from "./mongoDao.js"
import { TicketModel } from "./models/ticketModel.js"

export default class TicketMongo extends MongoDao {
    constructor() {
        super(TicketModel)
    }
}