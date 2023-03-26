import { BaseEntity } from './base-entity.model'
import { RoleEntity } from './role-entity.model';

export class UserEntity extends BaseEntity {
  username!: string;
  firstName!: string;
  lastName!: string;
  email!: string | null;
  password!: string;
  isActive!: boolean;
  roleId!: number;
  role!: RoleEntity;
}