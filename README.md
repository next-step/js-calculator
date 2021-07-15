<br/>
<br/>

<p align="middle" >
  <img width="100px;" src="src/images/calculator_icon.png"/>
</p>
<h2 align="middle">level1 - 자바스크립트 계산기</h2>
<p align="middle">자바스크립트 계산기로 익혀보는 Cypress</p>
<p align="middle">
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="template version"/>
  <img src="https://img.shields.io/badge/language-html-red.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/language-css-blue.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/language-js-yellow.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square"/>
</p>

## sinho의 readme 공간!

### cypess with testing-library

-   `testing-library`를 'cypress'와 함께 사용하기로 했다 그 이유는
    1. `react testing`에서도 `testing-library`를 폭넓게 사용하기 때문. 현재 리액트를 주로 사용하는 기업에 재직중 이기 때문에 해당 스택이 나에게 맞는것 같다.
    2. 구현의존적이지 않는` query` 동작방식 - `cy.get()`은 기본적으로 선택자를 기준으로` dom`을 탐색하는 방식이므로 구현 상황에서 선택자의 구조가 바뀔때마다 `test code` 역시 `dependency`가 강하게 엮여있어 수정해야한다. 반면 `testing-library`는 `user-interface` 중심의 접근 방식으로(`role`을 이용한 접근 혹은 `textValue`로 접근하는 방식 등) 구현의존적이지 않아 실제 코드가 변경되어도 `test code`를 바꾸지 않아도 된다.

### 테스트 시작 방법

```
		// parcel index.html로 시작 후
		// node_modules/.bin/cypress open

```

### 코드리뷰 원하는 관점

1. helper->calculator.js로 import할때는 첫번째 코드처럼 모듈관리하였고, calculator폴더의 index.js에서 src 의 index.js 로 넘겨줄때는 두번째 코드처럼 관리하였는데 권장하는 모듈 관리 방식이 있는지, 아니면 원하는 방식대로 관리하면 되는지 궁금합니다.

```javascript
// calculator/helper.js

export const isDigit = (value) => /[0-9]/.test(value);

export const calMapper = {
	x: multiple,
	X: multiple,
	'-': substract,
	'+': add,
	'/': divide,
};

// calculator/index.js
import {isDigit, calMapper, isDigitValid, hasOperation, parseTotal} from './helper.js';
```

```javascript
// calculator/index.js

// ...중략
export default {
	calculate,
	appendDigitToTotal,
	appendOperatorToTotal,
	resetTotal,
};

// src/index.js
import Calculator from './calculator';

const {appendDigitToTotal, appendOperatorToTotal, calculate, resetTotal} = Calculator;
```

### 느낀점

1.  테스트 코드를 작성하기 위해서 선택자를 무엇으로 해야하는지에 대한고민이 깊어졌고, `testing-library`에서 권장하는 우선순위 판단 로직에 의거한 선택자 방식은 결국 `sementic`해야한다고 느껴졌다. 특히 `Role`에 의한 선택자 메커니즘을 이해하기 위해서 `aria-attribute`가 무엇인지 알아야 한다는 필요성을 느꼈다.
2.  최대한 tdd의 방식을 고수하기 위해, 유저의 사용 시나리오를 작성해보고, 엣지케이스를 추가하며 커버리지를 넓히고 나서, 빨간불을 확인한 뒤 코드작성하였다. 켄트백의 tdd by example을 읽었을때는 테스트 코드의 필요성을 논리적으로 느끼기 보다는 절차를 따라하는 클론코딩의 느낌이 강했는데, 직접 간단한 앱을 만들면서 필요성에 의한 테스트코드작성->실패->코드작성->리팩터링의 사이클을 한번 느껴보니 tdd by example을 다시 꺼내 읽어봐야 겠다는 생각이 들었다.


## 🔥 Projects!

<p align="middle">
  <img width="300" src="src/images/calculator_ui.png">
</p>

<p align="middle">
  <a href="https://next-step.github.io/js-calculator/">🖥️ 데모 링크</a>
</p>



## 🎯 기능 요구사항

-   [ ] 2개의 숫자에 대해 덧셈이 가능하다.
-   [ ] 2개의 숫자에 대해 뺄셈이 가능하다.
-   [ ] 2개의 숫자에 대해 곱셈이 가능하다.
-   [ ] 2개의 숫자에 대해 나눗셈이 가능하다.
-   [ ] AC(All Clear)버튼을 누르면 0으로 초기화 한다.
-   [ ] 숫자는 한번에 최대 3자리 수까지 입력 가능하다.
-   [ ] 계산 결과를 표현할 때 소수점 이하는 버림한다.

<br/>

## 📊 테스트 요구사항

**기능 요구사항에 제시된 7개의 항목에 대해 테스트 케이스를 만든다.**

<br/>

## 📄 참고 사항

-   숫자 입력은 **클릭**으로만 가능하다.

<br/>

## 👏 Contributing

만약 미션 수행 중에 개선사항이 보인다면, 언제든 자유롭게 PR을 보내주세요.

<br/>

## 🐞 Bug Report

버그를 발견한다면, [Issues](https://github.com/next-step/js-calculator/issues) 에 등록 후 @eastjun에게 dm을 보내주세요.

<br/>

## 📝 License

This project is [MIT](https://github.com/next-step/js-calculator/blob/master/LICENSE) licensed.

