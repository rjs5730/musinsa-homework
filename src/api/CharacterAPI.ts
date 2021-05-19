import { ICharacterData } from '@/entities';
import { AxiosResponse } from 'axios';
import { HTTPMethod, APIRequest } from './APIClient';

export namespace CharacterAPI {
  // 캐릭터 조회
  export class GetCharacters implements APIRequest<ICharacterData[]> {
    response: ICharacterData[] | undefined;
    path = '/api/characters';
    method = HTTPMethod.GET;
    parse = (data: AxiosResponse) => data.data;
    constructor(public params: IPaginationRequest<void>) {}
  }
}
