import { Request, Response } from 'express'
import { RegisterService } from '../services/registerService'


export const RegistersController = {

  async create(req: Request, res: Response) {
    try {
      const { userCode, type } = req.body
      const register = await RegisterService.create(userCode, type)
      return res.status(201).json(register)
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  },

  async getAllByUser(req: Request, res: Response) {
    try {
      const { userCode } = req.params
      const data = await RegisterService.getAllByUser(userCode)
      return res.status(200).json(data)
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  }
}

