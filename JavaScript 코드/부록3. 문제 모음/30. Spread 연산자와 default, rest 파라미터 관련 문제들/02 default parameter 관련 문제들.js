// Q1. default paramter 문제1, 위 코드의 출력 결과는?
//  -> 9 출력
function 함수(a = 5, b = a * 2 ){
  console.log(a + b);
  return 10
}

함수(3);


// Q2. default paramter 문제2, 대괄호가 가득한 위 코드의 출력 결과는?
//  -> 15이 출력
//      -> undefined는 값이 안 들어간 것으로 치부되어, default paramter대로 함수가 실행됨
function 함수(a = 5, b = a * 2 ){
  console.log(a + b);
}

함수(undefined, undefined);