#!/usr/bin/env ts-node

import * as fs from 'fs';
import * as path from 'path';

interface MigrationOptions {
  migrationName: string;
}

function createMigrationTemplate(options: MigrationOptions): void {
  const { migrationName } = options;
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, '');

  const templateContent = `
import { Migration } from './umzugClient';

const tableName = '';

export const up: Migration = async ({ context: queryInterface }) => {
  // await queryInterface.createTable(tableName, {
  //   id: {
  //     type: DataTypes.UUID,
  //     primaryKey: true,
  //     allowNull: false,
  //     defaultValue: DataTypes.UUIDV4,
  //   }
  // })

  // await queryInterface.addIndex(tableName, ['feld_name'], { unique: true });
};

export const down: Migration = async ({ context: queryInterface }) => {
  // await queryInterface.dropTable(tableName);
};

`.trim();

  const migrationFileName = `${timestamp}-${migrationName}.ts`;
  const migrationsDirectory = path.join(process.cwd(), 'migrations');

  if (!fs.existsSync(migrationsDirectory)) {
    fs.mkdirSync(migrationsDirectory);
  }

  const migrationFilePath = path.join(migrationsDirectory, migrationFileName);

  fs.writeFileSync(migrationFilePath, templateContent);

  console.log(
    `Migration template created successfully at: ${migrationFilePath}`,
  );
}

if (process.argv.length !== 3) {
  console.error('Usage: npm run migration:create <migrationName>');
  process.exit(1);
}

const migrationName = process.argv[2];

createMigrationTemplate({ migrationName });
