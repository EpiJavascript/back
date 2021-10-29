import * as dotenv from 'dotenv';
import * as fs from 'fs';

const nodeEnv = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const path = fs.existsSync(`.env.${nodeEnv}.local`)
  ? `.env.${nodeEnv}.local`
  : `.env.${nodeEnv}`;

console.log(nodeEnv);
console.log(path);

dotenv.config({
  path,
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
