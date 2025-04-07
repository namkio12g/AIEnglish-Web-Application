import { Injectable, OnModuleInit } from '@nestjs/common';
import { AiDeviceInterface } from '../ai-device.interface';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';

const MODEL = 'gemini-2.0-flash';
const TEMPERATURE = 0.7;

@Injectable()
export class GeminiAiService implements AiDeviceInterface {
  private gemini: GoogleGenerativeAI;
  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('gemini_api_key') || '';
    this.gemini = new GoogleGenerativeAI(apiKey);
  }
  async generateTopic() {
    const prompt =
      'Generate a random IELTS Writing Task 2 essay question. Choose one of the following types: Opinion (Agree or Disagree), Advantages and Disadvantages, Discussion, Problem and Solution, Two-Part Questions, or Double Question. Ensure the topic is relevant, thought-provoking, and realistic for IELTS candidates. Provide only the question without extra explanations. Return only the text of topic. Do not include extra text.';
    return await this.callAIApi({ prompt: prompt });
  }
  async refineEssay(essay: string) {
    const prompt = `Improve the following IELTS Writing Task 2 essay to reach Band 9 level. Enhance coherence, cohesion, lexical resource, grammatical range, and accuracy. Strengthen arguments with well-developed ideas, logical progression, and precise vocabulary. Refine sentence structures for clarity and fluency while maintaining a natural, academic tone .Return only the enhanced essay. Do not include extra text.
    essay : "${essay}"`;
    return await this.callAIApi({ prompt: prompt });
  }
  async evaluateEssay(topic: string, essay: string) {
    const prompt = `If the essay and topic is not valid just answer NO.You are an IELTS examiner.If user make a lot of mistakes you can lower the score reasonably. Evaluate the following essay based on IELTS Writing Task 2 criteria:  
      **Topic:** "${topic}"  
      **Essay:** """${essay}"""  
      **Scoring Criteria (0-9):**  
      - Task Response: (Does the essay fully address the topic? does it have fully parts of a essay such as :introduction,body,conclusion)  
      - Coherence & Cohesion: (Are ideas logically connected?)  
      - Lexical Resource: (Is vocabulary diverse and appropriate? and How well does the essay use vocabulary?)  
      - Grammatical Range & Accuracy: (Is grammar correct and varied?)  
      Provide your response in **JSON format** like this:
      {
        "task_response": 7.5,
        "coherence_cohesion": 8.0,
        "lexical_resource": 7.0,
        "grammatical_range_accuracy": 6.5,
        "overall_band": 7.0,
        "feedback": ["The essay addresses the topic well but needs better coherence."," Some grammar mistakes were found."],
        "mistakes":["she agree with her friend - subject-verb agreement", "he get it done - the sentence is vague"] (give at most 4 mistakes)
      }
      **Return only valid JSON. Do not include extra text.**`;

    return await this.callAIApi({
      prompt: prompt,
    });
  }

  async brainstormTopic(topic: string) {
    const prompt = `Brainstorm key ideas, arguments, and supporting points for the following IELTS Writing Task 2 topic: "${topic}".If topic given is nonsense return invalid topic,Do not include extra text`;
    return await this.callAIApi({ prompt: prompt });
  }

  async findSynonymAndAntonyms(word: string) {
    const prompt = `Provide at least 1 and at most 5 synonyms and antonyms for the word ${word}. Ensure the synonyms are contextually appropriate and reflect different shades of meaning. If the word has multiple meanings, focus on the most common usage.If the word is nonsense return invalid word. Return the output strictly in valid JSON format with the structure below.
      {
      "word": "[Insert Word Here]",
      "synonyms": ["Synonym1", "Synonym2", "Synonym3", "Synonym4", "Synonym5"],
      "antonyms": ["Antonym1", "Antonym2", "Antonym3","Antonym4", "Antonym5"]
      }
      .Do not include extra text.`;
    return await this.callAIApi({ prompt: prompt });
  }

  async callAIApi(request: Record<string, any>) {
    const model = this.gemini.getGenerativeModel({ model: MODEL });

    const result = await model.generateContent(request['prompt']);
    const response = await result.response;
    return response.text();
  }
}
