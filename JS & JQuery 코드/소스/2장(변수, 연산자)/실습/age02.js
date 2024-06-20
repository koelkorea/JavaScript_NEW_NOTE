       //함수 calc()선언 및 구현
       function calc(){
        var currentYear = 2021;
        //prompt로 사용자값 입력("yyyy"는 초기입력값)
        var birthYear = prompt("언제 태어났니?","YYYY");
        // 변수 age를 초기화
        var age = 0;
        age = birthYear - currentYear;
        // document : 현재 페이지 지칭
        // querySelector("#요소명") : id가 해당 요소명인 속성을 지정한 영역(document)에서 찾아라
        // innerHTML : 해당 위치의 값을 지정한 값으로 대체해 HTML 코드로 삽입함(동적효과)
        document.querySelector("#result").innerHTML = "니 나이" + age + "세 니?";
    }