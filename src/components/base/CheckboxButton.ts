/**
 * 체크박스 컴포넌트
 */
export default class CheckboxButton {
  checkboxElement: HTMLElement;
  isChecked: boolean = false;

  constructor(public label: string, public type: string, parentId: string) {
    this.checkboxElement = document.createElement('LABEL');
    this.setDataset(type);
    this.setStyle();
    this.render(parentId);
  }

  render(parentId: string) {
    document.querySelector(`#${parentId}`).append(this.checkboxElement);
    this.checkboxElement.innerHTML = `
        <input type="checkbox" value="${this.type}">
        ${this.label}
    `;
    this.checkboxElement.addEventListener('click', () => {
      this.isChecked = !this.isChecked;
      if (this.isChecked) this.checkboxElement.classList.add('is-checked');
      else this.checkboxElement.classList.remove('is-checked');
    });
  }

  setDataset(type: string) {
    this.checkboxElement.dataset.toggleId = type;
  }

  setStyle() {
    this.checkboxElement.classList.add('filter-checkbox-button');
  }
}
