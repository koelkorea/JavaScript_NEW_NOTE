// Q4. 다음과 같이 모든 [배열] 형식의 자료형에 사용가능한, array 내에 있는 parameter변수의 값을 제거해주는 remove()라는 메서드를 만들려면 어떻게 해야하나? 직접 작성하라
//  -> A : 모든 [배열] 형식의 자료형들은 사전에 정의된 Array라는 생성자 함수로 생성되어, 그 내부 프로퍼티인 {prototype 객체}의 내용들을 모조리 기본적으로 상속받아 부여받음
//         (= 모든 [배열]들이 사용가능한 메서드를 추가하고 싶지만 그 Array란 생성자 함수가 이미 기본으로 작성되어 곤란하다면, Array 생성자 함수의 {prototype 객체}에 속한 메서드로 만들어 끼워넣으면 됨)
//             -> (참고) [요소, 요소2, ...] 이렇게 대입되는 [배열]도 실은 new Array(...요소들)과 같은 생성자 함수로 만들어짐

Array.prototype.remove = function(target){
    let result = this.filter( (a) =>{
        return a != target;
    });

    return result;
}

var arr = [1,2,3];
arr = arr.remove(3);

console.log(arr); // [1,2]