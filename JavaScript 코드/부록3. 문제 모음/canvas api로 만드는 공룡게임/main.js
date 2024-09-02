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

// <canvas>선택자.getContext(contextType, contextAttributes);
//   : HTML5 Canvas API에서 사용되는 메서드로 지정 <canvas> 태그 영역에서 그래픽을 그리기 위해 특정 유형의 렌더링 '맥락'를 가져오고 반환 역할
//      -> 만약 해당 유형의 '랜더링 맥락'를 지원하지 않으면 null을 반환하고, 있으면  반환된 '랜더링 맥락' 객체를 사용하여 그래픽을 그리거나 조작
//         (= 이를 시작으로 메서드 체이닝을 통해 실질적인 스케치를 시작함)

//         ex) fillStyle, fillRect(x위치, y위치, 너비, 높이), drawImage(x위치, y위치, 너비, 높이) 등등이 파생

//    # <canvas>선택자.getContext(contextType, contextAttributes)의 paramter변수 역할 설명
//       1. contextType 
//           : 가져오고자 하는 랜더링 맥락 유형을 문자열로 지정하면 이를 받는 변수
//              - 2d             : 2D 그래픽을 그릴 수 있는 2D 컨텍스트
//              - webgl          : 3D 그래픽을 그릴 수 있는 WebGL 컨텍스트
//              - bitmaprenderer : 비트맵 렌더링 컨텍스트 (일부 환경에서만 사용 가능)

//       2. contextAttributes (선택사항)
//           : 컨텍스트를 생성할 때 사용할 추가 옵션을 지정

