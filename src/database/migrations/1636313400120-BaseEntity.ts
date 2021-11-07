import { MigrationInterface, QueryRunner } from 'typeorm';

export class BaseEntity1636313400120 implements MigrationInterface {
  name = 'BaseEntity1636313400120';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "message_flux" DROP COLUMN "createdBy"');
    await queryRunner.query('ALTER TABLE "message_flux" ADD "createdBy" uuid');
    await queryRunner.query('ALTER TABLE "message_flux" DROP COLUMN "lastUpdatedBy"');
    await queryRunner.query('ALTER TABLE "message_flux" ADD "lastUpdatedBy" uuid');
    await queryRunner.query('ALTER TABLE "message" DROP COLUMN "createdBy"');
    await queryRunner.query('ALTER TABLE "message" ADD "createdBy" uuid');
    await queryRunner.query('ALTER TABLE "message" DROP COLUMN "lastUpdatedBy"');
    await queryRunner.query('ALTER TABLE "message" ADD "lastUpdatedBy" uuid');
    await queryRunner.query('ALTER TABLE "user_text_channel" DROP COLUMN "createdBy"');
    await queryRunner.query('ALTER TABLE "user_text_channel" ADD "createdBy" uuid');
    await queryRunner.query('ALTER TABLE "user_text_channel" DROP COLUMN "lastUpdatedBy"');
    await queryRunner.query('ALTER TABLE "user_text_channel" ADD "lastUpdatedBy" uuid');
    await queryRunner.query('ALTER TABLE "server_text_channel" DROP COLUMN "createdBy"');
    await queryRunner.query('ALTER TABLE "server_text_channel" ADD "createdBy" uuid');
    await queryRunner.query('ALTER TABLE "server_text_channel" DROP COLUMN "lastUpdatedBy"');
    await queryRunner.query('ALTER TABLE "server_text_channel" ADD "lastUpdatedBy" uuid');
    await queryRunner.query('ALTER TABLE "server" DROP COLUMN "createdBy"');
    await queryRunner.query('ALTER TABLE "server" ADD "createdBy" uuid');
    await queryRunner.query('ALTER TABLE "server" DROP COLUMN "lastUpdatedBy"');
    await queryRunner.query('ALTER TABLE "server" ADD "lastUpdatedBy" uuid');
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "createdBy"');
    await queryRunner.query('ALTER TABLE "user" ADD "createdBy" uuid');
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "lastUpdatedBy"');
    await queryRunner.query('ALTER TABLE "user" ADD "lastUpdatedBy" uuid');
    await queryRunner.query('ALTER TABLE "friend_request" DROP COLUMN "createdBy"');
    await queryRunner.query('ALTER TABLE "friend_request" ADD "createdBy" uuid');
    await queryRunner.query('ALTER TABLE "friend_request" DROP COLUMN "lastUpdatedBy"');
    await queryRunner.query('ALTER TABLE "friend_request" ADD "lastUpdatedBy" uuid');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "friend_request" DROP COLUMN "lastUpdatedBy"');
    await queryRunner.query('ALTER TABLE "friend_request" ADD "lastUpdatedBy" character varying');
    await queryRunner.query('ALTER TABLE "friend_request" DROP COLUMN "createdBy"');
    await queryRunner.query('ALTER TABLE "friend_request" ADD "createdBy" character varying');
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "lastUpdatedBy"');
    await queryRunner.query('ALTER TABLE "user" ADD "lastUpdatedBy" character varying');
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "createdBy"');
    await queryRunner.query('ALTER TABLE "user" ADD "createdBy" character varying');
    await queryRunner.query('ALTER TABLE "server" DROP COLUMN "lastUpdatedBy"');
    await queryRunner.query('ALTER TABLE "server" ADD "lastUpdatedBy" character varying');
    await queryRunner.query('ALTER TABLE "server" DROP COLUMN "createdBy"');
    await queryRunner.query('ALTER TABLE "server" ADD "createdBy" character varying');
    await queryRunner.query('ALTER TABLE "server_text_channel" DROP COLUMN "lastUpdatedBy"');
    await queryRunner.query('ALTER TABLE "server_text_channel" ADD "lastUpdatedBy" character varying');
    await queryRunner.query('ALTER TABLE "server_text_channel" DROP COLUMN "createdBy"');
    await queryRunner.query('ALTER TABLE "server_text_channel" ADD "createdBy" character varying');
    await queryRunner.query('ALTER TABLE "user_text_channel" DROP COLUMN "lastUpdatedBy"');
    await queryRunner.query('ALTER TABLE "user_text_channel" ADD "lastUpdatedBy" character varying');
    await queryRunner.query('ALTER TABLE "user_text_channel" DROP COLUMN "createdBy"');
    await queryRunner.query('ALTER TABLE "user_text_channel" ADD "createdBy" character varying');
    await queryRunner.query('ALTER TABLE "message" DROP COLUMN "lastUpdatedBy"');
    await queryRunner.query('ALTER TABLE "message" ADD "lastUpdatedBy" character varying');
    await queryRunner.query('ALTER TABLE "message" DROP COLUMN "createdBy"');
    await queryRunner.query('ALTER TABLE "message" ADD "createdBy" character varying');
    await queryRunner.query('ALTER TABLE "message_flux" DROP COLUMN "lastUpdatedBy"');
    await queryRunner.query('ALTER TABLE "message_flux" ADD "lastUpdatedBy" character varying');
    await queryRunner.query('ALTER TABLE "message_flux" DROP COLUMN "createdBy"');
    await queryRunner.query('ALTER TABLE "message_flux" ADD "createdBy" character varying');
  }

}
