( () => {
	const leaflet = document.querySelector('.leaflet');

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

	})
})();