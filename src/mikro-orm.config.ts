import { MikroOrmModuleOptions as Options } from '@mikro-orm/nestjs';

const config: Options = {
  type: 'postgresql',
  host: 'localhost',
  port: 5433,
  user: 'admin',
  password: 'admin',
  dbName: 'mikroormtrxtests',
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  debug: true,
  registerRequestContext: false,
  // We enable the global context usage in our specs so we don't have to keep forking the EM.
  allowGlobalContext: true,
  /**
   * The important bit: disable `implicitTransaction` in your test suite.
   * It will allow you to control the ORM with your own transactions,
   * and to wrap your Jest examples in a transaction, without ever committing it.
   * At the end of the Jest example, you simply rollback the transaction,
   * and nothing ever gets inserted in your DB. No truncating/cleaning tables necessary.
   */
  implicitTransactions: false,
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/migrations',
  },
};

export default config;
