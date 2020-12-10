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
    // add로 다수의 클래스를 적용할 땐 ',' 로 구분해서 적용
    // this.mainElem.classList.add('character','running');

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

    /*
       스크롤 멈추면 캐릭터의 팔, 다리 애니멤이션 중지
       .scrollState -  스크롤 중인지 아닌 지를 체크하는 변수
       >> 처음할 땐, this.scrollState 라고 선언해줘도 된다.
          아래 false는 명시하기 위한 용도로 이해하면 됨.
          .scrollState 기본값 = false
     */
    this.scrollState = false;
    
    // 바로 이전(마지막) 스크롤 위치 (초기값 0으로 세팅)
    this.lastScrollTop = 0;

    // 메서드 실행
    this.init();
}

/*
   >> 스크롤 시 캐릭터 자체에 효과를 주는 것이 때문에 캐릭터 생성자 함수에 적용을 한다.
   >> 함수 생성자에서 공통으로 사용하는 속성이나 메서드는 'prototype' 객체로 만들어준다.

      방법1. Character.prototype.xxxxx = function() {
             }

      방법2. Character.prototype = {
                constructor : Character,
                xxxxx = function() {
                }
             }; 

 */ 
Character.prototype = {
    // Character 객체 속성을 재정의 하기 위해 constructor 설정을 해줌. 꼭 해야함! (기존 설정 보존)
    constructor : Character,
    init : function() {
        /*
            init 함수에 있는 this 와
            window.addEventListener 의 this 는 다르기 떄문에
            init 에서 가르키는 this를 사용하기 위해 상수를 만든다.
            init 의 this 는 함수생성자가 만든 Character 를 가르키고
            window.addEventListener 의 this 는 window 를 가르킴.
         */ 
        const self = this;

        window.addEventListener('scroll', function() {
            /*
                >> 스크롤하면 클래스를 붙여줘라
                >> 스크롤을 멈추면 캐릭터 애니메이션을 중지시켜야 해서 아래 코드는 주석
            
                // this.mainElem.classList.add('running');
                // self.mainElem.classList.add('running');
                
            */


            /*
                >> 무조건 self.scrollState 값을 초기화 해준다.
                >> 처음 스크롤 시엔 scrollState 값이 없으므로 if문 실행
                >> 스크롤 시에는 setTimeout이 .5초후에 일어나기 때문에 
                   그 전에 clearTimeout을 실행시킨다.
                   결국 처음 스크롤 시 if문 한 번만 실행하게 된다.

                   if문과 setTimeout 만 써줄경우,
                   running 클래스 추가되는 부분이 스크롤할때마다 계속 붙는
                   비합리적인 방법을 clearTimeout 으로 개선.

                >> 스크롤이 멈출 경우 
                   clearTimeout은 실행이 되지 않기 때문에
                   .5초에 setTimeout이 마지막 턴에서 실행된다.
            */ 
            clearTimeout(self.scrollState);

            if (!self.scrollState) {
                /*
                    self.mainElem.classList.add('running');
                    console.log('running 클래스 붙었음')
                    
                    위 부분이 실행될 떄 콘솔로그로 보면
                    스크롤을 움직일때마다 running 부분이 계속 실행된다. (중복실행)
                    비합리적.. 스크롤할때 1번만 실행되게 개선해야함.
                 */ 
                self.mainElem.classList.add('running');
                console.log('running 클래스 붙었음')
            }

            /*
                >> setTimeout 은 실행이 되면 어떤 값을 리턴해준다.
                   console.log(self.scrollState)
                   숫자가 생성되는 것을 볼 수 있다.
                
                >> self.scrollState - true 값을 false 로 바꿔주고
                   running 클래스를 제거해준다.
                   그러면 스크롤이 멈췄을 때 running 클래스값을 제거해준다.
                   즉, 스크롤이 멈추면 캐릭터 애니메이션이 중지
                
                >> 스크롤 멈췄을 때에는 .5초후에 제대로 작동되는데
                   스크롤 시에는 rungging 클래스가 계속 붙게된다.
                   이 경우 clearTimeout 함수를 같이 사용해야 한다.
             */ 
             
            self.scrollState = setTimeout(function(){
                // false = 스크롤을 멈추게 하고 remove로 클래스 제거
                self.scrollState = false;
                self.mainElem.classList.remove('running');
            }, 500)

            // console.log(self.scrollState);

            // <-- lastScrollTop
            /*
                1. 스크롤을 올리고 내리고 기준을 잡기 위해
                바로 이전에 스크롤 위치값과
                현재 스크롤 위치값 비교를 해야 한다.
                비교를 해서 작으면 'A', 크면 'B' 효과를 주려고 한다.

                2. lastScrollTop 속성을 생성자 함수에서 만들고
                   스크롤 이벤트 마지막 줄에 
                   self.lastScrollTop = pageYOffset; 
                   그러면 마지막 스크롤 위치의 값이 self.lastScrollTop
                
                   console.log 로 비교를 해보면 값이 다른 걸 알 수 있다. 

                   console.log('lastScrollTop: '+self.lastScrollTop);
                   console.log('pageYOffset: '+pageYOffset);

                3. lastScrollTop 이 pageYOffset 보다 작으면 스크롤을 내린 것이고
                   lastScrollTop 이 pageYOffset 보다 크면 스크롤을 올린 것이라고 정의
             */ 
            // console.log('lastScrollTop: '+self.lastScrollTop);
            // console.log('pageYOffset: '+pageYOffset);
            
            // 이전 스크롤 위치와 현재 스크롤 위치를 비교.
            if ( self.lastScrollTop > this.pageYOffset) {
                // 이전 스크롤 위치가 크다면: 스크롤 올림
                self.mainElem.setAttribute('data-direction', 'backward');
            } else {
                // 이전 스크롤 위치가 작면: 스크롤 내림
                self.mainElem.setAttribute('data-direction', 'forward');
            }

            // 마지막 줄에 마지막 스크롤 위치값을 lastScrollTop에 적용해준다.
            self.lastScrollTop = pageYOffset;

            // lastScrollTop -->

        });
    }
};