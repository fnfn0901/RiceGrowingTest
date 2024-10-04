document.addEventListener('DOMContentLoaded', function() {
    const playButton = document.querySelector('.play-button');
    const copyLinkButton = document.getElementById('copy-link-btn');
    const copySuccessMessage = document.getElementById('copy-success');

    playButton.addEventListener('click', function() {
        window.location.href = 'question.html'; // 질문 화면 파일로 이동
    });
    
    copySuccessMessage.style.display = 'none'; // 처음에 메시지를 숨김

    copyLinkButton.addEventListener('click', function() {
        const currentUrl = window.location.href;

        // Clipboard API 지원 여부 확인
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(currentUrl)
                .then(() => {
                    // 복사 성공 시 메시지를 보여줌
                    copySuccessMessage.style.display = 'flex';

                    // 복사 완료 메시지를 유연한 시간으로 설정
                    const displayDuration = 2000; // 복사 완료 메시지 표시 시간
                    setTimeout(() => {
                        copySuccessMessage.style.display = 'none';
                    }, displayDuration);
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