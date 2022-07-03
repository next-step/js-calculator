# JS-CALCULATOR(계산기)

button event click event - SETTER

- type

  - digit - set, get
  - modifier - set, get
  - operation - set, get

- caculator (2개의 숫자에 대해)

  - 덧셈
  - 뺄셈
  - 곱셈
  - 나눗셈

- initalizer

  - AC(All Clear)버튼을 누르면 0으로 초기화 한다.

- validaiter
  - 숫자는 한번에 최대 3자리 수까지 입력 가능하다.
  - 계산 결과를 표현할 때 소수점 이하는 버림한다.
- render() 함수

- testcode는 먼저 cypress 테스트를 진행해보도록한다.

## 참고 자료

**자바스크립트 코드 컨벤션을 지키면서 프로그래밍** 한다.

- eslint 설정
- prettier 설정

테스트 가능한 코드를 구현하면서 자연스럽게 피드백을 받음

**`import`**문을 이용해 스크립트를 모듈화하고 불러올 수 있게 만든다.

**함수(또는 메소드)가 한 가지 일만 하도록 최대한 작게** 만들어라. 만약 15줄이 넘어간다면 의심해보기

**indent(인덴트, 들여쓰기) depth를 3이 넘지 않도록 구현한다. 2까지만 허용**한다.

- 예를 들어 while문 안에 if문이 있으면 들여쓰기는 2이다.
- 힌트: indent(인덴트, 들여쓰기) depth를 줄이는 좋은 방법은 함수(또는 메소드)를 분리하면 된다.
