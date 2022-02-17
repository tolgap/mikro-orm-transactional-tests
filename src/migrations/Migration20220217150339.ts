import { Migration } from '@mikro-orm/migrations';

export class Migration20220217150339 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "product" ("id" serial primary key, "name" varchar(255) not null, "slug" varchar(255) not null);');
  }

}
