export interface ICharacterData {
  readonly url: string;
  readonly name: string;
  readonly gender: Gender;
  readonly curture: string;
  readonly born: string;
  readonly died: string;
  readonly title: string[];
  readonly aliases: string[];
  readonly father: string;
  readonly mother: string;
  readonly spouse: string;
  readonly allegiances: string[];
  readonly books: string[];
  readonly povBooks: string[];
  tvSeries: string[];
  readonly playedBy: string[];
}

export enum Gender {
  Female = 'Female',
  Male = 'Male',
}

export interface ICharacter extends ICharacterData {
  readonly numberOfBooks: number;
  readonly numberOfTvs: number;
}
