document.addEventListener('DOMContentLoaded', function() {
    const playButton = document.querySelector('.play-button');
    const copyLinkButton = document.getElementById('copy-link-btn');
    const copySuccessMessage = document.getElementById('copy-success');

    // 시작 버튼 클릭 시 질문 화면으로 이동
    playButton.addEventListener('click', function() {
        window.location.href = 'question.html'; // 질문 화면 파일로 이동
    });
    
    // 카카오톡 공유 버튼 클릭 이벤트
    document.getElementById('kakao-link-btn').addEventListener('click', function() {
        Kakao.Link.sendDefault({
            objectType: 'feed',
            content: {
                title: '쌀 키우기 테스트',
                description: '당신의 쌀 농부 유형은 무엇일까요? 지금 바로 테스트해 보세요!',
                imageUrl: '../images/BackgroundImage.png',  // 이미지 URL 수정
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