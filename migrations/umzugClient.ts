import { Sequelize } from 'sequelize';
import { Umzug, SequelizeStorage } from 'umzug';
import configuration from '../src/shared/config/configuration';
import * as dotenv from 'dotenv';
require('ts-node/register');

dotenv.config();

const sequelize = new Sequelize(configuration().database);

export const umzug = new Umzug({
  migrations: {
    glob: [
      `${process.cwd()}/migrations/*.ts`,
      {
        ignore: [
          `${process.cwd()}/migrations/createMigration.ts`,
          `${process.cwd()}/migrations/umzugClient.ts`,
          `${process.cwd()}/migrations/migrations*.ts`,
        ],
      },
    ],
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

export type Migration = typeof umzug._types.migration;
export { DataTypes } from 'sequelize';
