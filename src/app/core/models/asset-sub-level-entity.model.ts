import { AssetLevelEntity } from './asset-level-entity.model';
import { BaseEntity } from './base-entity.model';

export class AssetSubLevelEntity extends BaseEntity {
  description!: string;
  levelId!: number;
  assetLevel!: AssetLevelEntity;
}