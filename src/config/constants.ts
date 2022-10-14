import { ConfigModule } from "@nestjs/config"
ConfigModule.forRoot()
export const keys = {
    DOMAIN_FRONTEND: process.env.DOMAIN_FRONTEND,
    HOST: process.env.HOST,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD:process.env.DB_PASSWORD,
    DATABASE:process.env.DATABASE,
    JWT_SECRETKEY: process.env.JWT_SECRETKEY
}