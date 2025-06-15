import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Registers } from './Registers'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  code: string

  @OneToMany(() => Registers, (register) => register.user)
  timestamps: Registers[]
}
