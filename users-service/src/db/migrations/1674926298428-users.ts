import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class Users1674926298428 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        columns: [
          {
            isPrimary: true,
            length: "36",
            name: "id",
            type: "char",
          },
          {
            length: "25",
            name: "username",
            type: "varchar",
          },
          {
            // 60 porque bcrypt genera un varchar de 60 siempre y no necesitamos más
            length: "60",
            name: "passwordHash",
            type: "char",
          },
          {
            default: "now()",
            name: "createdAt",
            type: "timestamp",
          },
        ],
        name: "users",
      }),
    );
    // esto crea un indice para indexado rápido,supongo
    await queryRunner.createIndex(
      "users",
      new TableIndex({
        columnNames: ["username"],
        isUnique: true,
        name: "unique_username",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
