import { BaseEntity } from 'src/app/core/models';

interface IResponseData {
  result: BaseEntity;
}

export interface IResponse {
  data: IResponseData;
  message: string | undefined;
  resultKeys: string[] | undefined;
}

interface IResponseDataMany {
  result: BaseEntity[];
  count: number | undefined;
}

export interface IResponseMany {
  data: IResponseDataMany;
  message: string | undefined;
  resultKeys: string[] | undefined;
}