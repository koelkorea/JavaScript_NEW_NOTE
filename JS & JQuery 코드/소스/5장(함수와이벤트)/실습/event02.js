// display 태그 통제법 (block이 보이게 하는거, none이 안 보이게하는거)

// 상세설명을 보게하는 함수
function showDetail(){
    document.querySelector("#desc").style.display = "block";
    document.querySelector("#open").style.display = "none";
}
// 상세설명을 닫는 함수
function hideDetail(){
    document.querySelector("#desc").style.display = "none";
    document.querySelector("#open").style.display = "block";
}