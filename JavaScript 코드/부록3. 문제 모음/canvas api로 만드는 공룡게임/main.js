// canvas api로 제작한 공룡게임에 다음기능도 넣어보시오
//  1. 점프 여러번 금지?
//  2. 공룡이 달리는 것처럼 보이게?
//  3. 배경 다가오는건?
//  4. 장애물이 나타나는 간격을 랜덤하게?
//  5. 점수표기는?
//  6. 시간 지날 때 점수도 오르는 기능은?

// <canvas> 태그를 DOM선택자로 지정
var canvas = document.getElementById('canvas');

// <canvas> 태그 영역 너비와 높이를 브라우저 내부를 기준 100보다 작게 지정
canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

// <canvas>선택자.getContext('2d')
//   : 지정 <canvas> 태그 영역의 2D로 뭔가를 그리기 위해 '맥락'을 2D로 지정
//      -> 이를 시작으로 fillStyle, fillRect(x위치, y위치, 너비, 높이), drawImage(x위치, y위치, 너비, 높이) 등등이 파생
var ctx = canvas.getContext('2d');

//------------------------[플레이어블 공룡 관련 코드]-----------------------------

// 공룡 이미지 정보를 담을 변수 dinosaurImg
//   -> (주의) <canvas> 태그에서 사용될 이미지라면, 여기서 공룡 이미지의 크기나 좌표를 지정해봐야 전혀 반영이 안됨
//      (=  <canvas> 태그에서 사용될 이미지는 <canvas>선택자.getContext('2d').fill~메서드를 사용해서 정보를 넣자
var dinosaurImg = new Image();
dinosaurImg.src = 'dinosaur.png';

// <canvas> 태그 영역에서 그려질 {공룡}에 대한 정보 
//  : x, y, 너비, 높이 크기와 draw()함수를 통해 해당 {공룡 객체}가 <canvas> 태그 영역에서 차지할 모양과 크기와 이미지 크기를 정함
var dino = {
    x : 10,
    y : 200,
    width : 50,
    height : 50,
    draw(){
        // <canvas>선택자.getContext('2d') 이후 메서드 체이닝
        //   1. <canvas>선택자.getContext('2d').fillStyle = '색깔'
        //        : 해당 <canvas> 태그 영역에 그려질 모형의 색
        ctx.fillStyle = 'green';

        //   2. <canvas>선택자.getContext('2d').fillRect(x좌표, y좌표, 너비, 높이)
        //        : 해당 <canvas> 태그 영역에 그려질 4각형 모형의 좌표(x,y)와 너비 * 높이
        //           -> 보통 해당되는 부분이 <canvas> 내 다른 도형과 상호작용을 하게되 어있음
        ctx.fillRect(this.x, this.y, this.width, this.height);

        //   3. <canvas>선택자.getContext('2d').drawImage(이미지객체, x좌표, y좌표, 너비, 높이)
        //        : 해당 <canvas> 태그 영역에 그려질 이미지객체의 좌표(x,y)와 너비 * 높이
        //           -> 이쪽은 보통 게임에 등장하는 {객체}의 스킨에 해당됨
        ctx.drawImage(dinosaurImg, this.x, this.y, this.width, this.height);
    }
}

// draw() 메서드 호출을 통해, {공룡}을 <canvas> 태그 영역에 그림 
dino.draw();

//------------------------[플레이어블 공룡 관련 코드]-----------------------------

// 장애물인 선인장 이미지 정보를 담을 변수 cactusImg
var cactusImg = new Image();
cactusImg.src = 'cactus.png';

// 장애물인 선인장 {객체}를 생성해줄 클래스
//  -> 장애물은 주기적으로 생성되기 떄문에 class로 만들어서 생성하는게 나음
class Cactus { 

    constructor() {
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }

    draw(){
        ctx.fillStyle = 'red';
        ctx.fillRect(cactusImg.x, this.y, this.width, this.height);
        ctx.drawImage(img1, this.x, this.y, this.width, this.height);
    }
}

//--------------------[게임 시작 후, 애니메이션 프레임 진행 관련 코드]--------------------

// 현재 애니메이션 진행과 관련된 데이터를 담을 변수 animationStatus
var animationStatus;

// 현재 프레임을 체크하기 위한 변수 frameTimer
var frameTimer = 0;

// 점프한 이후 프레임을 체크 하기 위한 변수 jumpTimer
var jumpTimer = 0;

// 점프 상태를 체크하기 위한 변수 jumping (space키를 누를시 이벤트 리스너와 애니메이션 프레임 진행하는 함수와 연계 예정)
var jumping = false;

