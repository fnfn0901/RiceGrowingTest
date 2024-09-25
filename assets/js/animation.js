document.addEventListener('DOMContentLoaded', function() {
    const titleImg = document.querySelector('.title-img');
    titleImg.style.animation = 'slide-down 0.6s cubic-bezier(0.25, 1.5, 0.5, 1) forwards';

    // 링크 복사 버튼 이벤트 추가
    const copyLinkButton = document.getElementById('copy-link-btn');
    const copySuccessMessage = document.getElementById('copy-success');

    copySuccessMessage.style.display = 'none'; // 처음에 메시지를 숨김

    copyLinkButton.addEventListener('click', function() {
      // 현재 페이지 URL을 클립보드에 복사
      const currentUrl = window.location.href;
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
    });
});