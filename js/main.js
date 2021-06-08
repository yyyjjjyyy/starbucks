//검색
// 검색창 요소(.search) 찾기.
const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');


// 검색창 요소를 클릭하면 실행.
searchEl.addEventListener('click', function(){
    searchInputEl.focus();
});

// 검색창 요소 내부 실제 input 요소에 포커스되면 실행.
searchInputEl.addEventListener('focus',function(){
    searchEl.classList.add('focused'); //focused 클래스 추가
    searchInputEl.setAttribute('placeholder','통합검색'); //html속성 지정('이름','값')
});

// 검색창 요소 내부 실제 input 요소에서 포커스가 해제(블러)되면 실행.
searchInputEl.addEventListener('blur',function(){
    searchEl.classList.remove('focused'); //focused 클래스 삭제
    searchInputEl.setAttribute('placeholder',''); //html속성 지정('이름','값')
});




// 스크롤값에 따라 뱃지 사라지게 하기 + 탑버튼

const badgeEl = document.querySelector('header .badges'); //header .badges 찾기
const toTopEl = document.querySelector('#to-top');

// window.addEventListener('scroll',function(){   //스크롤 라이브러리로 대체
//     console.log('scroll!');
 //윈도우 객체:브라우저 창(화면자체)이라 이해하기.
 //addEventListener 매소드 추가로 scroll이벤트 적용, 익명함수 핸들러 추가(스크롤할 때 실행될 함수 내용)

 //스크롤 함수 실행시 프로젝트가 무거워져 버벅일 염려있음 -> 스크롤 제어 자바스크립트 라이브러리 사용하면 완화시켜줌!(lodash.js)
//throttle(lodash에서 제공하는 특정기능 사용)
//_.throttle(함수, 시간)
    

window.addEventListener('scroll',_.throttle(function(){
    console.log(window.scrollY);
    if (window.scrollY > 500) {     
       // badgeEl.style.display="none"   //배지 숨기기

       //gsap.to(요소(badgeEl), 지속시간(0.6초), 옵션(opacity));
       gsap.to(badgeEl, 0.6, { 
           opacity:0,
           display: 'none' //opacity와 display 둘다 써야 요소가 남아있지않음
       });

       //탑버튼 보이기
       //gsap.to('#to-top', 2,{
        gsap.to(toTopEl, 2,{
        x:0
       });

    }else{
        //badgeEl.style.display="block"   //배지 보이기 
        gsap.to(badgeEl, 0.6, { 
            opacity:1,
            display: 'block'
        });

        //탑버튼 숨기기
        //gsap.to('#to-top', .2,{
        gsap.to(toTopEl, .2,{
            x: 100 //오른쪽으로 100px 이동
        });
    }  
},300)); //300 =0.3초


toTopEl.addEventListener('click', function () {
    // 페이지 위치를 최상단으로 부드럽게(0.7초 동안) 이동.
    gsap.to(window, .7, {
        scrollTo: 0
      })
    });
    



//visual 영역 fadein

const fadeEls = document.querySelectorAll('.visual .fade-in'); //변수선언

// 나타날 요소들을 하나씩 반복해서 처리!
fadeEls.forEach(function(fadeEl, index) {  // 각각 fadein 요소 개수만큼 forEach메소드 인수 함수 실행.
    gsap.to(fadeEl,1,{         
        // gsap.to(요소,지속시간,{속성})
        delay: (index + 1) * .7,  
        //0.7 , 1.4, 2.1, 2.7초에 등장 
        //(index에 1더해주지 않으면 0*0.7=0이기 때문에 등장안함. 
        //따라서 index에 1을 더해준 상태에서 .7초 곱함)
        opacity:1
    });

});


//스와이퍼 수직 슬라이드 new Swiper(선택자, 옵션)
new Swiper('.notice-line .swiper-container',{
    direction:'vertical', //옵션1 방향
    autoplay: true, //옵션2 자동슬라이드
    loop:true //옵션3. 반복재생여부
});


//스와이퍼 프로모션
new Swiper('.promotion .swiper-container', {
    autoplay:{
        delay: 5000 //0.5초
       },
    loop:true,
    slidesPerView:3, //한번에 보여줄 슬라이드 개수
    spaceBetween:10, //슬라이드 사이 여백
    centeredSlides: true, // 1번 슬라이드가 "가운데" 보이기
    pagination: {  //스와이퍼 프로모션 페이지 표시
          el: '.promotion .swiper-pagination', //페이지 번호 요소 선택자
          clickable:true // 사용자의 페이지 번호 요소 제어 가능 여부
        }, 
        navigation:{
            prevEl:'.promotion .swiper-prev',
            nextEl:'.promotion .swiper-next'
        }
});


//awards 슬라이드(푸터상단 위치)
new Swiper('.awards .swiper-container', {
    autoplay: true,
    loop:true,
    spaceBetween:30, //슬라이드 간격
    slidesPerView: 5,//한 화면에 몇개 슬라이드 보일 것인지
    navigation:{
        prevEl:'.awards .swiper-prev',
        nextEl:'.awards .swiper-next'
    }
});


//토글 프로모션
const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');

let isHidePromotion = false; //프로모션 영역이 현재 보여지기때문에 flase

promotionToggleBtn.addEventListener('click',function(){//promotionToggleBtn클릭하면 함수 실행
    isHidePromotion = !isHidePromotion // ! : !뒤 변수 내용(isHidePromotion)을 반대 값으로 반환. true - flase
    if(isHidePromotion){
        //isHidePromotion 가 true면 숨기기
        promotionEl.classList.add('hide'); //  promotionEl에  hide 요소 추가(css)


    } else{
         //isHidePromotion 가 flase면 보이게
         promotionEl.classList.remove('hide'); //  promotionEl에  hide 요소 지우기
    }
});



//유튜브영역 애니메이션

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
    // `.toFixed()`를 통해 반환된 문자 데이터를,
    // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
    return parseFloat((Math.random() * (max - min) + min).toFixed(2))
  }

function floatingObject(selector,delay,size){
     //  gsap.to(요소, 시간, 속성(옵션))
    gsap.to(
        selector,
        random(1.5, 2.5),
        {
            y:size,
            repeat:-1, //무한반복
            yoyo:true,    
            ease: Power1.easeInOut,
            delay: random(0,delay)//1초 후 애니메이션 시작
        }
    ); 
}

floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);
//(selector,delay,size)




//scroll magic
// <script src="https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.8/ScrollMagic.min.js" integrity="sha512-8E3KZoPoZCD+1dgfqhPbejQBnQfBXe8FuwL4z/c8sTrgeDMFEnoyTlH3obB4/fV+6Sg0a0XF+L/6xS4Xx1fUEg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function(spyEl){
    new ScrollMagic
        .Scene({
            triggerElement: spyEl, //보여짐 여부를 감시할 요소를 지정
            triggerHook:.8 //뷰포트 0.8지점에 걸리면 동작(setClassToggle 매소드 실행)
        })
        .setClassToggle(spyEl, 'show')
        .addTo(new ScrollMagic.Controller()); 
    
        // Scene: 스크롤 감시 매서드. 
        //setClassToggle : 클래스를 넣었다 뺐다 제어
});


//푸터 연도

const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear(); //2021






