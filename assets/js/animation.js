document.addEventListener('DOMContentLoaded', function() {
    console.log("DOMContentLoaded event triggered");  // 확인 로그

    const playButton = document.querySelector('.play-button');
    const copyLinkButton = document.getElementById('copy-link-btn');
    const copySuccessMessage = document.getElementById('copy-success');
    const participantsText = document.getElementById('participant-count');

    // 참여자 수 조회 함수
    function updateParticipants() {
        fetch('http://13.125.23.77/update_participants.php?action=fetch')
        .then(response => response.text())
        .then(text => {
            console.log("서버로부터의 응답 (조회):", text);

            try {
                const data = JSON.parse(text);  // JSON 파싱 시도
                if (data.count !== undefined) {
                    participantsText.textContent = `${data.count}명`;
                } else {
                    console.error("JSON 응답에서 'count'를 찾을 수 없습니다:", data);
                }
            } catch (error) {
                console.error("JSON 파싱 오류:", error, "응답 내용:", text);
            }
        })
        .catch(error => {
            console.error('참여자 수 불러오기 실패:', error);
            participantsText.textContent = '불러오기 실패';
        });
    }

    // 참여자 수 증가 함수
    function incrementParticipants() {
        fetch('http://13.125.23.77/update_participants.php?action=increment')
        .then(response => response.text())
        .then(text => {
            console.log("서버로부터의 응답 (증가):", text);

            try {
                const data = JSON.parse(text);  // JSON 파싱 시도
                if (data.count !== undefined) {
                    participantsText.textContent = `${data.count}명`;
                } else {
                    console.error("JSON 응답에서 'count'를 찾을 수 없습니다:", data);
                }
            } catch (error) {
                console.error("JSON 파싱 오류:", error, "응답 내용:", text);
            }
        })
        .catch(error => {
            console.error('참여자 수 증가 실패:', error);
        });
    }

    // 페이지 로드 시 참여자 수 조회
    updateParticipants();

    // 시작 버튼 클릭 시 질문 화면으로 이동 및 참여자 수 증가
    playButton.addEventListener('click', function() {
        incrementParticipants();  // 참여자 수 증가 호출
        window.location.href = 'question.html'; // 질문 화면 파일로 이동
    });

    // 카카오톡 공유 버튼 클릭 이벤트 (원래 코드 유지)
    document.getElementById('kakao-link-btn').addEventListener('click', function() {
        Kakao.Link.sendDefault({
            objectType: 'feed',
            content: {
                title: '쌀 키우기 테스트',
                description: '당신의 쌀 농부 유형은 무엇일까요? 지금 바로 테스트해 보세요!',
                imageUrl: 'https://ssalbtis3bucket.s3.ap-northeast-2.amazonaws.com/assets/images/BackgroundImage.png',
                link: {
                    mobileWebUrl: 'http://13.125.23.77',
                    webUrl: 'http://13.125.23.77'
                }
            },
            buttons: [
                {
                    title: '테스트하러 가기',
                    link: {
                        mobileWebUrl: 'http://13.125.23.77',
                        webUrl: 'http://13.125.23.77'
                    }
                }
            ]
        });
    });

    // 링크 복사 기능 (원래 코드 유지)
    copySuccessMessage.style.display = 'none';

    copyLinkButton.addEventListener('click', function() {
        const currentUrl = window.location.href;

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(currentUrl)
                .then(() => {
                    copySuccessMessage.style.display = 'flex';
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
