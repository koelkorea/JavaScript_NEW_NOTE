function showPrice(){
    // 사용자가 입력한 값 2개의 변수에 저장
    var oPrice = document.querySelector("#originalPrice").value;
    var rate = document.querySelector("#rate").value;

    // 2개의 값이 음수가 아니라면.. 실행
    if(oPrice > 0 && rate > 0){
        var savedPrice = oPrice * (rate/100);
        var resultPrice = oPrice - savedPrice;
    }

    document.querySelector("#showResult").innerHTML = "상품의 원래 가격은 " + oPrice + ", 할인율은 " + rate + "%... 현재 " 
                                                        + savedPrice + "원이 절약된 금액인, " + resultPrice + "원에 살수 있다는 결론";
}