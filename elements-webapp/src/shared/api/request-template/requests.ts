import { API } from '@shared/api/request-template/AxiosInstance';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export const GET = async (path: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
  return await API().get(path, config)
    .catch((e: AxiosError) => {
      console.log(`getTemplate(): ${e}\n path: ${path}`);
      return null;
    });

};

export const POST = async (path: string, body = {}, config: AxiosRequestConfig = {}): Promise<AxiosResponse> => {
  return await API().post(path, body, config)
    .catch((e: AxiosError) => {
      console.log(`postTemplate(): ${e}\n path: ${path}\n body: ${body}`);
      return null;
    });
};

export const PUT = async (path: string, body: any, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
  return await API().put(path, body, config)
    .catch((e: AxiosError) => {
      console.log(`postTemplate(): ${e}\n path: ${path}\n body: ${body}`);
      return null;
    });
};

export const DELETE = async (path: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
  return await API().delete(path, config)
    .catch((e: AxiosError) => {
      console.log(`deleteTemplate(): ${e}\n path: ${path}`);
      return null;
    });
};



