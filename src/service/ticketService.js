import TicketMongo from "../daos/mongodb/ticketDao.js"
import Services from "./classService.js"
import { v4 as uuidv4 } from 'uuid'
import UsersMongo from "../daos/mongodb/usersDao.js"
import CartMongo from "../daos/mongodb/cartDao.js"
import ProductsMongo from "../daos/mongodb/productsDao.js"
import mongoose from "mongoose"
import nodemailer from "nodemailer"
import 'dotenv/config'

const ticketMongo = new TicketMongo()
const usersMongo = new UsersMongo()
const cartMongo = new CartMongo()
const productsMongo = new ProductsMongo()

export default class TicketService extends Services {
    constructor() {
        super(ticketMongo)
    }

    async generateTicket (uid, cid) {
        try {
            const cart = await cartMongo.findOne(cid)
            if(!cart) {
                return false;
            }

            console.log('hola', cart)

            const user = await usersMongo.findById(uid)
            if(!user) {
                return false;
            }

            console.log(user)

            let amountAcc = 0


            console.log(cart.products)

            for (const p of cart.products) {
                const idProd = p.product._id.toString()
                const prodFromDB = await productsMongo.findById(idProd)
                if(p.quantity <= prodFromDB.stock){
                  const amount = p.quantity * prodFromDB.price
                  amountAcc += amount
                }
            }

            const ticket = await ticketMongo.create({
                code: uuidv4(),
                purchase_datetime: new Date().toLocaleString(),
                amount: amountAcc,
                purchaser: user.email
            })

            const transporter = nodemailer.createTransport({
                host: process.env.ETHEREAL_HOST,
                port: process.env.ETHEREAL_PORT,
                auth: {
                    user: process.env.ETHEREAL_USER_EMAIL,
                    pass: process.env.ETHEREAL_PASSWORD
                }
            })

            const mailOptions = {
                from: process.env.ETHEREAL_USER_EMAIL,
                to: user.email,
                subject: 'ticket',
                text: `Muchas gracias por su comra!\n\nA continucación se adjunta el la información del ticket:\n\n${ticket}`
            }

            const mailSent = await transporter.sendMail(mailOptions)

            console.log(mailSent.messageId)

            cartMongo.cleanCart(cid)
            return ticket
        } catch (error) {
            throw new Error(error)
        }
    } 
}