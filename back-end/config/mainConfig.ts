export default () => ({
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  english_dic_api: process.env.ENGLISH_DIC_API,
  google_client_id: process.env.GOOGLE_CLIENT_ID,
  google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
  google_callback_url: process.env.GOOGLE_CALLBACK_URL,
  secret_key: process.env.SECRET_KEY,
  database_name: process.env.DATABASE_NAME,
  database_username: process.env.DATABASE_USERNAME,
  database_password: process.env.DATABASE_PASSWORD,
  database_port: process.env.DATABASE_PORT?parseInt(process.env.DATABASE_PORT):4321,
});
