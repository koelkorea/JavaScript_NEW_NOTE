// Q1. paramter에 제한은 없고, 입력된 parameter들을 이용해서, 그대로 array를 만들어주는 함수를 만들고 싶으니 이를 완성하라
//     (= 100개 집어넣으면 Array안에 숫자 100개가 들어가야 함) 
//         -> 단! new 키워드 사용하면 안됨
//             -> (힌트) rest parameter와 spread 연산자를 전부 이용하면 쉬움

function 어레이(...배열요소들){
  return [...배열요소들];
}

var newArray = 어레이(1,2,3,4,5);
console.log(newArray); 


// Q2. 문자열에도 적용할 수 있는 알파벳순으로 문자열을 정렬해주고 리턴해주는 정렬이라는 함수를 제작해라
//  -> [배열]의 sort()메서드를 사용해라

//  (출력예시) 
//    - 정렬('bear') -> a b e r

function 정렬(알파벳들){

  let 정렬배열 = [...알파벳들];

  정렬배열.sort()

  let 결과물 = '';

  for(let i = 0; i < 정렬배열.length; i++){
    결과물 += 정렬배열[i] + ' ';
  }

  return console.log(결과물);
}

정렬('bear'); 


// Q3. 알파벳으로 구성된 '문자열'들을 받으면 그 알파벳들의 출현 갯수를 알어주는 함수 글자세기()를 작성하고 실행해라

//  (출력예시) 
//    - 글자세기('aacbbb') -> { a : 2, b : 3, c : 1 }

function 글자세기(알파벳들){

  let 정렬배열 = [...알파벳들];

  정렬배열.sort()

  console.log(정렬배열);

  let 결과물 = {};
  let 현재검색 = '';

  let 문자배열 = [];
  let 숫자배열 = [];

  let 중복해제글자수 = 0;
  let 현재문자갯수 = 0;

  정렬배열.forEach( (글자, 인덱스, 배열자체) =>{

    // console.log(글자, 인덱스);
    // console.log(현재검색, 갯수);

    if(인덱스 == 0 || 현재검색 != 글자){


      if(현재검색 != 글자){


        console.log(결과물);
      }

    }else if(현재검색 == 글자){


      if(인덱스 == 배열자체.length - 1){


      }
    }

  });

  return console.log(결과물);
}

글자세기('hdawsxaaaddx'); 

