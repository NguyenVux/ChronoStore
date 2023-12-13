import { MigrationInterface, QueryRunner } from "typeorm"

export class AddSkyBioUid1702464264287 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "ALTER TABLE \"customer\"" + 
            " ADD COLUMN \"skybio_uid\" text"
          )
        await queryRunner.query(
            "ALTER TABLE \"customer\"" + 
            " ADD CONSTRAINT \"skybio_uid_unique\" UNIQUE (\"skybio_uid\")"
          )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "ALTER TABLE \"customer\" DROP COLUMN \"skybio_uid\""
        )
        await queryRunner.query(
            "ALTER TABLE \"customer\"" + 
            " DROP CONSTRAINT \"skybio_uid_unique\""
          )
    }

}
