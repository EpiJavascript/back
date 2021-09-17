import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as fs from 'fs';
import { ConfigurationService } from './module/configuration/configuration.service';
import { UserModule } from './module/routes/user/user.module';
import { ConfigurationModule } from './module/configuration/configuration.module';
import { validationSchema } from './module/configuration/schema';
import { AuthModule } from './module/routes/auth/auth.module';

@Module({
  imports: [
    // dotenv Config
    ConfigModule.forRoot({
      envFilePath: fs.existsSync(`.${process.env.NODE_ENV}.local.env`)
        ? `.${process.env.NODE_ENV}.local.env`
        : `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
      validationSchema,
    }),
    // TypeOrm config
    TypeOrmModule.forRootAsync({
      imports: [ConfigurationModule],
      inject: [ConfigurationService],
      useFactory: (config: ConfigurationService) => ({
        ...config.getDatabaseConfig(),
      }),
    }),
    // Modules
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
