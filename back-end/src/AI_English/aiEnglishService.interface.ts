import { Observable } from "rxjs"
export interface AIEnglishService {
  evaluateEssay(data: {
    topic: string;
    essay: string;
  }): Observable<{ result: string }>;
  generateTopic(data: { request: string }): Observable<{ result: string }>;
  refineEssay(data: { essay: string }): Observable<{ result: string }>;
  brainstormTopic(data: { topic: string }): Observable<{ result: string }>;
  findSynoAno(data: { word: string }): Observable<{ result: string }>;
}