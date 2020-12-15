// (function(){
(() => {

    // birdFlies 메서드로 등록
    const actions = {
        birdFlies() {
            document.querySelector('[data-index="2"] .bird').style.transform = `translateX(${window.innerWidth}px)`;
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
        if ( action ) {
            // actions 메서드를 실행한다.
            actions[action]();
        }
    }

    // 비활성화 - currentItem 
    function inactivate() {
        currentItem.classList.remove('visible');  
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
                    inactivate();
                    currentItem = graphicElems[step.dataset.index];
                    
                    // 현재 활성화된 currentItem 의 data-action 값을 가져와야 해서 아래처럼 써준다.;
                    activate(currentItem.dataset.action);
            }
        }
    });

    activate();

})();