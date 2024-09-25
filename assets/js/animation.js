document.addEventListener('DOMContentLoaded', function() {
    const copyLinkButton = document.getElementById('copy-link-btn');
    const copySuccessMessage = document.getElementById('copy-success');

    copySuccessMessage.style.display = 'none'; // 처음에 메시지를 숨김

    copyLinkButton.addEventListener('click', function() {
        const currentUrl = window.location.href;

        // Clipboard API 지원 여부 확인
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(currentUrl)
                .then(() => {
                    // 복사 성공 시 메시지를 보여줌
                    copySuccessMessage.style.display = 'flex';

                    // 2초 후 메시지를 다시 숨김
                    setTimeout(() => {
                        copySuccessMessage.style.display = 'none';
                    }, 2000);
                })
                .catch(err => {
                    console.error('링크 복사 실패:', err);
                });
        } else {
            // execCommand('copy') 방식을 사용하여 HTTP에서도 복사가 가능하도록 함
            const tempInput = document.createElement('input');
            tempInput.value = currentUrl;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);

            // 복사 성공 메시지를 보여줌
            copySuccessMessage.style.display = 'flex';

            // 2초 후 메시지를 다시 숨김
            setTimeout(() => {
                copySuccessMessage.style.display = 'none';
            }, 2000);
        }
    });
});