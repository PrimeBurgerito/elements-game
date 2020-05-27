import { AxiosResponse } from 'axios';
import { GET } from '@shared/api/request-template/requests';
import { IObjective } from '@type/Objective';

const OBJECTIVE_PATH = '/objective';

export default class ObjectiveApi {
  public static findObjectives = async (): Promise<IObjective[]> => {
    const response: AxiosResponse = await GET(OBJECTIVE_PATH, {});
    return await response.data;
  };
}
