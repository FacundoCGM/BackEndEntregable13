import express from 'express'
import handlebars from 'express-handlebars'
import homeRouter from './routes/homeRouter.js'
import realTimeProductsRouterrouter from './routes/realTimeProductsRouter.js'
import { Server } from "socket.io"
import { ProductManager } from './daos/fileSystem/productManager.js'
const productManager = new ProductManager(__dirname + "/data/products.json")
import { __dirname } from './utils.js'
import { errorHandler } from './middlewares/errorHandler.js'
import './passport/strategies.js'
import './passport/githubStrategies.js'
import passport from 'passport'
import 'dotenv/config'

import './db/database.js'
import routerCartMongo from './routes/cartMongoRouter.js'

import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import logsRouter from './routes/logsRouter.js'

import { info } from './docs/info.js'
import swaggerUI from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'

import MainRouter from './routes/index.js'
const mainRouter = new MainRouter()

const app = express()
const httpServer = app.listen(process.env.PORT, () => {
  console.log('servidor levantado correctamente')
})
const socketServer = new Server(httpServer)

const specs = swaggerJSDoc(info)

app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + "/public"))
app.use(errorHandler)

app.use('/home', homeRouter)
app.use('/realtimeproducts', realTimeProductsRouterrouter)

socketServer.on('connection', async(socket) => {
    socket.on('newProduct', async(product) => {
        await productManager.addProduct(product)
        const productsList = await productManager.getProducts()
        socketServer.emit('productAdded', productsList)
    })
    const productsList = await productManager.getProducts()
    socketServer.emit('allProducts', productsList)
})

const mongoStoreOptions = {
    store: MongoStore.create({
      mongoUrl: process.env.MONGOOSEURL,
      ttl: 180,
      crypto: {
        secret: process.env.MONGO_STORE_SECRET
      }
    }),
    secret: process.env.MONGO_STORE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 180000
    }
  }

app.use(session(mongoStoreOptions))
app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())


app.use('/logs', logsRouter)


app.use('/api/cart', routerCartMongo)

app.use('/api', mainRouter.getRouter())
