import { Registers } from './entities/Registers';
import { DataSource } from 'typeorm'
import { User } from './entities/User'
import dotenv from 'dotenv'

dotenv.config()

const PORT = Number(process.env.PORT)
const USERNAME = process.env.USERNAME
const PASSWORD = process.env.PASSWORD
const DATABASE = process.env.DATABASE
const HOST = process.env.HOST

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: HOST,
  port: PORT,
  username: USERNAME,
  password: PASSWORD,
  database: DATABASE,
  synchronize: true,
  logging: false,
  entities: [User, Registers],
  extra: {
    ssl: {
      rejectUnauthorized: false, 
    },
  },
})
