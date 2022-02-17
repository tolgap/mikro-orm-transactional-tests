<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) NestJS + MikroORM example repository for testing within transactional contexts.
Running tests in transactions will speedup your test suite. It eliminates the need of truncating your test DB after every test
just to start from fresh. This setup starts a transaction before each Jest test. Whatever entities you create, then update, then delete, will follow all principles you are familiar with. The only difference is, it never actually gets committed to the database.

### Explanation:

MikroORM has [implicit transactions](https://mikro-orm.io/docs/unit-of-work#implicit-transactions) enabled by default. This causes MikroORM to handle transactions automatically. We want to _avoid_ this. So whenever you're instantiating the MikroORM database, make sure to pass `implicitTransactions: false` in the options.

See the controller spec in [src/product/product.controller.spec.ts](./src/product/product.controller.spec.ts) to see an example.

The specs use `beforeEach` and `afterEach` to start our own transaction, and roll it back ourselves. Make sure to also clear the EntityManager so we start with a fresh EM. Otherwise the EM will keep track of created entities.

## Installation

```bash
$ npm install
```

## Running the app

```bash
$ docker compose up -d
$ npx mikro-orm schema:create -r
$ npm run test
$ docker compose down
```
