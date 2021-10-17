import * as dotenv from 'dotenv';
dotenv.config({
  path: `.env.${process.env.NODE_ENV}.local`,
});

export default {
  type: 'postgres',
  host: process.env.NEST_APP_TYPEORM_HOST,
  port: process.env.NEST_APP_TYPEORM_PORT,
  username: process.env.NEST_APP_TYPEORM_USERNAME,
  password: process.env.NEST_APP_TYPEORM_PASSWORD,
  database: process.env.NEST_APP_TYPEORM_DATABASE,
  ssl: {
    rejectUnauthorized: false,
  },
  migrations: [
    'src/database/migrations/*.ts',
  ],
  entities: [
    'src/module/**/*.entity.ts',
  ],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};
