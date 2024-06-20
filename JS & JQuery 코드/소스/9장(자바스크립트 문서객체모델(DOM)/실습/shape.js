var mRect = document.querySelector("#rect");

// [style.borderRadius]
//  -> "x%" : mRect 요소(id속성값) 저장된 위치의 테두리를 동그라미로..
//  -> ""   : mRect 요소(id속성값) 저장)저장된 위치의 테두리를 동그라미 X하고 원래대로

// mouseover 이벤트를 처리하는 부분
mRect.addEventListener("mouseover", function(){
    mRect.style.background = "red";     // mRect 요소(id속성값 저장)의 배경색
    // borderRadius = "x%": mRect 요소(id속성값) 저장된 위치의 테두리를 동그라미로..
    mRect.style.borderRadius = "50%";   
});

// mouseout 이벤트를 처리하는 부분
mRect.addEventListener("mouseout", function(){
    mRect.style.background = "";     // mRect 요소(id속성값 저장)의 배경색
    // borderRadius = "": mRect 요소(id속성값) 저장)저장된 위치의 테두리를 동그라미 X하고 원래대로
    mRect.style.borderRadius = "";   
});