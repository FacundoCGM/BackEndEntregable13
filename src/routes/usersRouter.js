import { Router } from "express"
import * as usersController from '../controller/usersController.js'
import passport from "passport"

const routerUsers = Router()

routerUsers.post('/register', passport.authenticate('register'), usersController.registerResponse)

routerUsers.post('/login', passport.authenticate('login'), usersController.loginResponse)

routerUsers.get('/registerbygithub', passport.authenticate('github', {scope: ['user:email']}))

routerUsers.get('/current/:id', usersController.getInfo)

export default routerUsers