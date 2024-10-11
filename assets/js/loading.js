document.addEventListener('DOMContentLoaded', function() {

    // URL에서 쿼리 매개변수를 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const bestJob = urlParams.get('bestJob');
    const worstJob = urlParams.get('worstJob');

    // 5초 후에 result.html로 리다이렉트
    setTimeout(function() {
        window.location.href = `result.html?bestJob=${encodeURIComponent(bestJob)}&worstJob=${encodeURIComponent(worstJob)}`;
}, 3000); 
});