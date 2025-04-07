  import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, CreateDateColumn, ManyToOne } from 'typeorm';
  import { Word } from './word.entity';
  import { User } from 'src/users/entities/user.entity';

  @Entity()
  export class WordsList {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    name: string;

    @Column({ default: 0 })
    wordsCount: number;

    @CreateDateColumn()
    dateCreate: Date;

    @ManyToMany(() => Word,{cascade:true})
    @JoinTable()
    words: Word[];

    @ManyToOne(() => User, (user) => user.wordsLists)
    user: User;

    constructor(wordsList: Partial<WordsList>) {
      Object.assign(this, wordsList);
    }
  }
