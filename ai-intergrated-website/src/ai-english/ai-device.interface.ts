export interface AiDeviceInterface {
  callAIApi(request: Record<string, any>);
  evaluateEssay(topic: string, essay: string);
  brainstormTopic(topic: string);
  findSynonymAndAntonyms(word: string);
  generateTopic();
  refineEssay(essay: string);
}
