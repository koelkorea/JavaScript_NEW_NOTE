// Q2. sayHi() 메서드를 prototype 객체에 추가해서 상속되도록 유도했는데, 코드가 제대로 나오지 않는 이유가 무엇인가?
//  -> A : 해당 메서드가 arrow function(화살 함수)를 사용한 함수표현식으로 작성되었기에, this는 작접적으로 해당 함수가 작성된 위치의 스코프{} 영역을 기준으로 정해짐
//         (= 호출한 주체가 누구니 어디 {객체}에 소속된 메서드니 1도 신경 안 씀)
//             -> 그래서 Student.prototype.sayHi의 this는 {전역 객체}를 의미하고, 거기에는 name이란 프로퍼티가 없어 찾을수가 없으니 당연히 출력에 문제가 생김
function Student(이름, 나이){
    this.name = 이름;
    this.age = 나이;
}

Student.prototype.sayHi = () => {
    console.log('안녕 나는 ' + this.name + '이야');
}
var 학생1 = new Student('Kim', 20);

학생1.sayHi(); 