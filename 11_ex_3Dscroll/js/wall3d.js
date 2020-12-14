(function(){

    // 스크롤 내릴 때 컨텐츠 영역이 zoom In, 올렸을 때 zoom Out
    const stageElem = document.querySelector('.stage');
    const houseElem = document.querySelector('.house');
    const barElem = document.querySelector('.progress-bar');

    // 캐릭터 버튼 체인지
    const selectCharacterElem = document.querySelector('.select-character');

    const mousePos = { x: 0, y: 0 };

    // 스크롤 해야하는 높이 = 현재 문서의 높이 - 현재 브라우저 창의 높이
    // 처음 로딩 후 창크기가 변경될 경우 값이 적용되지 않는다. window.innerHeight(고정값)
    /*
       let maxScrollValue = document.body.offsetHeight - window.innerHeight;
       이렇게 쓸 경우 resizeHandler() 함수와 동일한 값을 적용하게 된다.
       ★ 코드를 작성할 땐, 공통되는 값이 있다면 묶어주는 습관을 가져야 한다!! ★
       따라서, let maxScrollValue 이렇게만 선언을 해준다.
       그리고 나서 resizeHandler(); 함수가 실행되게 해준다.
       ** resizeHandler(); 써주면 처음 문서가 로드되면 실행이 된다.
    */ 
    let maxScrollValue;

    // 창크기에 따라 변화되는 window.innerHeight 을 함수로 만들어 값이 변화되게 만들어준다.
    function resizeHandler() {
        maxScrollValue = document.body.offsetHeight - window.innerHeight;
    }

    window.addEventListener('scroll', function(){
        
        // pageYOffset - 페이지 전체 세로페이지에서 스크롤 위치 확인.
        // console.log(pageYOffset);
        // console.log(maxScrollValue);

        // 전체 페이지에서 스크롤을 얼마나 했는 지 비율(%)을 알 수 있다.
        // console.log(pageYOffset / maxScrollValue);

        /*
            // 1000을 곱하기 전엔 0~1 이었는데 1000을 곱하면서 1~1000
            // translateZ(-490vw) 디폴트값 490vw 값을 빼준다. (.house css 확인)
            // 스크롤을 최하단으로 내렸을 때 화면을 꽉 차게 하고 싶지 않을 땐, 1000보단 조금 작은 숫자를 적용해준다.
            const zMove = pageYOffset / maxScrollValue * 980 - 490;
         */ 
        const scrollPer = pageYOffset / maxScrollValue;
        const zMove = scrollPer * 980 - 490;
        houseElem.style.transform = 'translateZ('+ zMove +'vw)';

        /*
            progress bar
            전체페이지에서 스크롤을 얼마나 했는 지에 대한 비율 계산 후 
            100 곱해서 % 값을 적용한다.
         */ 
        barElem.style.width = scrollPer* 100 + '%';

    });

    // 마우스 움직일 때마다 화면이 움직이게 하는 '마우스무브 이벤트'
    window.addEventListener('mousemove', function(e) {
        /*
            함수가 실행되면 발생되는 이벤트 객체를 확인할떄
            매개변수 첫번째 자리에 값을 넣주고 
            콘솔에서 .clientX, .clientY 값을 확인할 수 있다.
            .clientX, .clientY = 마우스 현재 위치의 x, y 값 (픽셀값)

            마우스 위치에 따라 화면에 각도를 바꿔주려고 할땐
            .clientX 와 .clientY 값을 어떠한 수식을 통해 바꿔줘야한다.
            ( 브라우저 화면에서 마우스가 가운데에 있을 때에는 0도, 왼쪽 오른쪽으로 갔을 때에는 -00도 혹은 00도로 적용될 수 있게 )
            전역변수 const mousePos = { x:0, y:0} 객체를 만들어준다.
         */
        // console.log(e.clientX, e.clientY);

        /*
            마우스 위치가 
            왼쪽에 가면 -1에 가깝고 오른쪽에 가면 +1,
            위쪽에 가면 +1에 가깝고 아래쪽에 가면 -1.

            왼쪽 (-1) 오른쪽(+1)
            위쪽 (+1) 아래쪽(-1)

            브라우저 창 가로 - window.innerWidth 
            브라우저 창 세로 - window.innerHeight

            ★ 자주 쓰이는 수식. 이 값을 통해 다양한 이벤트 적용이 가능 ★
            mousePos.x = -1 + ( e.clientX / window.innerWidth ) * 2;
            mousePos.y = 1 - ( e.clientY / window.innerHeight ) * 2;
         */ 
        mousePos.x = -1 + ( e.clientX / window.innerWidth ) * 2;
        mousePos.y = 1 - ( e.clientY / window.innerHeight ) * 2;
        // console.log(mousePos);

        /*
            컨텐츠 화면과 캐릭터 2 영역에게 마우스 움직일 때
            화면 각도 변화를 줘야하므로 .stage 에 적용.
            const stageElem = document.querySelector('.stage'); 생성

            rotateX 경우, x축을 기준으로 값을 적용해야 하기 때문에 mousePos.y 값을 주고
            rotateY 경우, y축을 기준으로 값을 적용해야 하기 때문에 mousePos.x 값을 준다.
         */ 

        /*
            stageElem.style.transform = 'rotateX(' + mousePos.y + 'deg) rotateY(' + mousePos.x +'deg)';
            이렇게 쓰면 1을 기준으로 값이 적용되기 때문에
            회전 각도율을 크게 하고 싶을 경우 특정값을 곱해주어 회전 각도율을 조정
         */ 
        stageElem.style.transform = 'rotateX(' + (mousePos.y * 5) + 'deg) rotateY(' + (mousePos.x * 5) +'deg)';
    });

    // 창크기에 따른 결과값을 대응해줄 때 
    // (모바일 세로모드 > 가로모드 변환, 브라우저 창크기 변환)
    window.addEventListener('resize', resizeHandler);

    // .stage 클릭 시 캐릭터 이벤트 생성
    stageElem.addEventListener('click', function(e){
        /*
            style.css 
            character 디폴트 값에 따라서
            클릭했을 떄마다 left 값 기준으로 생성이 된다.
            이 부분을 마우스로 클릭했을 때의 x 값으로 지정하게 수정해야 함!

            left = 마우스 클릭한 위치 값 (e.clientX) / 브라우저 가로폭(window.innerWidth) * 100(% 비율로 나타나려면)
            e.clientX / window.innerWidth * 100
         */ 
        // console.log(e.clientX / window.innerWidth * 100);
        new Character({
            /*
                객체로 적용을 해준다.
                객체 - xPos(속성) : e.clientX / window.innerWidth * 100(값)
               
                >> 객체 속성으로 넣는 이유는 
                이 외에도 다른 속성을 추가하기 위해서 (다른 기능 적용을 위해)
                
                >> 객체에 속성값을 적용한 후에 Character 생성자 함수 매개변수 첫번째 자리에 입력
                   예로 info 라고 적용 후
                   생성자 함수에서 consol.log(info.xPos) 적용하면 xPos 값을 확인할 수 있다.
            */ 
            /*
                speed: Math.random() * 0.5 + 0.2
                >> 생성된 캐릭터의 속도를 랜덤으로 지정
                   Character.js 파일에서
                   this.speed = info.speed; 수정을 해준다.
                
                >> random을 쓸 땐 앞에 Math 를 써준다.
                   Math.random() 으로 써주면 된다. 1에 가까울 수록 빨라진다.
                   speed: Math.random() * 0.5 + 0.2 를 해주면
                   최소값을 .2초 이상으로 조정해줄 수 있고
                   곱하거나 더해주면서 랜덤을 조절해줄 수 있다!!
             */    
            xPos : e.clientX / window.innerWidth * 100,
            speed: Math.random() * 0.5 + 0.2
        });
    });

    // 캐릭터 클릭 시 캐릭터 변경하기
    selectCharacterElem.addEventListener('click', function(e) {
        // e.target을 통해 data- 속성값 알아내기
        // console.log(e.target.getAttribute('data-char'))
        const value = e.target.getAttribute('data-char');
        // body에 data- 속성을 적용해준다.
        document.body.setAttribute('data-char', value);
    });

    resizeHandler();

    // 문서 로드 시 캐릭터 생성이 아니기 떄문에 주석 new Character();
    
})();