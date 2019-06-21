import { authAPI } from '@shared/api/request-template/AxiosInstance';
import { ITokenRequestBody } from '@type/token';
import { AxiosError, AxiosResponse } from 'axios';
import * as qs from 'qs';


export const AUTH_POST = async (path: string, body: ITokenRequestBody): Promise<AxiosResponse> => {
  return await authAPI.post(path, qs.stringify(body))
    .catch((e: AxiosError) => {
      console.log(`authTemplate(): ${e}\n path: ${path}\n body: ${body}`);
      return null;
    });
};
