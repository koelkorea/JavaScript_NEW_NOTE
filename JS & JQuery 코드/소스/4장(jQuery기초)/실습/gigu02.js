$(document).ready(function(){
    // 지구이미지 웹요소(노드) 찾아서 저장($gigu 는 해당 jQuery의 함수값을 저장한다는 의미)
    var $gigu = $("#gigu");
    // 버튼에 이벤트 등록(5초동안 left로 480px로 이동하게 설정)
    //  ->  마치 움직이는 애니메이션 형태가 됨 (버튼을 클릭시 콜백함수가 실행)
    $("#btnStart").click(function(){
        $gigu.animate({
            left: "480px"
        }, 5000)
    })
});