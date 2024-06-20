
// 이미지 지정 전역변수 선언
var $images = null;
$(document).ready(function(){
    init();
    init_event();
});
function init(){
    // 배열로 이미지들을 받고 있다.
    $images = $("#container1 img");
}
function init_event(){
    $("#btnStart").click(function(){
        showImage();
    });
}
function showImage(){
    // 이미지의 개수 구하기
    var length = $images.length;
    // 이미지 나열하기 (1행당 3개의 이미지임을 가정)
    for(var i = 0; i < length; i++){
        // eq()를 이용하여 인덱스에 맞는 이미지를 저장
        var $img = $images.eq(i);
        // 위치의 x값을 구하기 
        var x = 100 + ((i % 3) * 200);
        // 위치의 y값을 구하기(나누기는 의도한데로 정수로 환산하게 함)
        var y = 100 + (parseInt((i / 3)) * 200);
        alert(x + ", " + y);
        // 이미지의 위치를 설정하는 부분
        $img.css({top: y, left: x});
    }
}