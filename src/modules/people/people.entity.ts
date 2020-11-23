import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'people',
})
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  job_role: string;

  @Column({ length: 255 })
  email: string;

}

export class PersonFillableFields {
  email: string;
  name: string;
  job_role: string;
}
