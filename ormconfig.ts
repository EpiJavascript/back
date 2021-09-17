import * as dotenv from 'dotenv';
dotenv.config({
  path: '.development.local.env',
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
  entities: [
    'src/module/routes/**/*.entity.ts',
  ],
  cli: {
    migrationsDir: 'src/migration',
  },
};
