import { TOKEN_STORAGE_KEY } from '@constant/constants';
import { AUTH_POST } from '@shared/api/request-template/authRequest';
import { IJwt } from '@type/token';
import { AxiosResponse } from 'axios';


export default class AuthApi {
  public static getAuthenticationToken = async (username: string, password: string): Promise<IJwt> => {
    const response: AxiosResponse = await AUTH_POST({username, password});
    if (!response) {
      return null;
    }
    const jwt: IJwt = await response.data;
    sessionStorage.setItem(TOKEN_STORAGE_KEY, jwt.token);
    return jwt;
  };
}
