import { GET } from '@shared/api/request-template/requests';
import { IAttribute, IObjective, IProperty } from '@type/statistics';
import { AxiosResponse } from 'axios';

const ATTRIBUTE_PATH = '/attribute';
const PROPERTY_PATH = '/property';
const OBJECTIVE_PATH = '/objective';

export default class StatisticsApi {
  public static findAttributes = async (): Promise<IAttribute[]> => {
    const response: AxiosResponse = await GET(ATTRIBUTE_PATH, {});
    return await response.data;
  }
  public static findProperties = async (): Promise<IProperty[]> => {
    const response: AxiosResponse = await GET(PROPERTY_PATH, {});
    return await response.data;
  }
  public static findObjectives = async (): Promise<IObjective[]> => {
    const response: AxiosResponse = await GET(OBJECTIVE_PATH, {});
    return await response.data;
  }
}
