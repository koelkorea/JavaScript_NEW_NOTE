function newRegister(){
    // document.createElement("element 노드(태그)") : 해당 명칭의 새로운 element 노드를 만들기 
    var newP = document.createElement("p");     // 새로운 p요소를 만들기

    var userName = document.querySelector("#userName");

    // document.createTextNode("내용" or 지정변수) : 해당 내용이나 변수의 값을 베이스로 text 노드를 새롭게 만든다  
    //  -> JQuery $().val() = "내용" or 지정변수 와도 같은 이야기
    var newText = document.createTextNode(userName.value);     // 새로운 텍스트 노드를 만들기

    // 위치값.appendChild(다른 위치값  or 노드) : (상위) 위치값 - (하위) 다른 위치값 or 노드 같이 위치별 상하위 관계를 설정해서 이어주는 함수
    newP.appendChild(newText); // p노드가 상위요소가 되고 text라는 하위요소를 연결하기

    var delBtn = document.createElement("span");    //  새로운 span 속성 노드를 추가
    var delText = document.createTextNode("X");     //  새로운 TEXT 노드를 추가

    delBtn.setAttribute("class", "del");    // 버튼에 class="del" 속성을 추가
    delBtn.appendChild(delText);            // delText 텍스트 노드를 button의 자식요소로 추가하기
    newP.appendChild(delBtn);               // delBtn을 p요소의 하위요소로 만들기

    var nameList = document.querySelector("#nameList");

    // 위치값.insertBefore(추가할속성값, 위치값.childNodes[배열위치]) : 추가할 속성값을 위치값.childNodes[배열위치] 보다 앞으로 둔다.
    // 위치값.childNodes : 해당 위치의 노드의 직속자식 노드들을 배열화하여 나타냄(= 이를 통해 쉽게 자식에게 접근가능)
    nameList.insertBefore(newP, nameList.childNodes[0]);    // p요소를 #nameList의 맨 앞에 추가

    // nameList.appendChild(newP); // P노드가 ID선택자가 nameList인 요소의 하위값으로 설정
    
    userName.value = "";    // 텍스트 입력 필드 지우도록 조치

    var removeBtns = document.querySelectorAll(".del"); // 입력값인 span을 전부 찾는다.

    // removeBtns 배열값들, 즉 "X"의 전체를 반복해서, 이벤트 실행여부 체크
    for(var i = 0; i < removeBtns.length; i++){

        // removeBtns의 각각의 버튼에 이벤트를 등록하고 있다.
        removeBtns[i].addEventListener("click", function(){

            // this.parentNode.parentNode = #nameList
            // (removeBtns -> 부모 : p -> 부모 : #nameList)
            if(this.parentNode.parentNode){

                // 위치값.removeChild(지정노드) : 위치값의 자식노드 중 지정된 값을 제거한다.

                // #nameList(removeBtns -> 부모 : p -> 부모 : #nameList)의 자식노드 중 p태그를 삭제해라(removeBtns -> 부모 : p) 
                this.parentNode.parentNode.removeChild(this.parentNode);    // p태그를 삭제
            }


        });

    }

}