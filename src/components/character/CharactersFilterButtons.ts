import Button from '@/components/base/Button';
import CheckboxButton from '@/components/base/CheckboxButton';

export default class CharactersFilterButtons {
  INIT_BUTTON_ID = 'filterInitButton';
  element: HTMLElement;
  liveCheckboxButton: CheckboxButton;
  sexCheckboxButton: CheckboxButton;
  tvCheckboxButton: CheckboxButton;
  initFilterButton: Button;

  constructor(public id: string) {
    this.element = document.querySelector('#filter');
    this.setId(id);
    this.setPage();
  }

  setId(id: string) {
    this.element.id = id;
  }

  setPage() {
    this.liveCheckboxButton = new CheckboxButton(
      '생존인물만',
      'isLive',
      this.id
    );
    this.sexCheckboxButton = new CheckboxButton('여자', 'gender', this.id);
    this.tvCheckboxButton = new CheckboxButton(
      'tvSeries 없음',
      'hasTvSeries',
      this.id
    );
    this.initFilterButton = new Button(
      this.INIT_BUTTON_ID,
      '초기화',
      '타입',
      this.id
    );
  }

  setInactiveAll() {
    this.liveCheckboxButton.isChecked = false;
    this.sexCheckboxButton.isChecked = false;
    this.tvCheckboxButton.isChecked = false;
    this.element
      .querySelectorAll('.filter-checkbox-button')
      .forEach((item) => item.classList.remove('is-checked'));
  }

  handleClick(callback: any) {
    // 이벤트 위임
    this.element.addEventListener('click', (e: any) => {
      if (e.target.id === this.INIT_BUTTON_ID) {
        callback('init');
        return;
      }
      const id = e.target.dataset.toggleId;
      const isChecked = e.target.classList.contains('is-checked');
      if (id) callback(id, isChecked);
      // 해당 고유의 동작(체크박스) 막음
      e.preventDefault();
    });
  }
}
