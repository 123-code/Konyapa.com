import { Entity, PrimaryGeneratedColumn, Column,BaseEntity } from "typeorm";
import { Field,ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  negocio: string;
  @Field()
  @Column()
  descripcion: string;
  @Field()
  @Column()
  telefono: string;
  @Field()
  @Column()
  email:string;
}
