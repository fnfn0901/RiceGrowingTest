document.addEventListener("DOMContentLoaded", function() {
    // URL에서 job 파라미터를 추출하는 함수
    function getJobFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('job'); // 'job' 파라미터 값을 가져옴
    }

    // 직업명을 job-title에 넣기
    const jobTitleElement = document.querySelector(".job-title");
    const jobName = getJobFromUrl();

    if (jobName) {
        jobTitleElement.textContent = jobName; // 직업명 표시
    }

    // 테스트 다시하기 버튼 이벤트
    const retestButton = document.querySelector(".retest-button");
    retestButton.addEventListener("click", function() {
        window.location.href = "index.html"; // index.html로 이동
    });
});