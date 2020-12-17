( () => {
	const leaflet = document.querySelector('.leaflet');
	const pageElems = document.querySelectorAll('.page');

	// 페이지가 2번 클릭되어 열렸을 때 close 버튼이 보이게
	let pageCount = 0;

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
		}
	})
})();