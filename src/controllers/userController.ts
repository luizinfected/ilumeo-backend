import { Request, Response } from "express";
import { AppDataSource } from "../db";
import { User } from "../entities/User";
import { UserService } from "../services/userService";

export class UserController {
  static async create(req: Request, res: Response) {
    try {
      const { code } = req.body
      const register = await UserService.create(code)
      return res.status(201).json(register)
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  }

  static async findByCode(req: Request, res: Response) {
    try {
      const { code } = req.params
      const findUser = await UserService.findByCode(code)
      return res.status(200).json(findUser)
    } catch (error: any) {
      console.log(error)
      return res.status(400).json({ error: error.message })
    }
  }
}
