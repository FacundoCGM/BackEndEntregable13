import UsersMongo from "../daos/mongodb/usersDao.js"
const usersMongo = new UsersMongo()
import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"

const strategyOptions = {
    usernameField: "email",
    passportField: "password",
    passReqToCallback: true
}

const register = async(req, email, done) => {
    try {
        const user = await usersMongo.findByEmail(email)
        if (user) return done(null, false)
        const newUser = await usersMongo.register(req.body)
        return done(null, newUser)
    } catch (error) {
        console.log(error);
        return done(null, false);
    }
}

const login = async(req, done) => {
    try {
        console.log('hola por favor', req.body)
        const loggedUser = await usersMongo.login(req.body)
        if (!loggedUser) return done(null, false, { msg: "Usuario no encontrado." })
    return done(null, loggedUser)
    } catch (error) {
        console.log(error)
      }
}

const registerStrategy = new LocalStrategy(strategyOptions, register)
const loginStrategy = new LocalStrategy(strategyOptions, login)

passport.use("register", registerStrategy)
passport.use("login", loginStrategy)

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
    const user = await usersMongo.findById(id)
    console.log('deserialize', user)
    return done(null, user)
})

