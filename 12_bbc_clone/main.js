// (function(){
(() => {

    const stepElems = document.querySelectorAll('.step');
    const graphicElems = document.querySelectorAll('.graphic-item');
    
    // 현재 활성화된(visible 클래스가 붙은) .graphic-item을 지정
    let currentItem;

    for ( let i = 0; i < stepElems.length; i++ ) {
        // stepElems[i].setAttribute('data-index', i)
        stepElems[i].dataset.index = i;
        graphicElems[i].dataset.index = i;
    }

    window.addEventListener('scroll', () => {
        let step;
        let boundingRect;

        for ( let i = 0; i < stepElems.length; i++ ) {
            step = stepElems[i];
            // getBoundingClientRect
            // y = top, x = left (익스플로러에서는 x, y값 지원 X) 위치 확인
            boundingRect = step.getBoundingClientRect();
            // console.log(boundingRect);

            // 현재 브라우저 창 높이에서 10~80% 사이에 왔을 때 실행
            if ( boundingRect.top > window.innerHeight * 0.1 &&
                 boundingRect.top < window.innerHeight * 0.8 ) {
                    // 특정 영역에 위치한 index 번호 확인 console.log(step.dataset.index);
                    // graphicElems[step.dataset.index].classList.add('visible');

                    if ( currentItem ) {
                        currentItem.classList.remove('visible');    
                    }
                    currentItem = graphicElems[step.dataset.index];
                    currentItem.classList.add('visible');
            }
        }
    });

})();