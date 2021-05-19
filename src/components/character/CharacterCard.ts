import { ICharacterData } from '@/entities/character';

export default class CharacterCard {
  divElement: HTMLElement;
  constructor(
    parentId: string,
    public data: ICharacterData,
    needDisplay = true
  ) {
    this.divElement = document.createElement('DIV');
    this.setStyle(needDisplay);
    this.render(parentId);
  }

  private setStyle(needDisplay: boolean): void {
    this.divElement.classList.add('card');
    this.divElement.style.display = needDisplay ? 'flex' : 'none';
  }
  private render(parentId: string): void {
    document.querySelector(`#${parentId}`).append(this.divElement);
    this.divElement.innerHTML = `
        <div class="left">
            <div>name: ${this.data.name} / alias: ${this.data.aliases}</div>
            <div>title: ${this.data.title || ''}</div>
            <div class="series">
                <div>books: ${this.data.books.length}</div>
                <div>tvSeries: ${this.data.tvSeries.length}</div>
            </div>
        </div>
        <div class="right">
            <button class="rounded">삭제</button>
        </div>
      `;
  }
}
