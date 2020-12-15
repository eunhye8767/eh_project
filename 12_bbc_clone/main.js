// (function(){
(() => {

    const stepElems = document.querySelectorAll('.step');
    const graphicElems = document.querySelectorAll('.graphic-item');
    
    // 현재 활성화된(visible 클래스가 붙은) .graphic-item을 지정
    // 처음 브라우저 접속 시 첫번째 이미지가 보이게 설정
    let currentItem = graphicElems[0];

    for ( let i = 0; i < stepElems.length; i++ ) {
        // stepElems[i].setAttribute('data-index', i)
        stepElems[i].dataset.index = i;
        graphicElems[i].dataset.index = i;
    }

    // 활성화 - currentItem 
    function activate() {
        currentItem.classList.add('visible');
    }

    // 비활성화 - currentItem 
    function inactivate() {
        currentItem.classList.remove('visible');  
    }

    window.addEventListener('scroll', () => {
        let step;
        let boundingRect;

        for ( let i = 0; i < stepElems.length; i++ ) {
            step = stepElems[i];
            boundingRect = step.getBoundingClientRect();

            if ( boundingRect.top > window.innerHeight * 0.1 &&
                 boundingRect.top < window.innerHeight * 0.8 ) {
                    inactivate();
                    currentItem = graphicElems[step.dataset.index];
                    activate();
            }
        }
    });

    activate();

})();