
// 유튜브 영역
var tag = document.createElement('script');
//script란 이름 가진 요소 생성해서 태그란 변수에 할당.

tag.src = "https://www.youtube.com/iframe_api";
//소스 속성에 외부 자바스크립트 라이브러리 할당.
// Youtube IFrame API를 비동기로 로드

var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
//첫번째 스크립트 태그 찾아서 부모 앞에 삽입


function onYouTubePlayerAPIReady() {
    //함수이름 변경하면 안돼!( Youtube IFrame Player API에서 사용하는 이름이기 때문에)
    //     <div id="player"></div>

    new YT.Player('player', {
        videoId: 'An6LvWQuj_8', //최초 재생할 유튜브 영상 id
        playerVars:{ //영상재생위한 변수들 속성
            autoplay:true, //자동재생 유무
            loop:true, //반복재생 유무
            playlist: 'An6LvWQuj_8' //loop:true인 경우 반복재생할 유튜브 영상 id           
        },
        events:{
            onReady:function(event){ //영상준비되면 함수 내용 실행.
                event.target.mute() //음소거
            }
        }
     })
}
