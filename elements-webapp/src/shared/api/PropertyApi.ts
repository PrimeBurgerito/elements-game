import { GET } from '@shared/api/request-template/requests';
import { AxiosResponse } from 'axios';
import { INumericProperty, IStringProperty } from '@type/Property';

const ATTRIBUTE_PATH = '/attribute';
const PROPERTY_PATH = '/property';

export default class PropertyApi {
  public static findAttributes = async (): Promise<INumericProperty[]> => {
    const response: AxiosResponse = await GET(ATTRIBUTE_PATH, {});
    return await response.data;
  };
  public static findProperties = async (): Promise<IStringProperty[]> => {
    const response: AxiosResponse = await GET(PROPERTY_PATH, {});
    return await response.data;
  };
}
