import { BaseEntity } from 'src/app/core/models';

interface IResponseData {
  result: BaseEntity | BaseEntity[];
  count: number | undefined;
}

export interface IResponse {
  data: IResponseData | null;
  message: string | undefined;
  resultKeys: string[] | undefined;
}