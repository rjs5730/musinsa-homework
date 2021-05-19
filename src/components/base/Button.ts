/**
 * 버튼 컴포넌트
 */
export default class Button {
  buttonElement: HTMLElement;

  constructor(id: string, text: string, type: string, parentId: string) {
    this.buttonElement = document.createElement('BUTTON');
    this.setId(id);
    this.setText(text);
    this.setStyle(type);
    this.render(parentId);
  }

  render(parentId: string) {
    document.querySelector(`#${parentId}`).append(this.buttonElement);
  }
  setId(id: string) {
    this.buttonElement.id = id;
  }

  setText(text: string) {
    this.buttonElement.innerHTML = text;
  }
  setStyle(type: string) {
    type === 'square'
      ? this.buttonElement.classList.add('square')
      : this.buttonElement.classList.add('rounded');
  }
  /**
   * 버튼이 클릭되었을 때어떤 버튼이 클릭되었는지 콜백으로 알려줍니다.
   * @param {callback}
   */
  handleClick(callback: () => void) {
    this.buttonElement.addEventListener('click', () => {
      callback();
    });
  }
}
