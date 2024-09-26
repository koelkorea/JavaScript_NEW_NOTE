// Q3. Parent라는 생성자 함수를 통해 생성된 {상남자}라는 객체에 인위적으로 name이란 프로퍼티가 상속되었다고 설정했는데, 그렇다면 다음 코드의 출력 결과는?
//  -> A : 생성자 함수로부터 받은 'Kim'이 그대로 출력
//           -> 만약! {선조 객체}로부터 상속받은 프로퍼티 중에 현재 자신이 가진 것과 같은 이름이 있으면? 우선순위는 자신의 것

function Parent(){
    this.name = 'Kim';
}

var 상남자 = new Parent();

상남자.__proto__.name = 'Park';
console.log(상남자.name)