import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, ManyToMany } from 'typeorm';
import { WordsList } from './wordsList.entity';

@Entity()
export class Word {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  wordName: string;

  @Column({ default: '' })
  phonetic: string;

  @Column({ default: '' })
  audio: string;

  @Column({ default: '' })
  definition: string;

  @Column({ default: '' })
  example: string;

  @Column({ default: '' })
  partOfSpeech: string;

  @ManyToMany(() => WordsList, (wordsList) => wordsList.words)
  wordsLists: WordsList[];

  constructor(word : Partial<Word>){
    Object.assign(this,word)
  }
}
