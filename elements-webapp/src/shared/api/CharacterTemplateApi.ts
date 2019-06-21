import { GET } from '@shared/api/request-template/requests';
import { ICharacterTemplate } from '@type/characterTemplate';
import { AxiosResponse } from 'axios';

const CHARACTER_TEMPLATE_PATH = '/character-template';

export default class CharacterTemplateApi {
  public static find = async (): Promise<ICharacterTemplate[]> => {
    const response: AxiosResponse = await GET(CHARACTER_TEMPLATE_PATH, {});
    return await response.data;
  }
}
