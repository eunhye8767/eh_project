(function(){

    // 스크롤 내릴 때 컨텐츠 영역이 zoom In, 올렸을 때 zoom Out
    const houseElem = document.querySelector('.house');

    // 현재 문서의 높이 - 현재 브라우저 창의 높이
    let maxScrollValue = document.body.offsetHeight - window.innerHeight;

    window.addEventListener('scroll', function(){
        
        // pageYOffset - 페이지 전체 세로페이지에서 스크롤 위치 확인.
        // console.log(pageYOffset);
        // console.log(maxScrollValue);

        // 전체 페이지에서 스크롤을 얼마나 했는 지 비율(%)을 알 수 있다.
        // console.log(pageYOffset / maxScrollValue);

        // 1000을 곱하기 전엔 0~1 이었는데 1000을 곱하면서 1~1000
        // 디폴값 490vw 값을 빼준다.
        // 스크롤을 최하단으로 내렸을 때 화면을 꽉 차게 하고 싶지 않을 땐, 1000보단 조금 작은 숫자를 적용해준다.
        const zMove = pageYOffset / maxScrollValue * 980 - 490;

        houseElem.style.transform = 'translateZ('+ zMove +'vw)';
    });

})();