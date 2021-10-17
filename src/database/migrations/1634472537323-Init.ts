import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1634472537323 implements MigrationInterface {
    name = 'Init1634472537323'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "message_flux" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "lastUpdatedBy" character varying, CONSTRAINT "PK_17372ab09a3ce544892610510c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "message" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "lastUpdatedBy" character varying, "message" character varying NOT NULL, "messageFluxId" uuid NOT NULL, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_text_channel" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "lastUpdatedBy" character varying, "name" character varying, "messageFluxId" uuid NOT NULL, CONSTRAINT "PK_0abc4e173cbac70bf9f1b1d97b0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "server_text_channel" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "lastUpdatedBy" character varying, "name" character varying NOT NULL, "serverId" uuid NOT NULL, "messageFluxId" uuid NOT NULL, CONSTRAINT "PK_95881142f5a09dc2b6b7e47b167" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "server" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "lastUpdatedBy" character varying, "name" character varying NOT NULL, "imageUrl" character varying, "adminUserId" uuid NOT NULL, CONSTRAINT "PK_f8b8af38bdc23b447c0a57c7937" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "lastUpdatedBy" character varying, "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "imageUrl" character varying, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."friend_request_type_enum" AS ENUM('pending', 'accepted', 'refused')`);
        await queryRunner.query(`CREATE TABLE "friend_request" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "lastUpdatedBy" character varying, "type" "public"."friend_request_type_enum" NOT NULL DEFAULT 'pending', "createdByUserId" uuid, "requestedUserId" uuid, CONSTRAINT "PK_4c9d23ff394888750cf66cac17c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_text_channel_users_user" ("userTextChannelId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_29e607cfc2c0c9f87fc8e427d86" PRIMARY KEY ("userTextChannelId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7bdbefc7cfc01c1a39a69c4af0" ON "user_text_channel_users_user" ("userTextChannelId") `);
        await queryRunner.query(`CREATE INDEX "IDX_db9f8b42e986f3481bd070a71f" ON "user_text_channel_users_user" ("userId") `);
        await queryRunner.query(`CREATE TABLE "server_users_user" ("serverId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_1d4335060a4eea1764deabe949b" PRIMARY KEY ("serverId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8b82aa1114c717b4aa519dbd50" ON "server_users_user" ("serverId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6a95abf090f94ef8117e95d6e9" ON "server_users_user" ("userId") `);
        await queryRunner.query(`CREATE TABLE "user_friends_user" ("userId_1" uuid NOT NULL, "userId_2" uuid NOT NULL, CONSTRAINT "PK_f2b5631d91f6b7fda632135932f" PRIMARY KEY ("userId_1", "userId_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_04840fd160b733de706a336013" ON "user_friends_user" ("userId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_e81f236c989f3fd54836b50a12" ON "user_friends_user" ("userId_2") `);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_bdb190089b98423481a0aadc219" FOREIGN KEY ("messageFluxId") REFERENCES "message_flux"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_text_channel" ADD CONSTRAINT "FK_453cbf47ac45ec3f0ba7b7fdefc" FOREIGN KEY ("messageFluxId") REFERENCES "message_flux"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "server_text_channel" ADD CONSTRAINT "FK_541a7755f84ae00219c0d908de0" FOREIGN KEY ("messageFluxId") REFERENCES "message_flux"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "server_text_channel" ADD CONSTRAINT "FK_bb14784480bc080271424c672fb" FOREIGN KEY ("serverId") REFERENCES "server"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "server" ADD CONSTRAINT "FK_cfb273b7a1554938668c1e1d34b" FOREIGN KEY ("adminUserId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friend_request" ADD CONSTRAINT "FK_2f65c5906d47810cfa7eed39153" FOREIGN KEY ("createdByUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friend_request" ADD CONSTRAINT "FK_70e51c6645a79339c1e65124c26" FOREIGN KEY ("requestedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_text_channel_users_user" ADD CONSTRAINT "FK_7bdbefc7cfc01c1a39a69c4af08" FOREIGN KEY ("userTextChannelId") REFERENCES "user_text_channel"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_text_channel_users_user" ADD CONSTRAINT "FK_db9f8b42e986f3481bd070a71f8" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "server_users_user" ADD CONSTRAINT "FK_8b82aa1114c717b4aa519dbd508" FOREIGN KEY ("serverId") REFERENCES "server"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "server_users_user" ADD CONSTRAINT "FK_6a95abf090f94ef8117e95d6e95" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_friends_user" ADD CONSTRAINT "FK_04840fd160b733de706a3360134" FOREIGN KEY ("userId_1") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_friends_user" ADD CONSTRAINT "FK_e81f236c989f3fd54836b50a12d" FOREIGN KEY ("userId_2") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_friends_user" DROP CONSTRAINT "FK_e81f236c989f3fd54836b50a12d"`);
        await queryRunner.query(`ALTER TABLE "user_friends_user" DROP CONSTRAINT "FK_04840fd160b733de706a3360134"`);
        await queryRunner.query(`ALTER TABLE "server_users_user" DROP CONSTRAINT "FK_6a95abf090f94ef8117e95d6e95"`);
        await queryRunner.query(`ALTER TABLE "server_users_user" DROP CONSTRAINT "FK_8b82aa1114c717b4aa519dbd508"`);
        await queryRunner.query(`ALTER TABLE "user_text_channel_users_user" DROP CONSTRAINT "FK_db9f8b42e986f3481bd070a71f8"`);
        await queryRunner.query(`ALTER TABLE "user_text_channel_users_user" DROP CONSTRAINT "FK_7bdbefc7cfc01c1a39a69c4af08"`);
        await queryRunner.query(`ALTER TABLE "friend_request" DROP CONSTRAINT "FK_70e51c6645a79339c1e65124c26"`);
        await queryRunner.query(`ALTER TABLE "friend_request" DROP CONSTRAINT "FK_2f65c5906d47810cfa7eed39153"`);
        await queryRunner.query(`ALTER TABLE "server" DROP CONSTRAINT "FK_cfb273b7a1554938668c1e1d34b"`);
        await queryRunner.query(`ALTER TABLE "server_text_channel" DROP CONSTRAINT "FK_bb14784480bc080271424c672fb"`);
        await queryRunner.query(`ALTER TABLE "server_text_channel" DROP CONSTRAINT "FK_541a7755f84ae00219c0d908de0"`);
        await queryRunner.query(`ALTER TABLE "user_text_channel" DROP CONSTRAINT "FK_453cbf47ac45ec3f0ba7b7fdefc"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_bdb190089b98423481a0aadc219"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e81f236c989f3fd54836b50a12"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_04840fd160b733de706a336013"`);
        await queryRunner.query(`DROP TABLE "user_friends_user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6a95abf090f94ef8117e95d6e9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8b82aa1114c717b4aa519dbd50"`);
        await queryRunner.query(`DROP TABLE "server_users_user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_db9f8b42e986f3481bd070a71f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7bdbefc7cfc01c1a39a69c4af0"`);
        await queryRunner.query(`DROP TABLE "user_text_channel_users_user"`);
        await queryRunner.query(`DROP TABLE "friend_request"`);
        await queryRunner.query(`DROP TYPE "public"."friend_request_type_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "server"`);
        await queryRunner.query(`DROP TABLE "server_text_channel"`);
        await queryRunner.query(`DROP TABLE "user_text_channel"`);
        await queryRunner.query(`DROP TABLE "message"`);
        await queryRunner.query(`DROP TABLE "message_flux"`);
    }

}
