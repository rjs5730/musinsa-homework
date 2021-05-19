import { ICharacterData } from '@/entities';

export interface ICharactersService {
  getAll(pagination: IPaginationRequest<void>): Promise<ICharacterData[]>;
}
