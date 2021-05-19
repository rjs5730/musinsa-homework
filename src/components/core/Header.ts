export default class Header {
  headerElement: HTMLElement;

  constructor(public text: string) {
    this.headerElement = document.createElement('h1');
    this.setText(text);
    this.render();
  }

  render() {
    document.querySelector('header').append(this.headerElement);
  }

  setText(text: string) {
    this.headerElement.innerHTML = text;
  }
}
