## 1. 실행방법

```bash
# 의존성 설치
$ npm i

# 핫 리로드 localhost:8080
$ npm run serve

# 빌드하기
$ npm run build

# 빌드 결과물 실행
$ npm run preview


```

## 2. 기술

### Vanilla Script

- 실무에서는 vue를 사용했지만, webpack과 순수 자바스크립트로 웹 사이트를 구현해보고 싶어서 Vanilla Script를 선택

### TypeScript

- 빠른 상승세를 자랑하고 있는 타입스크립트 사용
- 타입을 정의함으로써 런타임에러를 잡고 유지보수, 안정성 향상

## 3. 작업시 고민 과정

### api

- axios 라이브러리를 사용하여 APIClient 클래스로 확장성 구조
- characterAPI 로 캐릭터 데이터 조회

### Component 기반

- core : header, footer, AppBar와 같은 기본적인 컴포넌트
- base : atomic 컴포넌트 (버튼, 체크박스)
- character : 캐릭터 관련한 컴포넌트 (필터 버튼들, 캐릭터 리스트)

### Entity

- character interface 작성
- 추가적인 확장타입 extends를 활용

### Service

- character의 비즈니스 로직 작성

### View

- 모든 리스트의 재렌더링이 아닌 특정 아이템의 스타일을 조정함으로써 성능향상 (display: none or flex를 통해 화면 갱신)
- 스크롤 이벤트가 아닌 IntersectionObserver을 통해 스크롤 이벤트 성능 향상
