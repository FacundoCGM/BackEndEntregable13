import * as cartServ from '../service/cartService.js'
import { HttpResponse, errorsDictionary } from '../../utils/httpResponse.js' 
import { logger } from '../../utils/logger.js' 
const httpResponse = new HttpResponse()

export const newCart = async(req, res, next) => {
    try {
        const newCart = await cartServ.newCart()
        if(!newCart){
            return httpResponse.NotFound(res, errorsDictionary.CREATE)
        } else {
            return httpResponse.Ok(res, newCart)
        }
    } catch(error) {
        logger.error('Error crítico')
        next(error)
    }
}

export const saveToCart = async(req, res, next) => {
    try {
        const {cid, pid} = req.params
        const cartSaved = await cartServ.saveToCart(cid, pid)
        if(!cartSaved){
            return httpResponse.NotFound(res, errorsDictionary.SAVE)
        } else {
            return httpResponse.Ok(res, cartSaved)
        }
    } catch(error) {
        logger.error('Error crítico')
        next(error)
    }
}

export const cleanCart = async(req, res, next) => {
    try {
        const { cid } = req.params
        const cleanCart = await cartServ.cleanCart(cid)
        if(!cleanCart){
            return httpResponse.NotFound(res, errorsDictionary.DELETE)
        } else {
            return httpResponse.Ok(res, cleanCart)
        }
    } catch(error) {
        logger.error('Error crítico')
        next(error)
    }
}

export const deleteOneProduct = async(req, res, next) => {
    try {
        const {cid, pid} = req.params
        const cartUpdated = await cartServ.deleteOneProduct(cid, pid)
        if(!cartUpdated){
            return httpResponse.NotFound(res, errorsDictionary.DELETE)
        } else {
            return httpResponse.Ok(res, cartUpdated)
        }
    } catch(error) {
        logger.error('Error crítico')
        next(error)
    }
}

export const updateQuantity = async(req, res, next) => {
    try {
        const {cid, pid} = req.params
        const { quantity } = req.body
        const cartUpdated = await cartServ.updateQuantity(cid, pid, quantity)
        if(!cartUpdated){
            return httpResponse.NotFound(res, errorsDictionary.UPDATE)
        } else {
            return httpResponse.Ok(res, cartUpdated)
        }
    } catch(error) {
        logger.error('Error crítico')
        next(error)
    }
}

export const newProductsArrangement = async(req, res, next) => {
    try {
        const { cid } = req.params
        const { productsArrangement } = req.body.products
        const cartUpdated = await cartServ.newProductsArrangement(cid, productsArrangement)
        if(!cartUpdated){
            return httpResponse.NotFound(res, errorsDictionary.UPDATE)
        } else {
            return httpResponse.Ok(res, cartUpdated)
        }
    } catch(error) {
        logger.error('Error crítico')
        next(error)
    }
}

export const getCarts = async(req, res, next) => {
    try {
        const allCarts = await cartServ.getCarts()
        if(!allCarts){
            return httpResponse.Unauthorized(res, errorsDictionary.FIND)
        } else {
            return httpResponse.Ok(res, allCarts)
        }
    } catch(error) {
        logger.error('Error crítico')
        next(error)
    }
}