import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../routes/user/user.entity';

@Injectable()
export class ConfigurationService {
  getDatabaseConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: process.env.NEST_APP_TYPEORM_HOST,
      username: process.env.NEST_APP_TYPEORM_USERNAME,
      password: process.env.NEST_APP_TYPEORM_PASSWORD,
      database: process.env.NEST_APP_TYPEORM_DATABASE,
      port: +process.env.NEST_APP_TYPEORM_PORT,
      synchronize: Boolean(
        JSON.parse(process.env.NEST_APP_TYPEORM_SYNCHRONIZE),
      ),
      ssl: {
        rejectUnauthorized: false,
      },
      entities: [User],
    };
  }
}
