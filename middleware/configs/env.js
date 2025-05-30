import dotenv from "dotenv"

dotenv.config();
const config= {
FRESHSERVICE_DOMAIN:process.env.FRESHSERVICE_DOMAIN,
FRESHSERVICE_API_KEY:process.env.FRESHSERVICE_API_KEY,
FRESHDESK_DOMAIN:process.env.FRESHDESK_DOMAIN,
FRESHDESK_API_KEY:process.env.FRESHDESK_API_KEY,
PORT:process.env.PORT,
DB_KEY:process.env.DB_KEY

}
export default config;