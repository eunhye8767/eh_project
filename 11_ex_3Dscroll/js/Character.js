// 캐릭터 생성자 함수 만들기
/*
   wall3d.js 파일에 생성자 함수를 호출할 때
   생성자 이름 앞에 new 붙여서 호출해줘야 한다. (= 인스턴스)
   >> new Character();
 */ 
function Character(info) {
    /*
        1. 캐릭터 클래스를 가졌던 제일 바깥에 div 엘리먼트를 생성
           변수로 만드는 것이 아닌
           this.mainElem =
           >> this 로 하는 것은 캐릭터 생성자를 통해서 만들어 낼 
              인스턴스 객체에 this.mainElem을 속성으로 쓰겠다는 것.
           >> 변수가 아닌 하나의 속성으로 만들겠다는 것

           >> body id="page" 일때, id (속성 attribute) / page (프로퍼티(속성 값) property)
              this.mainElem 라는 속성 생성. this.mainElem = div 엘리먼트
     */ 
    this.mainElem = document.createElement('div');
    this.mainElem.classList.add('character');

    /*
        innerHTML 로 이전에 만들었던 캐릭터 소스를 적용해준다.
        '' 빈공란을 해주고
        이전에 만들었던 캐릭터 마크업 그대로 + '' 을 통해 적용해준다.
        >> es6 문법에서는 `` 하는 문법도 있다.
     */ 
    this.mainElem.innerHTML = ''
        + '<div class="character-face-con character-head">'
            + '<div class="character-face character-head-face face-front"></div>'
            + '<div class="character-face character-head-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-torso">'
            + '<div class="character-face character-torso-face face-front"></div>'
            + '<div class="character-face character-torso-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-arm character-arm-right">'
            + '<div class="character-face character-arm-face face-front"></div>'
            + '<div class="character-face character-arm-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-arm character-arm-left">'
            + '<div class="character-face character-arm-face face-front"></div>'
            + '<div class="character-face character-arm-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-leg character-leg-right">'
            + '<div class="character-face character-leg-face face-front"></div>'
            + '<div class="character-face character-leg-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-leg character-leg-left">'
            + '<div class="character-face character-leg-face face-front"></div>'
            + '<div class="character-face character-leg-face face-back"></div>'
        + '</div>';
    
    // .stage 의 자식요소에서 제일 끝에 추가하려면 (.house 와 형제)
    document.querySelector('.stage').appendChild(this.mainElem);

    // wall3d.js 파일에서 new Character({ }) 인스턴스 안에 주석 참고.
    //console.log(info.xPos);

    // .character 의 left 값을 마우스 클릭한 위치로 바꿔주는 것
    this.mainElem.style.left = info.xPos + '%';
}