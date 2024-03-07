import { Router } from "express"
const routerLogs = Router()

routerLogs.get('/login', (req, res) => {
    res.render('login')
})

routerLogs.get('/register', (req, res) => {
    res.render('register')
})

routerLogs.get('/registererror', (req, res) => {
    res.render('registererror')
})

routerLogs.get('/loginerror', (req, res) => {
    res.render('loginerror')
})

export default routerLogs