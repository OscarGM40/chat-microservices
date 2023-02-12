import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 25 })
  username: string;

  // select a false nunca la selecciona(ya que no tiene sentido ver la pass)
  @Column("char", { length: 60, select: false })
  passwordHash: string;

  @CreateDateColumn()
  createdAt: string;
}
