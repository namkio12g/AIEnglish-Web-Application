export default () => ({
  port: process.env.PORT ? parseInt(process.env.PORT) : 3300,
  openai_api_key: process.env.OPENAI_API_KEY,
  gemini_api_key:process.env.GEMINI_API_KEY
});