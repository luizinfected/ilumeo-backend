import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import duration from 'dayjs/plugin/duration'
import { AppDataSource } from '../db'
import { Registers } from '../entities/Registers'
import { User } from '../entities/User'

dayjs.extend(duration)
dayjs.extend(utc)
dayjs.extend(timezone)

export class RegisterService {
  static async create(userCode: string, type: 'IN' | 'OUT') {

    if (!['IN', 'OUT'].includes(type)) {
      throw new Error('Type must be IN or OUT')
    }

    const userRepo = AppDataSource.getRepository(User)
    const registerRepo = AppDataSource.getRepository(Registers)

    const user = await userRepo.findOneBy({ code: userCode })
    if (!user) throw new Error('User not found')


    const newRegister = registerRepo.create({ type, user })
    await registerRepo.save(newRegister)

    return newRegister

  }

  static async getAllByUser(userCode: string) {
    const registerRepo = AppDataSource.getRepository(Registers)

    const registers = await registerRepo.find({
      where: { user: { code: userCode } },
      order: { createdAt: 'DESC' },
    })

    return this.formatTimestampsByDay(registers)
  }


  private static formatTimestampsByDay(timestamps: any[]) {
    const daysMap: Record<string, any[]> = {}
    const todayDate = dayjs().tz('America/Sao_Paulo').format('DD/MM/YYYY')

    timestamps.forEach((t) => {
      const date = dayjs(t.createdAt).tz('America/Sao_Paulo').format('DD/MM/YYYY')
      if (!daysMap[date]) daysMap[date] = []
      daysMap[date].push(t)
    })

    const result = []
    let todayTotalMs = 0
    let todayHasUnpairedIN = false

    for (const date in daysMap) {
      const entries = daysMap[date].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )

      let totalMs = 0
      let i = 0

      while (i < entries.length) {
        const curr = entries[i]
        const next = entries[i + 1]

        const start = dayjs(curr.createdAt).tz('America/Sao_Paulo')

        if (curr.type === 'IN' && next?.type === 'OUT') {
          const end = dayjs(next.createdAt).tz('America/Sao_Paulo')
          totalMs += end.diff(start)
          i += 2
        } else if (curr.type === 'IN' && (!next || next.type !== 'OUT')) {
          if (date === todayDate) {
            todayHasUnpairedIN = true
            const now = dayjs().tz('America/Sao_Paulo')
            todayTotalMs = now.diff(start)
          }
          i++
        } else {
          i++
        }
      }

      const dur = dayjs.duration(totalMs)
      const hours = Math.floor(dur.asHours())
      const minutes = dur.minutes()

      result.push({ date, worked: `${hours}h ${minutes}m` })
    }

    const dur = dayjs.duration(todayTotalMs)
    const todayHours = todayHasUnpairedIN ? `${Math.floor(dur.asHours())}h ${dur.minutes()}m` : ''

    return {
      result,
      todayHours,
    }
  }

}