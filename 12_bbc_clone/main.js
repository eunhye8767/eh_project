// (function(){
(() => {

    // birdFlies 메서드로 등록
    const actions = {
        birdFlies(key) {
            if (key) {
                // 값이 있으면 
                // 메서드를 불러올 때 actions[action](true); true 값을 주었기 때문에 key = true
                document.querySelector('[data-index="2"] .bird').style.transform = `translateX(${window.innerWidth}px)`;
            } else {
                // 값이 없으면
                // 메서드를 불러올 때 actions[action](false); false 값을 주었기 때문에 key = false
                document.querySelector('[data-index="2"] .bird').style.transform = `translateX(-100px)`;
            }
        },
        birdFlies2(key) {
            if (key) {
                // 위쪽으로 날라가게 
                document.querySelector('[data-index="5"] .bird').style.transform = `translate(${window.innerWidth}px, ${-window.innerHeight * 0.7}px)`;
            } else {
                document.querySelector('[data-index="5"] .bird').style.transform = `translateX(-100px)`;
            }
        }
    }

    const stepElems = document.querySelectorAll('.step');
    const graphicElems = document.querySelectorAll('.graphic-item');
    
    // 현재 활성화된(visible 클래스가 붙은) .graphic-item을 지정
    // 처음 브라우저 접속 시 첫번째 이미지가 보이게 설정
    let currentItem = graphicElems[0];
    let ioIndex;

    const io = new IntersectionObserver( (entries, observer) => {
        // console.log(entries[0].target.dataset.index);
        // 이제, observe 관찰이 되도록 등록을 해줘야 함. io.observe(stepElems[i])

        // 현재 브라우저에서 보여지는 인덱스 번호 체크
        ioIndex = entries[0].target.dataset.index * 1;
        // ioIndex를 콘솔로 확인해보면 문자열로 나오는 것을 확인할 수 있다.
        // 그래서 ioIndex를 숫자로 변환해준다. *1 해주면 숫자로 변환됨
        // console.log(ioIndex);
    });

    for ( let i = 0; i < stepElems.length; i++ ) {

        // stepElems (.step) 이 전부 관촬 대상이 된다.
        io.observe(stepElems[i]);

        // stepElems[i].setAttribute('data-index', i)
        stepElems[i].dataset.index = i;
        graphicElems[i].dataset.index = i;
    }

    // 활성화 - currentItem 
    function activate(action) {
        currentItem.classList.add('visible');
        if (action) {
            // actions 메서드를 실행한다.
            // 활성화에만 적용하면 1번 실행, 실행된 마지막 지점에 적용되어 있다.
            // 반복 실행을 위해 inactivate 에 초기화 값을 적용해준다.
            // true 가 들어오면 1번이 실행 false 가 들어오면 2번이 실행되게
            // 메서드에 true, false 자리를 만든다.
            actions[action](true);
        }
    }

    // 비활성화 - currentItem 
    function inactivate(action) {
        currentItem.classList.remove('visible');  
        if (action) {
            actions[action](false);
        }
    }

    window.addEventListener('scroll', () => {
        let step;
        let boundingRect;

        // for ( let i = 0; i < stepElems.length; i++ ) {
        // ioIndex - 1   => 현재 index의 바로 이전
        // ioIndex + 2   => 이전, 현재, 다음 
        for ( let i = ioIndex - 1; i < ioIndex + 2; i++ ) {
            step = stepElems[i];
            // 처음 step 값은 0 으로 에러 발생. 그래서 값이 없을 경우 for문 작동X
            if ( !step ) continue;
            boundingRect = step.getBoundingClientRect();

            if ( boundingRect.top > window.innerHeight * 0.1 &&
                 boundingRect.top < window.innerHeight * 0.8 ) {
                    
                    // 반복 작업을 위해 인수값 적용
                    inactivate(currentItem.dataset.action);
                    currentItem = graphicElems[step.dataset.index];
                    
                    // 현재 활성화된 currentItem 의 data-action 값을 가져와야 해서 아래처럼 써준다.;
                    activate(currentItem.dataset.action);
            }
        }
    });

    // 새로고침하면 상단 위로 이동되게
    window.addEventListener('load', () => {

        setTimeout( () =>  scrollTo(0, 0), 100 );
        // scrollTo(x좌표, y좌표);
        // scrollTo 는 타이밍상 조금 늦처줘야 잘 작동된다. 그래서 setTimeout 사용
        // scrollTo(0, 0);
    });

    activate();

})();