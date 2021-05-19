import { ICharacterData } from '@/entities';
import { ICharactersService } from './characters.types';
// api
import { APIClient } from '@/api/APIClient';
import { CharacterAPI } from '@/api/CharacterAPI';

export class CharactersService implements ICharactersService {
  constructor() {}

  async getAll(params: IPaginationRequest<void>): Promise<ICharacterData[]> {
    return await APIClient.instance.request(
      new CharacterAPI.GetCharacters(params)
    );
  }
}
