// Q1. class 문법을 사용해서 다음과 같은 오브젝트 2개를 한번 생성해봐라
//  -> 단! new 연산자를 사용하여, 제대로 생성자 함수로서 기능해게 해라

// [원하는 객체]
// var 강아지1 = { type : '말티즈', color : 'white' };
// var 강아지2 = { type : '진돗개', color : 'brown' }; 

class Dog{
    constructor(type, color){
        this.type = type;
        this.color = color;
    }

    한살먹기(){
        if( this instanceof Cat) {
            this.age++
            console.log(this);
        }
    }
};

var 강아지1 = new Dog('말티즈', 'white');
var 강아지2 = new Dog('진돗개', 'brown');

// Q2. Q1에서 만든 class를 기반으로  age라는 속성을 하나 더 추가하여 다음과 같은 오브젝트 2개를 한번 생성해봐라
//  -> (힌트) 상속기능을 써봐라

// Q3. 모든 Dog Cat {객체}들이 사용가능한 '한살먹기()' 라는 메서드를 사용할 수 있게 작성해야 함 
//  - 한살먹기 함수는 강아지 class로부터 생성된 오브젝트가 사용하면 반응이 없어야 함
//  - 한살먹기 함수는 고양이 class로 부터 생성된 오브젝트가 사용하면 현재 가지고있는 age 속성에 1을 더해주는 기능을 실행해야함

//  (해설) 
//    : instanceof 연산자를 통해 해당 객체가 Cat인 경우에만 메서드를 사용토록 출력

// [원하는 객체]
// var 고양이1 = { type : '코숏', color : 'white', age : 5 };
// var 고양이2 = { type : '러시안블루', color : 'brown', age : 2 }; 

class Cat extends Dog{
    constructor(type, color, age){
        super(type, color);
        this.age = age;
    }
}

var 고양이1 = new Cat('코숏', 'white', 5);
var 고양이2 = new Cat('러시안블루', 'brown', 2);

강아지1.한살먹기();
고양이2.한살먹기();