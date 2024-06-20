// 전역변수 초기화
var $view = null;
var currentIndex = 1;   // 이미지 목차번호(stop을 통해 멈추더라도, 여기에 값이 저장되니 play를 다시하면 그 자리에서 다시 돌아감)
var timerID = 0;        // 이벤트 자동실행 관련 변수 저장용 

// 시작부분
$(document).ready(function(){
    init(); // 전역변수 초기화 및 함수 호출
    initEvent();    // 이벤츠 초기화 함수등록
});

// 초기화 함수
function init(){
    // view 객체를 찾아옴
    $view = $("#view");
}

// 이벤트 초기화
function initEvent(){

    // play버튼에 자동실행 이벤트 등록
    $("#play").click(function(){
        startAutoPlay();
    });

    // stop버튼에 멈춤 이벤트 등록
    $("#stop").click(function(){
        stopAutoPlay();
    });

    // prev버튼에 이전 이미지 보여주는 이벤트 등록
    $("#prev").click(function(){
        prevImage();
    });

    // next버튼에 이전 이미지 보여주는 이벤트 등록
    $("#next").click(function(){
        nextImage();
    });

}

// 자동 실행(이미지 애니메이션 효과) 함수
function startAutoPlay(){
    if(timerID == 0){
        // 0.05초마다 nextImage()를 실행함 -> timerID에 이를 제어할 해당 반복함수에 대한 값이 저장
        timerID = setInterval(function(){
            nextImage();
        }, 50);
    }
}

// 다음 이미지를 보여주는 함수
function nextImage(){
    // 다음 이미지를 보여주기 위해 +1을 함
    var index = currentIndex + 1;

    // 회전 이미지는 총 60개이므로 아래와 같이 설정하여, 1~60이 반복되게 함
    // (0.01초에 1장이니 100프레임?)
    if(index == 61){
        index = 1;
    }
    showImage(index);
}

// 실질적으로 이미지를 보여주는 함수
function showImage(index){
    // 이미지의 src속성을 실행하고 있다.
    $view.attr("src", "../images/" + index + ".jpg");
    currentIndex = index;
    console.log("현재 이미지 번호 : " + currentIndex);
}

// 멈춤 함수
function stopAutoPlay(){

    // 타이머ID가 존재함 = 애니메이션이 실행
    if(timerID != 0){
        // timerID에 존재하는 반복실행 관련 이벤트 값을 지우고
        clearInterval(timerID);
        // 이를 다시 0으로 설정 = OFF상태로 돌려줌
        timerID = 0;
    }
}

// 이전 이미지를 보여주는 함수
function prevImage(){

    var index = currentIndex-1

    // 0번 이미지는 없으니, 강제로 가장 뒤의 이미지 60번을 설정
    if(index == 0){
        index = 60;
    }

    showImage(index);
}


// 이후 이미지를 보여주는 함수
function nextImage(){

    var index = currentIndex+1

    // 61번 이미지는 없으니, 강제로 가장 앞의 이미지 1번을 설정
    if(index == 61){
        index = 1;
    }

    showImage(index);
}