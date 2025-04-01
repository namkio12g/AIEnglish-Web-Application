import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, CreateDateColumn } from 'typeorm';
import { Word } from './word.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class WordsList {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({default:0})
  wordsCount: number;

  @CreateDateColumn()
  dateCreate: Date;

  @ManyToMany(()=> Word,(word)=> word.wordsLists, { cascade: true })
  @JoinTable()
  words:Word[]

  @OneToMany(()=>User,(user)=>user.wordsLists)
  user:User
  
}
