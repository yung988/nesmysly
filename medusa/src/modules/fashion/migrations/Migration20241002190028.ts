import { Migration } from '@mikro-orm/migrations';

export class Migration20241002190028 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table if not exists "material" ("id" text not null, "name" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "material_pkey" primary key ("id"));');

    this.addSql('create table if not exists "color" ("id" text not null, "name" text not null, "hex_code" text not null, "material_id" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "color_pkey" primary key ("id"));');
    this.addSql('CREATE INDEX IF NOT EXISTS "IDX_color_material_id" ON "color" (material_id) WHERE deleted_at IS NULL;');

    this.addSql('alter table if exists "color" add constraint "color_material_id_foreign" foreign key ("material_id") references "material" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table if exists "color" drop constraint if exists "color_material_id_foreign";');

    this.addSql('drop table if exists "material" cascade;');

    this.addSql('drop table if exists "color" cascade;');
  }

}
