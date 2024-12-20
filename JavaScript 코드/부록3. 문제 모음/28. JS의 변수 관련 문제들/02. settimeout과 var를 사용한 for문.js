// Q7. 다음의 반복문을 실행하면, 예상과 다르게 5,5,5,5,5로 출력되는데, 그 이유는 무엇이며 뭘 어떻게 고치면 되겠냐?

// [why?] 
//  : 1, 2의 이유로 반복문이 다 돈 이후에 실행되게 되는데, 이 때 i는 이미 5가 된 이후이기 때문
//     - 1) var 변수가 함수 스코프 영역을 따름 + 자신이 속한 함수 스코프 가장 위로 호이스팅(hoisting)됨
//     - 2) setTimeout은 시간도 그렇고, 별개의 대기열에서 콜스택이 끝나고 실행
for (var i = 1; i < 6; i++) { 
  setTimeout(function() { console.log(i); }, i * 1000 ); // 5,5,5,5,5
}

// [교정]
//  : var 대신 let을 써서, 각 루프에 해당하는 반복문이 자신만의 스코프{}를 형성하여 거기서 실행이 되게 만듦
//    (= let을 쓰게 되면, 각 루프의 스코프{}의 i는 자신의 루프에 해당하는 값을 정적으로 가지게 됨)
for (let i = 1; i < 6; i++) { 
  setTimeout(function() { console.log(i); }, i * 1000 ); // 1,2,3,4,5
}