// space 버튼을 누를 시, jumping 변수의 상태를 true로 변경해주는 이벤트리스너
//   -> space키를 누를시 이벤트 리스너와 애니메이션 프레임 진행하는 함수와 연계 예정
document.addEventListener('keydown', function(e){
    if(e.code === 'Space'){
        jumping = true;
    }
})

// 장애물로 등장하는 선인장 {객체}들을 메모리 관리하기 위한 [배열] 변수 cactusArray
var cactusArray = [];

// 본격적으로 게임을 시작하여 애니메이션이 작동하면, <canvas> 태그 영역의 {객체}들이 어떻게 작동하고 상호작용할지에 대한 함수
//   -> requestAnimationFrame() 함수를 통해 재귀식으로 동작하며, 애니메이션의 1초를 이루는 프레임의 개수는 모니터의 주사율을 따라감...
function 프레임진행(){

    // requestAnimationFrame(함수)
    //  : <canvas> 태그 영역의 애니메이션 프레임을 parameter변수에 augument에 해당하는 함수의 내용대로 계속 재귀식으로 진행시키도록 하는 함수
    animationStatus = requestAnimationFrame(프레임진행);
    console.log(animationStatus);

    // requestAnimationFrame(프레임진행)이 실행되었을 때, 해당 프레임이 몇프레임인지 알려주는 frameTimer에 +1을 해줌
    frameTimer++;

    // <canvas>선택자.getContext('2d').clearRect(x좌표, y좌표, 너비, 높이)
    //   : <canvas> 태그 영역의 특정 영역을 투명하게 지우는 데 사용되는 메서드로 좌표(x,y)와 그 위치를 기준으로 너비, 높이에 해당하는 영역을 지워 초기화
    //       -> 대충, <canvas> 태그 영역에서의 현재의 모습만을 남기기 위해 과거의 모습을 지우는 용도로 사용된다고 생각하면 됨

    //    # clearRect 메서드 용도
    //       a. 캔버스 초기화
    //           : 그림을 그리기 전, 이전에 그려진 내용을 지우는데 사용
    //             (= 조치를 안 취해두면, 이전에 그려놓은 부분과 겹침)

    //       b. 애니메이션 구현
    //           : 프레임 간의 이전 그림을 지우고, 새로운 그림을 그려 부드러운 애니메이션 효과를 구현할 때 활용

    //       c. 동적 그래픽 업데이트
    //           : 사용자 인터랙션이나 실시간 데이터에 따라 그래픽을 업데이트할 때 필요
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 현재 프레임이 매 프레임마다 랜덤으로 0 ~ 1000 사이에 생성되는 수와 나눠져서 나머지가 없으면?
    //   -> 새로운 장애물을 생성하고, 이를 장애물 객체를 담는 배열 cactusArray에 담음
    if(frameTimer % Math.floor(Math.random() * 1000) === 0){
        var cactus = new Cactus();
        cactusArray.push(cactus);
    }

    // 존재하는 장애물들이 있는 [배열] 각각을 순회반복하여, 상태 및 충돌판정을 계산한 뒤, 각각 현재 위치에 맞게 <canvas> 태그 영역에 그려줌
    cactusArray.forEach((cactus, index, array) => {

        // 현재 개별 장애물의 좌표가 0보다 낮으면 [배열]에서 제거하여, {장애물 객체} 자체를 없애기
        if(cactus.x < 0){
            array.shift();
            // array.splice(i, 1);
        }

        // 해당 장애물의 x좌표를 이동
        cactus.x--;

        // 현재 장애물과 플레이어 공룡의 충돌판정 계산
        충돌여부(dino, cactus);

        // 장애물을 그리기
        cactus.draw();
    })

    // space를 눌러서 점프중 상태면?
    //   -> 공룡의 y축 좌표를 줄여서 점프효과를 내고, 점프 지속시간 타이머 + 1을 해줌
    if( jumping == true ){
        dino.y--;
        jumpTimer++;

    }else{

        // 점프중 상태가 아니라면, 공룡의 y축좌표가 200보다 작을때까지 좌표를 상승시킴
        if(dino.y < 200){
            dino.y++;
        }
    }

    // 점프타이머가 100 이상이면, 점프관련 변수들 초기화
    if( jumpTimer > 100 ){
        jumping = false;
        jumpTimer = 0;
    }

    // 공룡을 그리기
    dino.draw();
    //console.log(cactusArray);
}

프레임진행();

// 충돌확인 함수
//   -> 2개의 {도형 객체}를 받은 뒤, 거리차이가 모두 음수(-)면, cancelAnimationFrame() 함수를 실행
function 충돌여부(dino, cactus){
    var x축차이 = cactus.x - (dino.x + dino.width);
    var y축차이 = cactus.y - (dino.y + dino.height);

    if(x축차이 < 0 && y축차이 < 0){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animationStatus);
    }
}