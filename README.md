# VS Code 설정 Tip
## scss 할 때 상황에 맞게 컴파일러를 하기 위한 Tip
> 왼쪽 톱니바퀴 아이콘 이미지 클릭 또는 파일 > 기본설정 > 설정 (ctrl + ,)
> 설정 > 명령팔레트 또는 보기 > 명령팔레트 ( ctrl + shift + p), ctrl+p 눌러도 됨
>  - ctrl + p 로 할 경우, 명령팔레트 창에서 > 써주면 된다.
>  > 설정 > 명령팔레트 > settings.json 검색 
>  > - 기본 설정 열기 = vs code 기본 설정값 (수정X)
>  > - 설정 열기 = 원하는 설정값으로 변경 가능.  =  설정 > 사용자설정
>  > - 작업 영역 설정 열기 = 해당 프로젝트에만 해당되게 설정값 적용
>  >  > 1. 설정 > 사용자 에서 작업영역 옆 폴더명 선택 후 수정하면 해당 폴더에 .vscode 생성
>  >  > 2. .vscode 폴더 > settings.json 파일 자동 생성
>  >  > 3. 수정한 속성 값을 확인 할 수 있다.

# Tip
1. 질문. 벤더프리픽스를 해줘야 할 때 스크립트로 적용하면 어떻게 작업을 해줘야 하나요?
   - 바닐라 스크립트로 적용할 땐 아래 3개 방식으로 처리해줘야 한다.
   - elem.style.transform
   - elem.style.webkitTransform
   - elem.style.mozTransform
   - 위 3개 방식 외엔 자동으로 해주는 autoprefixer 같은 라이브러리 사용

2. 키보드 - key 별로 코드 번호 확인하는 법
   - http://keycode.info/ 사이트에서 확인이 가능
   - e.keyCode 로도 확인 가능 (강의 22,23 참고)

3. 자바스크립트 Babel(바벨) 튜토리얼 
   - 1분코딩 Youtube 영상 : https://youtu.be/VeK3a29x1hE
   - 바벨 쓰는 이유 = 최신 버전 자바스크립트(ECMA 2015 이후/ES6)로 개발하고 
   예전 방식의 자바스크립트 방식으로 배포하기 위해서 (구버전 웹브라우저 대응하기 위해 사용)

# 인터랙티브 웹 개발 제대로 시작하기

0. URL : https://eunhye8767.github.io/pj_eh/

1. [01_css_animaion] CSS 변환과 애니메이션
   - Transform : /01_css_animation/transform.html
   - Transition : /01_css_animation/transition.html
   - Animation 1 : /01_css_animation/animation1.html
   - Animation 2 : /01_css_animation/animation2.html
   - Animation 3 : /01_css_animation/animation3.html


2. [02_css_3D] CSS 3D
   - CSS 3D 1 : /02_css_3D/css-3d-1.html
   - CSS 3D 2 : /02_css_3D/css-3d-2.html
   - CSS 3D 3 : /02_css_3D/css-3d-3.html
   - CSS 3D 3I(ie버전) : /02_css_3D/css-3d-3-iever.html


3. [03_css_flex] CSS FLEX
   - CSS FLEX : /03_css_flex/css-flex.html


4. [04_js_start] 인터랙티브 웹 개발을 위한 자바스크립트 시작하기
   - 자바스크립트 워밍업 : /04_js_start/04-1.txt
   - DOM 스크립트 1 : /04_js_start/04-2.html
   - DOM 스크립트 2 : /04_js_start/04-3.html
   - DOM 스크립트 3 : /04_js_start/04-4.html

5. [05_js_event] 자바스크립트의 이벤트 다루기
   - 이벤트의 기본 동작 : /05_js_event/05-1.html
   - this와 이벤트 객체 : /05_js_event/05-2.html
   - 움직이는 캐릭터 예제로 클릭이벤트 익히기 : /05_js_event/05-3.html
   - 이벤트의 위임 : /05_js_event/05-4.html
   - 이벤트의 위임 보강 : /05_js_event/05-5.html

6. [06_example] 예제, 3개의 문
   - 3개의 문 : /06_example/index.html
   - index페이지 소스 보강 : /06_example/index2.html
   - index2페이지 소스 보강(선생님 답변) : /06_example/index2-2.html

7. [07_object] 객체(Object)
   - 객체 1 : /07_object/07-1.html
   - 객체 2 : /07_object/07-2.html
   - 객체 3 : /07_object/07-3.html
   - 객체 4 : /07_object/07-4.html
   - 생성자 함수로 DOM 만들기 : /07_object/07-4-card.html

8. [08_scroll] 스크롤 다루기
   - 스크롤 이벤트 다루기 : /08_scroll/08-1.html
   - 스크롤 위치에 따른 오브젝트 조작하기 : /08_scroll/08-2.html
   - 스크롤 위치에 따른 사용 Tip : /08_scroll/tip.html

9. [09_animation] Transition/Animation 이벤트
   - Transition 이벤트 : /09_animation/09-1.html
   - Transition 이벤트(테스트) : /09_animation/09-1-test.html
   - Animation 이벤트 :  /09_animation/09-2.html

10. [10_timing] 타이밍 제어하기
   - setTimeout  : /10_timing/10-1.html
   - setInterval : /10_timing/10-2.html
   - requestAnimationFrame : /10_timing/10-3.html
   - requestAnimationFrame(시간 설정) : /10_timing/10-3-2.html

11. [11_ex_3Dscroll] 종합예제) 전진! 3D 스크롤
   - /11_ex_3Dscroll/11-1.html

12. [12_bbc_clone] BBC 인터랙티브 페이지 클론 코딩
   - /12_bbc_clone/index.html

13. [13_3d_leaflet] 3D 리플릿 만들기
   - 선행학습 1. ES6 템플릿 문자열 : /13_3d_leaflet/learning/template-string-1.html
   -     └ 바뀐 문자열 방식의 장점 : /13_3d_leaflet/learning/template-string-2.html
   - 선행학습 2. requestAnimationFrame : /13_3d_leaflet/learning/request-ani.html
   -   └ 로켓 이미지 움직이게 : /13_3d_leaflet/learning/request-ani-rocket.html
   
   - 3D 리플릿 만들기 : /13_3d_leaflet/3d_leaflet.html1. SASS(CSS Preprocessor)