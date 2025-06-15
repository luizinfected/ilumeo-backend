import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm'
import { User } from './User'

@Entity()
export class Registers {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  type: 'IN' | 'OUT'

  @CreateDateColumn({type: 'timestamptz'})
  createdAt: Date

  @ManyToOne(() => User, (user) => user.timestamps)
  user: User
}
