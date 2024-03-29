import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity("userSessions")
export default class UserSession {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("char", { length: 36 })
  userId: string;

  @CreateDateColumn()
  createdAt: string;

  @Column("datetime")
  expiresAt: string;
}
