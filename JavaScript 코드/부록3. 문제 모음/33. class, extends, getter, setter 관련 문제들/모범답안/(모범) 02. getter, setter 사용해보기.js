// Q1. JS로 간단한 게임 기능을 가진 오브젝트를 뽑는 Unit이라는 class를 다음 조건을 맞춰 작성해라 

// - 모든 Unit의 인스턴스는 공격력, 체력 속성이 있음
// - 기본 공격력은 5, 기본 체력은 100으로 설정

// - 모든 Unit의 인스턴스는 전투력을 측정해주는 battlePoint라는 getter 함수가 존재
//    ex) console.log( 인스턴스.battlePoint ) => 현재 공격력과 체력을 더한 값을 콘솔창에 출력

// - 모든 Unit의 인스턴스는 heal이라는 setter 함수가 존재
//    ex) 인스턴스.heal = 50 이렇게 사용하면 체력 속성이 50 증가

class Unit{
    constructor(공격력 = 5, 체력 = 100){
        this.공격력 = 공격력;
        this.체력 = 체력;
    }

    get battlePoint(){
        return this.공격력 + this.체력;
    }

    set heal(숫자){
        return this.체력 += parseInt(숫자);
    }
}

var 유닛 = new Unit(20,200);
console.log( 유닛.battlePoint );    // 220

유닛.heal = 40;
console.log( 유닛.battlePoint );    // 260


// Q2. {data} 안에 getter, setter 역할 함수를 작성해라
//  -> 단! 참고로 함수에 넣는 파라미터가 2개 이상이면 set 키워드는 못 쓰기에, 그냥 메서드 선언하듯 작성해라

//  - setter함수(...자연수들);로 호출
//     : 홀수는 [odd], 짝수는 [even] 이라는 {data} 내부의 프로퍼티들에 각각 [array] 형태로 저장되어야 함

//       ex) data.setter함수(1,2,3,4,5) 호출
//            -> data = { odd : [1,3,5], even : [2,4] }

//  - getter함수();를 호출
//     : [odd], [even]에 저장된 모든 데이터들이 숫자순으로 정렬되어 출력
//         -> sort() 메서드는 비교식인 콜백함수 없이는 문자열로 치환해서 정렬함


//  (해설) 
//    : 한번에 출력하라는 문제 의미를 잘못 생각해서, 구현의 차이가 있음.. 모범 답안은 스프레드 연산자로 [1개의 배열]에 넣고 각각 정렬

var data = {
    odd : [],
    even : [],
    setter함수(...숫자들){

        [...숫자들].forEach((개별숫자) => {
            개별숫자 % 2 == 0?  
            this.even.push(parseInt(개별숫자)) : this.odd.push(parseInt(개별숫자));
        });

        this.odd.sort((a, b) => a - b);
        this.even.sort((a, b) => a - b);
    },

    getter함수(){
        return [...this.odd, ...this.even ];
    }
}

data.setter함수(5,1,6,33,18,56,65,1515,333,544);
console.log(data.getter함수());