// 서택자 하나에게 다중으로 이벤트 등록은 가능하다.
var pic = document.querySelector("#pic");
//var pic1 = document.getElementById("pic");

// 버블링? : 이벤트가 하위요소에서 발생시, 상위요소까지 전파되는 형태

// id 선택자인 pic에게 마우스가 올라간다 -> changePic() 호출(버블링은 전파X)
pic.addEventListener("mouseover", changePic, false);
// addEventListener 매개변수 설명
//  1. mouseover : 해당 위치값에 마우스가 올라가는 동작
//  2. changePic : changePic() 실행
//  3. false     : 버블링을 선택X

// id 선택자인 pic에서 마우스가 내려간다 -> originPic() 호출(버블링은 전파X)
pic.addEventListener("mouseout", originPic, false);
// addEventListener 매개변수 설명
//  1. mouseout : 해당 위치값에서 마우스가 내려가는
//  2. changePic : originPic() 실행
//  3. false     : 버블링을 선택X

function changePic(){
    pic.src = "../images/boy.png";
    //pic1.src = "../images/boy.png";
}

function originPic(){
    pic.src = "../images/girl.png";
    //pic1.src = "../images/girl.png";
}