// [js 속성변경 관련]
// 1. 위치값.addEventListener("이벤트명", 호출함수) : 위치값에 이벤트명에 해당되는 동작이 감지되면, 지정함수의 동작을 실행
// 2. 위치값.setAttribute("속성명", 호출함수 or 지정값) : "속성명"에 위치한 값을 함수의 리턴값이나 지정값으로 대체
// 3. 위치값.style.스타일명(ex. visiblity, color ..) = "결과값"  : 해당 위치값의 style 속성을 바꾼다.
// 3. 위치값.style.src = "결과값"  : 해당 위치값의 src 속성을 바꾼다.

var bigPic = document.querySelector("#cup");        // 큰 이미지 위치값
var smallPic = document.querySelectorAll(".small");    // 작은 이미지 위치값(노드리스트)

// var cup = document.querySelector("#cup");

for(var i = 0; i < smallPic.length; i++){

    // 작은 이미지 노드리스트들을 클릭하면 changePic() 함수가 호출됨
    smallPic[i].addEventListener("click", changePic);
}

function changePic(){
    // click 이벤트가 발생한 현재 대상(this)을 감지(this) 후, src 속성을 newPic에 저장
    var newPic = this.src;
    
    // newPic으로 지정된 이미지 -> 큰 이미지의 src속성으로 투입하여 속성값 변경
    bigPic.setAttribute("src", newPic);

    // cup.src = newPic;
}

// 상세정보 기능
var isOpen = false; // 스위치로서 역할
var view = document.querySelector("#view");

view.addEventListener("click", function(){

    // 상세정보가 감춰져있다면..
    if(isOpen == false){
        // 상세정보를 보이기
        document.querySelector("#detail").style.display = "block";  // display: block = id선택자가 detail인 부분을 다시 보이게 하기
        view.innerHTML = "상세 설명 닫기";  // 내용 수정
        isOpen = true;  
    }else{
        // 상세정보를 감추기
        document.querySelector("#detail").style.display = "none";  // display: none = id선택자가 detail인 부분을 안 보이게 하기
        view.innerHTML = "상세 설명 보기";  // 내용 수정
        isOpen = false;
    }
});