//             ex) alpha, antialias 등의 속성을 설정할 수 있음
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
        //       : 해당 <canvas> 태그 영역에 그려질 모형의 색
        ctx.fillStyle = 'green';

        //   2. <canvas>선택자.getContext('2d').fillRect(x좌표, y좌표, 너비, 높이)
        //       : 해당 <canvas> 태그 영역에 그려질 4각형 모형의 좌표(x,y)와 너비 * 높이
        //          -> 보통 해당되는 부분이 <canvas> 내 다른 도형과 상호작용을 하게되 어있음
        ctx.fillRect(this.x, this.y, this.width, this.height);

        //   3. <canvas>선택자.getContext('2d').drawImage(이미지객체, x좌표, y좌표, 너비, 높이)
        //       : 해당 <canvas> 태그 영역에 그려질 이미지객체의 좌표(x,y)와 너비 * 높이
        //          -> 이쪽은 보통 게임에 등장하는 {객체}의 스킨에 해당됨
        ctx.drawImage(dinosaurImg, this.x, this.y, this.width, this.height);

        //   4. <canvas>선택자.getContext('2d').beginPath();
        //       : 해당 <canvas> 태그 영역에 이전에 정의된 경로와 별개로 새로운 경로를 정의할 수 있게 해주는 함수
        //         (= 그림판에서 사용자 임의로 도형 그리는 그거 맞음)
        
        //   5. <canvas>선택자.getContext('2d').moveTo(x좌표, y좌표)
        //       : 이전 경로에서 얼마나 더 떨어질지 지정하는 함수
        //         (= 경로를 그리지 않고, 펜을 새로운 위치로 옮기는 역할.. 시작지점을 다시 설정하는데 유용)

        //   6. <canvas>선택자.getContext('2d').lineTo(x좌표, y좌표)
        //       : 현재 좌표를 기준으로 어떤 방향으로 직선을 그을지 지정하는 함수
        //          -> 여러 번 호출하여 직선으로 이루어진 다각형을 그릴 수 있음
        //              -> BUT! 사용자에게 보여질거면 stroke()까지 호출을 해야함

        //   7. <canvas>선택자.getContext('2d').closePath();
        //       : 현재 경로의 마지막 지점을 시작(beginPath()로 인해 설정된) 지점과 연결하는 함수
        //          -> (중요) 마지막 점을 첫 번째 점과 연결하여 도형의 윤곽선을 완전히 연결하는 것을 의미 + closePath()를 호출한 후에도 다른 경로를 이어서 그릴 수 있음

        //   8. <canvas>선택자.getContext('2d').stroke()
        //       : moveTo와 lineTo로 정의된 현재 경로를 따라 윤곽선을 그리는 함수
        //          -> (중요) 이 녀석이 호출되기 전까지는 경로가 실제로 그려지지 않으며, 화면에 나타나지 않음

        //   9. <canvas>선택자.getContext('2d').fill()
        //       : 현재 정의된 경로 내부를 fillStyle 속성을 찾은 뒤 그걸로 채우는 함수
        //          -> 경로가 닫혀 있지 않다면 자동으로 닫히고, 채워지게 함

        //         ex) 다각형 그리기

        //             const canvas = document.getElementById('myCanvas');
        //             const ctx = canvas.getContext('2d');

        //             ctx.beginPath();       // 새로운 경로 시작
        //             ctx.moveTo(50, 50);
        //             ctx.lineTo(200, 50);
        //             ctx.lineTo(200, 200);
        //             ctx.lineTo(50, 200);
        //             ctx.closePath();
        //             ctx.fillStyle = 'red'; // 채울 색상을 빨간색으로 설정
        //             ctx.fill();            // 경로 내부를 빨간색으로 채웁니다.
        //             ctx.stroke();          // 경로를 그립니다.

        //   10. <canvas>선택자.getContext('2d').arc(x좌표, y좌표, 반지름, 시작각도, 끝각도, 시계방향설정 boolean값)
        //        : 해당 <canvas> 태그 영역에 원, 호(arc), 또는 원의 일부를 그릴 때 사용하는 메서드

        //         # requestAnimationFrame(callback) 특징
        //            1) 시작각도, 끝각도의 기준은 라디안(radians) 단위로 표기
        //                -> 0 라디안  : 원의 오른쪽(3시 방향)에서 시작
        //                   1 라디안  : 57.3도
        //                   2π 라디안 : 360도(원 전체)
        //            2) arc 메서드를 사용하면 beginPath와 함께 사용해야, 새로운 도형이 기존 경로와 연결되지 않음
        //            3) 시계방향(anticlockwise) parameter 변수는 호를 그리는 방향을 지정

        //               ex) 반원 그리기
        //                    -> 좌표 (100, 75)을 중심으로 반지름이 50인 반원을 그림

        //                   const canvas = document.getElementById('myCanvas');
        //                   const ctx = canvas.getContext('2d');

        //                   ctx.beginPath();
        //                   ctx.arc(100, 75, 50, 0, Math.PI, false); // 중심 (100, 75), 반지름 50, 0 라디안부터 π 라디안까지 그리기 (시계 방향)
        //                   ctx.stroke();        

        //               ex) 원 그리기
        //                    -> 좌표 (100, 75)을 중심으로 반지름이 50인 원을 그림

        //                   const canvas = document.getElementById('myCanvas');
        //                   const ctx = canvas.getContext('2d');

        //                   ctx.beginPath();
        //                   ctx.arc(100, 75, 50, 0, 2 * Math.PI, false); // 중심 (100, 75), 반지름 50, 0 라디안부터 2π 라디안까지 그리기
        //                   ctx.stroke();       
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
//   -> requestAnimationFrame() 함수를 통해 재귀식으로 동작하도록, 코딩할 예정의 함수
function 프레임진행(){

    // requestAnimationFrame(callback)
    //  : <canvas> 태그 영역의 화면 새로고침 주기에 맞춰 parameter변수에 주어진 callback 함수를 재귀식으로 호출하도록 예약하는 함수
    //     -> 웹 브라우저에서 <canvas> 태그 영역의 애니메이션을 CPU와 GPU 성능을 최적화하여 부드럽게 실행하기 위해 사용
    //        (= 애니메이션의 1초를 이루는 프레임의 개수는 모니터의 주사율을 따라감...)

    //   # requestAnimationFrame(callback) 특징
    //      1. 자율적인 프레임 레이트 조절
    //          : 브라우저가 적절한 타이밍에 애니메이션을 그려서, CPU/GPU의 성능과 사용자 환경에 맞춰 부드럽게 애니메이션을 처리

    //      2. 보호된 애니메이션 루프
    //          : 탭이 비활성화되거나 창이 최소화된 경우 애니메이션이 중단되어 리소스를 절약할 수 있음

    //      3. 현재 실행되는 애니메이션 고유 식별자ID(animationId)를 반환
    //          : 이를 통해 cancelAnimationFrame(animationId) 함수로 해당 애니메이션에 대한 중단 요청을 할 수 있음
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

        // cancelAnimationFrame(animationId)
        //  : parameter변수 위치의 애니메이션 고유 식별자(animationId)를 입력하면, 특정 애니메이션 프레임 요청을 취소할 수 있게하는 함수
        //     -> 애니메이션 고유 식별자 (animationId)는 requestAnimationFrame(callback)을 통해 반환됨
        cancelAnimationFrame(animationStatus);
    }
}