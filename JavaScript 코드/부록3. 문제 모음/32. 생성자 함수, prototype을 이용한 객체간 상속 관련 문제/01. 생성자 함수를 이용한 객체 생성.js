// Q1. constructor문법을 사용해서 다음과 같은 오브젝트 3개를 한번 생성해봐라
//  -> 단! new 연산자를 사용하여, 제대로 생성자 함수로서 기능해게 해라

// [원하는 객체]
// var 학생1 = { name : 'Kim', age : 20 }
// var 학생2 = { name : 'Park', age : 21 }
// var 학생3 = { name : 'Lee', age : 22 }

// Q2. 여기에 학생1.sayHi()라고 사용하면 "안녕 나는 Kim이야" 라는 글자가 콘솔창에 나오도록 sayHi()라는 함수도 constructor 안에 추가

// [답안1]
//  : 함수가 {리터럴 객체}를 반환하게 함
function student1(name, age) {
    return { name , age, sayHi : function() {
        alert('안녕 나는 ' + this.name + '이야');
    }};
}

var 학생1 = new student1('Kim', 20);
var 학생2 = new student1('Park', 21);
var 학생3 = new student1('Lee', 22);

console.log(학생1);
console.log(학생2);
console.log(학생3);
console.log(학생1.sayHi());

// [답안2]
//   : new가 붙는 순간 해당 함수를 생성자 함수로 받아들인다는 점을 이용, 생성자 함수의 작성방식으로 작성
function student2(name, age) {
    this.name = name ;
    this.age = age;
    this.sayHi = function() {
        alert('안녕 나는 ' + this.name + '이야');
    }
}

var 학생4 = new student2('Kim', 20);
var 학생5 = new student2('Park', 21);
var 학생6 = new student2('Lee', 22);

console.log(학생4);
console.log(학생5);
console.log(학생6);
console.log(학생4.sayHi());
