import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class UserSessions1675011920904 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        columns: [
          {
            isPrimary: true,
            length: "36",
            name: "id",
            // why is not varchar ??
            type: "char",
          },
          {
            length: "36",
            name: "userId",
            type: "char",
          },
          {
            default: "now()",
            name: "createdAt",
            type: "timestamp",
          },
          {
            name: "expiresAt",
            // para MySQL un DateTime puede llegar al año 9999 mientras que un TimeStamp llega al 2043(20 años desde el año actual)
            // hay otras diferencias como que TimeStamp convierte a UTC e incluso al horario de verano(aparte necesita 1 byte menos)
            // DateTime no hace conversión ninguna,además MySQL parece que cachea queries con Timestamp,parece que si puedo usar TimeStamp debería usarlo
            type: "datetime",
          },
        ],
        name: "userSessions",
      }),
    );
    await queryRunner.createForeignKey(
      "userSessions",
      new TableForeignKey({
        columnNames: ["userId"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("userSessions");
  }
}
