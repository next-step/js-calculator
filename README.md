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

## 🔥 Projects!
<p align="middle">
  <img width="300" src="src/images/calculator_ui.png">
</p>

<br/>

## 🎯 기능 요구사항

- [x] 2개의 숫자에 대해 덧셈이 가능하다.
- [x] 2개의 숫자에 대해 뺄셈이 가능하다.
- [x] 2개의 숫자에 대해 곱셈이 가능하다.
- [x] 2개의 숫자에 대해 나눗셈이 가능하다.
- [x] AC(All Clear)버튼을 누르면 0으로 초기화 한다.
- [x] 숫자는 한번에 최대 3자리 수까지 입력 가능하다.
- [x] 계산 결과를 표현할 때 소수점 이하는 버림한다.

<br/>

## 👏 Contributing

- 연산자 이후 '=' 버튼을 눌렀을 때 에러 알림
- 숫자 드래그시에 div가 선택되어 모든 숫자가 눌리는 경우 방지
> const $digits = document.querySelector('.digits');
> -> document.querySelectorAll('.digits button');

<br/>

## 🐞 Bug Report

- 연산자 이후 '=' 버튼을 눌렀을 때에도 동작이 되기 때문에 infinity 발생
- 숫자 드래그시 div에 .digit이 있어 querySelector로 div가 연결되어 모든 숫자가 전부 입력되는 문제 발생

<br/>

## 💬 후기

- 처음에는 쉽다고 생각하면서 했는데 다른 분들 코드를 보니 다들 실력이 너무 좋아서 기능 구현만이 아니라 코드 질을 올려야겠다고 생각했고 많이 배웠습니다.
- cypress를 처음 써보아서 고생을 했으나 써보니 상상 이상으로 좋은 툴이라고 생각되었습니다.
- 데모에 버그라고 생각되는 부분 해결하였습니다.