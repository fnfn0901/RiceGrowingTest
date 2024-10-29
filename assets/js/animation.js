document.addEventListener('DOMContentLoaded', function() {

    console.log("DOMContentLoaded event triggered");  // 확인 로그
    loadParticipants();  // 페이지가 로드될 때 호출
    
    const playButton = document.querySelector('.play-button');
    const copyLinkButton = document.getElementById('copy-link-btn');
    const copySuccessMessage = document.getElementById('copy-success');
    const participantsText = document.getElementById('participant-count');

    // 참여자 수 불러오기 (S3에서 직접)
    function loadParticipants() {
        console.log("Fetching participants data...");  // 함수 호출 확인
    
        fetch('https://ssalbtis3bucket.s3.ap-northeast-2.amazonaws.com/assets/data/participants.json', {
            mode: 'cors'  // CORS 모드 명시
        })
        .then(response => {
            console.log("Fetch response:", response);  // 응답 확인
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("Data:", data);  // 데이터 확인
            participantsText.textContent = `${data.count}명`;
        })
        .catch(error => {
            console.error('참여자 수 불러오기 실패:', error);
            participantsText.textContent = '불러오기 실패';
        });
    }

    // 참여자 수 업데이트 함수
    function updateParticipants() {
        fetch('http://3.35.52.206/update_participants.php')  // EC2의 PHP 파일 경로
            .then(response => response.json())
            .then(data => {
                participantsText.textContent = `참여자 수 | ${data.count}명`;  // 참여자 수 업데이트
            })
            .catch(error => console.error('참여자 수 업데이트 실패:', error));
    }

    // 페이지 로드 시 참여자 수 불러오기
    loadParticipants();  // 페이지가 로드될 때 호출

    // 시작 버튼 클릭 시 질문 화면으로 이동 및 참여자 수 업데이트
    playButton.addEventListener('click', function() {
        updateParticipants();  // 참여자 수 업데이트 호출
        window.location.href = 'question.html'; // 질문 화면 파일로 이동
    });

    // 카카오톡 공유 버튼 클릭 이벤트
    document.getElementById('kakao-link-btn').addEventListener('click', function() {
        Kakao.Link.sendDefault({
            objectType: 'feed',
            content: {
                title: '쌀 키우기 테스트',
                description: '당신의 쌀 농부 유형은 무엇일까요? 지금 바로 테스트해 보세요!',
                imageUrl: 'https://ssalbtibucket.s3.ap-northeast-2.amazonaws.com/assets/images/BackgroundImage.png',
                link: {
                    mobileWebUrl: 'http://43.202.66.204',  // AWS EC2 URL로 설정
                    webUrl: 'http://43.202.66.204'
                }
            },
            buttons: [
                {
                    title: '테스트하러 가기',
                    link: {
                        mobileWebUrl: 'http://43.202.66.204',
                        webUrl: 'http://43.202.66.204'
                    }
                }
            ]
        });
    });

    // 링크 복사 기능
    copySuccessMessage.style.display = 'none'; // 처음에 메시지를 숨김

    copyLinkButton.addEventListener('click', function() {
        const currentUrl = window.location.href;

        // Clipboard API 지원 여부 확인
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(currentUrl)
                .then(() => {
                    // 복사 성공 시 메시지를 보여줌
                    copySuccessMessage.style.display = 'flex';

                    // 복사 완료 메시지를 일정 시간 표시
                    setTimeout(() => {
                        copySuccessMessage.style.display = 'none';
                    }, 2000);
                })
                .catch(err => {
                    console.error('링크 복사 실패:', err);
                });
        } else {
            const tempInput = document.createElement('input');
            tempInput.value = currentUrl;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);

            copySuccessMessage.style.display = 'flex';
            setTimeout(() => {
                copySuccessMessage.style.display = 'none';
            }, 2000);
        }
    });
});