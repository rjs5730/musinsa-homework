// components
import CharactersFilterButtons from '@/components/character/CharactersFilterButtons';
import CharacterCard from '@/components/character/CharacterCard';

// entities and type
import { Gender, ICharacterData } from '@/entities';
import { AxiosError, AxiosResponse } from 'axios';
// utils
import { getUrlParams } from '@/utils';
// api
import { CharactersService } from '@/services';

export default class Characters {
  FILTER_ID = 'filter';
  LIST_ID = 'list';

  private characterService: CharactersService;
  private filters: Set<string>;
  private charactersFilterButtons: CharactersFilterButtons;
  private items: ICharacterData[];
  private pagination = { page: 1, pageSize: 10 };

  private listView = document.querySelector('#list');
  private fetchMoreTrigger = document.querySelector('#fetchMore');
  private fetchMoreObserver: IntersectionObserver;

  constructor() {
    this.init();
    this.setInterface();
  }

  init() {
    this.characterService = new CharactersService();
    this.items = [];
    this.filters = new Set();
    this.charactersFilterButtons = new CharactersFilterButtons(this.FILTER_ID);
    const pageNumber = parseInt(getUrlParams('page'));
    if (pageNumber && typeof pageNumber === 'number') {
      this.pagination.page = pageNumber;
    }

    this.fetchMore().then(() => {
      this.listView.classList.remove('loading');
      this.addList();
    });
  }

  setInterface() {
    this.setInfiniteScroll();
    this.setButtonEvent();
  }

  setButtonEvent() {
    // 필터 버튼 처리
    this.charactersFilterButtons.handleClick(
      (filter: Filter, checked: boolean) => {
        switch (filter) {
          case 'init':
            this.charactersFilterButtons.setInactiveAll();
            this.initList();
            break;
          default:
            checked ? this.filters.add(filter) : this.filters.delete(filter);
            this.filterList();
            break;
        }
      }
    );
    // 삭제 버튼처리
    this.listView.addEventListener('click', (e: any) => {
      const target = e.target.tagName;
      if (target !== 'BUTTON') return;
      e.target.closest('.card').style.display = 'none';
    });
  }

  addList() {
    const startIndex = (this.pagination.page - 1) * this.pagination.pageSize;
    const last = startIndex + this.pagination.pageSize;

    for (let i: number = startIndex; i < last; i++) {
      new CharacterCard(
        this.LIST_ID,
        this.items[i],
        this.checkNeedDisplay(this.items[i])
      );
    }
  }

  filterList() {
    const displayedCardElements: any = this.listView.querySelectorAll('.card');
    this.items.forEach((item, index) => {
      displayedCardElements[index].style.display = this.checkNeedDisplay(item)
        ? 'flex'
        : 'none';
    });
  }

  initList() {
    this.filters = new Set();
    this.listView
      .querySelectorAll('div[style*="display: none"]')
      .forEach((item: HTMLElement) => {
        item.style.display = 'flex';
      });
  }

  checkNeedDisplay(item: ICharacterData): boolean {
    let result = true;
    this.filters.forEach((element: Filter) => {
      switch (element) {
        case 'gender':
          if (item.gender === Gender.Male) result = false;
          break;
        case 'isLive':
          if (item.died) result = false;
          break;
        case 'hasTvSeries':
          if (item.tvSeries.length) result = false;
          break;
        default:
          break;
      }
    });
    return result;
  }

  setInfiniteScroll() {
    this.fetchMoreObserver = new IntersectionObserver(
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          this.pagination.page++;
          this.fetchMore().then(() => this.addList());
        }
      }
    );
    this.fetchMoreObserver.observe(this.fetchMoreTrigger);
  }

  async fetchMore() {
    await this.characterService
      .getAll(this.pagination)
      .then((result: ICharacterData[]) => {
        result.map(
          (character) =>
            (character.tvSeries = character.tvSeries.filter(
              (word) => word.length > 0
            ))
        );
        this.items.push(...result);
      });
  }
}
