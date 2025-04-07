import { EvaluatingHistory } from 'src/essay/entities/evaluatingHistory.entity';
import { WordsList } from 'src/words/entities/wordsList.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  googleId: string;

  @Column({ default: '' })
  avatar: string;

  @OneToMany(() => WordsList, (wordsList) => wordsList.user, { cascade: true })
  wordsLists: WordsList[];

  @OneToMany(
    () => EvaluatingHistory,
    (evaluatingHistory) => evaluatingHistory.user,
    { cascade: true },
  )
  evaluatingHistoryList: EvaluatingHistory[];

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}
