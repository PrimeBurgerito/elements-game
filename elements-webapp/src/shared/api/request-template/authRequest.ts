import { authAPI } from '@shared/api/request-template/AxiosInstance';
import { IAuthenticationRequest } from '@type/token';
import { AxiosError, AxiosResponse } from 'axios';


export const AUTH_POST = async (body: IAuthenticationRequest): Promise<AxiosResponse> => {
  return await authAPI.post('', body)
    .catch((e: AxiosError) => {
      console.error(`authTemplate(): ${e}\n body: ${body}`);
      return null;
    });
};
