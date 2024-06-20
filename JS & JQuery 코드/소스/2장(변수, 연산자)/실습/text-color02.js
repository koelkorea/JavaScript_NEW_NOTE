// heading이란 변수에 id가 heading인 속성의 위치를 저장하게 함
var heading = document.querySelector("#heading");
// heading 변수(= id가 heading 속성인 html태그) 클릭시, 해당 스타일 색상이 빨간 -> 녹색
heading.onclick = function(){
    heading.style.color = "blue";
}