( () => {
	const hand = document.querySelector('.hand');
	const leaflet = document.querySelector('.leaflet');
	const pageElems = document.querySelectorAll('.page');

	// 클릭한 메뉴 아이템을 저장할 변수
	let currentMenu;

	// 페이지가 2번 클릭되어 열렸을 때 close 버튼이 보이게
	let pageCount = 0;


	// 현재 손의 위치
	const handPos = {x: 0, y: 0};
	
	// 마우스 (타겟) 위치
	const targetPos = {x: 0, y: 0};

	let distX;
	let distY;

	// e.target 에 클래스 명이 맞는 지 함수로 만들었을 때
	// 피라미트값에 e.target => elem, 'page' => className
	function getTarget(elem, className) {
		while ( !elem.classList.contains(className) ) {
			elem = elem.parentNode;
			if ( elem.nodeName == 'BODY' ) {
				elem = null;
				return;
			}
		}

		return elem;
	}

	function closeLeafleat() {
		pageCount = 0;
		document.body.classList.remove('leaflet-opened');
		
		// 3번째 카드가 접히고 나서 1번째 카드가 접혀야 한다.
		// pageElems 전체를 잡아서 인덱스로  해당 카드 번호를 선택한다.
		pageElems[2].classList.remove('page-flipped');
		// 1번째 카드는 3번째 카드가 접힌 후 .5초후에 접히기 위헤 setTimeout 이용.
		setTimeout( () => {
			pageElems[0].classList.remove('page-flipped');
		}, 500)
	}

	function zoomIn(elem) {
		// elem = menuItemElem = li.menu-item 을 가르킨다.
		// console.log(elem.getBoundingClientRect());
		// getBoundingClientRect() 이용하여 left, top, width, height 등 값을 확인
		const rect = elem.getBoundingClientRect();
		// console.log(rect.x, rect.y);

		// 현재 브라우저 기준, x좌표값에 width 크기의 1/2을 더한 값을 빼주면 가운데로 정렬
		// x, y 는 몇몇 브라우저에서 지원이 안됨. left, top 으로 이용하도록!
		const dx = window.innerWidth/2 - (rect.x + rect.width/2);
		const dy = window.innerHeight/2 - (rect.y + rect.height/2);

		let angle;

		// data 값을 숫자로 바꾸기 위해 *1
		switch(elem.parentNode.parentNode.parentNode.dataset.page *1) {
			case 1:
				angle = -30;
				break;
			case 2:
				angle = 0;
				break;
			case 3:
				angle = 30;
				break;
		}

		document.body.classList.add('zoom-in');

		// 카드 화면 전체를 움직인다.
		leaflet.style.transform = `translate3d(${dx}px, ${dy}px, 50vw) rotateY(${angle}deg)`;

		currentMenu = elem;
		elem.classList.add('current-menu');
	}

	function zoomOut() {
		leaflet.style.transform = `translate3d(0px, 0px, 0)`;
		if ( currentMenu ) {
			document.body.classList.remove('zoom-in');
			currentMenu.classList.remove('current-menu');
			currentMenu = null;
		}
	}

	function render() {
		// 마우스와 손의 거리를 requestAnimationFrame을 이용해 거리를 좁히려고 한다
		// const handPos = {x: 0, y: 0}; const targetPos = {x: 0, y: 0}; 2개의 객체를 만들어서 이용.
		
		// distX, distY = 마우스와 손의 위치의 거리.
		distX = targetPos.x - handPos.x;
		distY = targetPos.y - handPos.y;

		// 0.1 은 마우스와 손 위치의 거리에서 1/10 만큼 이동하겠다 
		// requestAnimationFrame 함수를 이용해 이 부분을 0이 될 때까지 반복
		// 마우스와 손 위치의 거리가 줄어든 만큼 1/10 씩 움직이기 때문에 가속력이 적용되어 있는 것처럼 보임.
		handPos.x = handPos.x + distX * 0.1;		
		handPos.y = handPos.y + distY * 0.1;		

		// 마우스 쪽에 가깝게 손의 위치를 바꾸기 위해 -, + 를 해줌.
		hand.style.transform = `translate(${handPos.x-60}px, ${handPos.y + 30}px)`;

		requestAnimationFrame(render);
	}

	render();

	// 매개변수가 1개일 때는 () 괄호가 생략이 가능하다.
	leaflet.addEventListener('click', e => {
		let pageElem = getTarget(e.target, 'page');
		
		if ( pageElem ) {
			pageElem.classList.add('page-flipped');
			pageCount++;
			if ( pageCount == 2) {
				document.body.classList.add('leaflet-opened');
			}
		}

		let closeBtnElem = getTarget(e.target, 'close-btn');
		if ( closeBtnElem ) {
			closeLeafleat();	
			zoomOut();
		}

		let menuItemElem = getTarget(e.target, 'menu-item');
		if ( menuItemElem ) {
			zoomIn(menuItemElem);
		}

		let backBtn = getTarget(e.target, 'back-btn');
		if ( backBtn ) {
			zoomOut();
		}
	});

	leaflet.addEventListener('animationend', () => {
		leaflet.style.animation = 'none';
	});

	window.addEventListener('mousemove', e => {
		// console.log(e.clientX, e.clientY);
		// hand.style.transform = `translaste(${e.clientX}px, ${e.clientY}px)`;     마우스 움직임을 따라가는 손의 위치가 매끄럽지 못함

		// targetPos 값을 바꿔준다.
		// main.css 에서 hand 의 디폴트값 설정(left 70%, top 70%)
		// 디폴드값에 적용된 값만큼 마우스 위치에서 빼준다.
		targetPos.x = e.clientX - window.innerWidth * 0.7;
		targetPos.y = e.clientY - window.innerHeight * 0.7;
	});

})();