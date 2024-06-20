// 전역변수 선언과 동시에 초기화
var cnt = 0;
var $score = null;
var $fish = null;
var play = false;   // 플래그 변수(게임이 시작하면 true 값)
var timerID = 0;

$(document).ready(function(){
    // 요소 초기화
    init();
    // 이벤트를 등록
    initEvent();
});

// 전역에서 사용할 요소를 찾아오기
function init() {
    $score = $("#score");
    $fish = $("#fish");
}

// 이벤트 등록하기
function initEvent(){

    // 버튼을 누르면, 게임시작
    $("#start").click(function(){
        startGame();
    });

    // 물고기를 누르면, 점수가 증가
    $("#fish").click(function(){
        addScore();
    });
}

// startGame() 구현
function startGame(){
    // 플래그 변수로 false일 때, 게임을 시작할 수 있게 만듦
    if(play == false){
        // 게임이 종료가 되었는지 체크하는 함수 호출
        checkEndGame();
        play = true;
        timerID = setInterval(function(){
            // 물고기 움직이기
            moveFish();
        }, 500);
    }
}

// 점수를 증가시키는 addScore();
function addScore(){
    if(play == true){
        cnt++;
        $score.html(cnt);
    }
}

// 물고기 움직이게 하는 moveFish() 구현
function moveFish(){
    // 물고기 크기 120 x 70
    // 패널의 크기 600 x 400

    // 물고기가 x축 이동 영역 0~480 (= 600-120)
    var x = parseInt(Math.random() * 480);
    // 물고기가 y축 이동 영역 0~330 (= 400-70)
    var y = parseInt(Math.random() * 330);

    $fish.css({
        left: x, 
        top: y
    })
}

function checkEndGame(){

    // 게임은 켜지면 5초동안만 실행되고 종료..
    setTimeout(function(){
        play = false;
        // 물고기 움직이는 타이머를 종료
        clearInterval(timerID);
        alert("게임 종료");
    }, 5000);
}