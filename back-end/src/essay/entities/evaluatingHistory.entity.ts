import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, ManyToOne } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class EvaluatingHistory {
  @PrimaryGeneratedColumn('uuid')
  Id: string;

  @Column()
  TAScore: number;

  @Column()
  CCScore: number;

  @Column()
  LRScore: number;

  @Column()
  GRAScore: number;

  @Column()
  overallScore: number;

  @CreateDateColumn()
  dateCreated: Date;

  @ManyToOne(() => User, (user) => user.evaluatingHistoryList)
  user: User;

  constructor(evaluatingHistory: Partial<EvaluatingHistory>){
    Object.assign(this,evaluatingHistory)
  }
    
}
