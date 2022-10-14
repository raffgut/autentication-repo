import { TypeOrmModule } from "@nestjs/typeorm"
import {ConfigModule, ConfigService} from "@nestjs/config"
import { ConnectionOptions } from "tls"
import { keys } from "src/config/constants"


export const databaseProviders = [
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject:[ConfigService],
        async useFactory(config:ConfigService) {
            return {
                
                type: 'postgres' as 'postgres',
                host: keys.HOST,
                database:keys.DATABASE,
                username: keys.DB_USERNAME,
                password: keys.DB_PASSWORD,
                autoLoadEntities: true,
                synchronize: true,
                entities: [__dirname + '/../**/*.entity{.ts,.js]'],
                migrations: [__dirname + '/migrations/*{.ts,.js}],'],
            } as ConnectionOptions
        }
    })
]