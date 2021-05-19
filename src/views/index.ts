import '@/assets/index.css';

import Header from '@/components/core/Header';
import Characters from '@/components/character/Characters';

export class Main {
  HEADER_TEXT = '무신사 과제';

  constructor() {
    new Header(this.HEADER_TEXT);
    new Characters();
  }
}

new Main();
