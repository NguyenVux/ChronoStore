import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class FaceFeatureCreate1702043177600 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table : Table = new Table({
            name: 'face_feature',
            columns:[
                {
                    name: 'c_id',
                    type: 'varchar',
                    isPrimary: true,
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'features',
                    type: 'float[]',
                },
            ]

        });
        await queryRunner.createTable(table,false,true);
        await queryRunner.createForeignKey(table,new TableForeignKey({
            columnNames: ['c_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'customer',
            onDelete: "CASCADE",
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("face_feature")
        const foreignKey = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("c_id") !== -1,
        )
        await queryRunner.dropForeignKey(table, foreignKey)
        await queryRunner.dropTable(table)
    }

}
