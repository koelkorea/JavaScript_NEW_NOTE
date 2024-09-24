// Q1. spread 문제1, 위 코드의 출력 결과는?
//  -> ['김', '밥', 1, 2, 3]
var a = [1,2,3];
var b = '김밥';
var c = [...b, ...a];

console.log(c);   //  -> ['김', '밥', 1, 2, 3]


// Q2. spread 문제2, 대괄호가 가득한 위 코드의 출력 결과는?
//  -> [[1,2,3], 'you', 'are'][1]을 의미하니, 'you'가 출력

var a = [1,2,3];
var b = ['you', 'are'];

var c = function(a,b){
  console.log([...b]);
  console.log( [[...a], ...[...b]][1] )
}

c(a,b);

// Q3. spread 문제3, [numbers] 배열의 모든 값을 기준으로 Math.max를 통해 최대값을 구하기 위해서는?
//  -> spread 연산자로 Math.max를 호출하면 그만
var numbers = [2,3,4,5,6,1,3,2,5,5,4,6,7];

console.log( Math.max(...numbers) );  // 7