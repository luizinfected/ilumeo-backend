import { AppDataSource } from "../db"
import { User } from "../entities/User"

export class UserService {
  static async create(code: string) {
    const userRepo = AppDataSource.getRepository(User)

    const exists = await userRepo.findOneBy({ code })
    if (exists) throw new Error("User already exists")

    const user = userRepo.create({ code })
    await userRepo.save(user)
    return user
  }

  static async findByCode(code: string) {
    const userRepo = AppDataSource.getRepository(User)
    const user = await userRepo.findOne({
      where: { code },
      relations: ["timestamps"],
    })

    console.log(user)

    if (!user) throw new Error("User not found")

    return user
  }
}
