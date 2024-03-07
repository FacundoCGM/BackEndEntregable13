import { createResponse } from "../utils.js"
import { HttpResponse, errorsDictionary } from '../../utils/httpResponse.js' 
import { logger } from "../../utils/logger.js" 
const httpResponse = new HttpResponse()

export default class Controllers {
  constructor(service) {
    this.service = service
  }
  getAll = async (req, res, next) => {
    try {
      const items = await this.service.getAll()
      if(!items){
        return httpResponse.NotFound(res, errorsDictionary.FIND)
    } else {
        return httpResponse.Ok(res, items)
    }
    } catch (error) {
      logger.error('Error crítico')
      next(error)
    }
  }

  findById = async (req, res, next) => {
    try {
      const { id } = req.params
      const item = await this.service.findById(id)
      if(!item){
        return httpResponse.NotFound(res, errorsDictionary.FIND)
    } else {
        return httpResponse.Ok(res, item)
    }
    } catch (error) {
      logger.error('Error crítico')
      next(error)
    }
  }

  create = async (req, res, next) => {
    try {
      const newItem = await this.service.create(req.body)
      if(!newItem){
        return httpResponse.Unauthorized(res, errorsDictionary.CREATE)
    } else {
        return httpResponse.Ok(res, newItem)
    }
    } catch (error) {
      logger.error('Error crítico')
      next(error)
    }
  }

  update = async (req, res, next) => {
    try {
      const { id } = req.params
      const item = await this.service.findById(id)
      if (!item)
        createResponse(res, 404, {
          method: "update",
          error: "Error: can't update item!",
        });
      const itemUpd = await this.service.update(id, req.body)
      if(!itemUpd){
        return httpResponse.Unauthorized(res, errorsDictionary.UPDATE)
    } else {
        return httpResponse.Ok(res, itemUpd)
    }
    } catch (error) {
      logger.error('Error crítico')
      next(error)
    }
  }

  delete = async (req, res, next) => {
    try {
      const { id } = req.params
      const item = await this.service.findById(id)
      if (!item)
        createResponse(res, 404, {
          method: "delete",
          error: "Error: can't delete item!",
        });
      const itemUpd = await this.service.delete(id)
      if(!itemUpd){
        return httpResponse.NotFound(res, errorsDictionary.DELETE)
    } else {
        return httpResponse.Ok(res, itemUpd)
    }
    } catch (error) {
      logger.error('Error crítico')
      next(error)
    }
  }
}