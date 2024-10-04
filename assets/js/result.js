import { jobData } from './jobData.js';

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const bestJob = urlParams.get('bestJob');  // URL에서 bestJob 값을 가져옴
    const worstJob = urlParams.get('worstJob'); // URL에서 worstJob 값을 가져옴

    // 직업 및 스탯 정보를 화면에 표시
    displayBestAndWorstJobs(bestJob, worstJob);
    displayStats(bestJob);

    // 재시험 버튼 클릭 시 메인 페이지로 이동
    const retestButton = document.querySelector('.retest-button-container');
    retestButton.addEventListener('click', function() {
        // 현재 URL에서 'result.html' 부분을 제거하고 메인 페이지 URL로 이동
        const currentUrl = window.location.href;
        const baseUrl = currentUrl.split('result.html')[0]; // 'result.html' 이전 부분 추출
        window.location.href = `${baseUrl}`; // 메인 페이지로 이동
    });

    // job-image-container를 꾹 눌렀을 때 이미지 저장 기능
    const jobImageContainer = document.querySelector('.job-image-container');
    jobImageContainer.addEventListener('contextmenu', function(event) {
        event.preventDefault(); // 기본 우클릭 메뉴 방지
        const imageElement = document.getElementById('job-image'); // 이미지 요소 선택
        const imageUrl = imageElement.src; // 이미지 URL 가져오기

        // 다운로드 링크 생성
        const link = document.createElement('a');
        link.href = imageUrl; // 이미지 URL 설정
        link.download = '직업이미지.png'; // 다운로드할 파일 이름 설정

        // 링크 클릭하여 다운로드 실행
        link.click();
    });
});

// 직업 정보 및 이미지를 화면에 표시하는 함수
function displayBestAndWorstJobs(bestJob, worstJob) {
    // 공통 요소 선택
    const jobImageElement = document.getElementById('job-image'); // 직업 이미지 요소 선택
    const jobTitleElement = document.querySelector('.job-title'); // 직업 제목 요소 선택
    const jobNameElement = document.querySelector('.job-name');   // 직업 이름 요소 선택
    const jobDescriptionElement = document.querySelector('.job-description'); // 직업 설명 요소 선택

    // 베스트 직업 프레임 요소 선택
    const bestJobImageElement = document.querySelector('.best-image-frame'); // 베스트 직업 이미지 요소 선택
    const bestJobNameElement = document.querySelector('.best-job-name'); // 베스트 직업 이름 요소 선택

    // 워스트 직업 프레임 요소 선택
    const worstJobImageElement = document.querySelector('.worst-image-frame'); // 워스트 직업 이미지 요소 선택
    const worstJobNameElement = document.querySelector('.worst-job-name'); // 워스트 직업 이름 요소 선택

    // bestJob 데이터가 존재하는지 확인
    if (jobData[bestJob]) {
        // 메인 직업 정보 설정
        jobImageElement.src = jobData[bestJob].image;  // 메인 이미지 설정
        jobNameElement.textContent = bestJob;  // 메인 직업 이름 설정
        jobTitleElement.textContent = bestJob; // 메인 직업 타이틀 설정
        jobDescriptionElement.innerHTML = jobData[bestJob].description.map(desc => `<span>${desc}</span>`).join(''); // 직업 설명 추가

        // 베스트 직업 정보 설정
        bestJobImageElement.style.backgroundImage = `url(${jobData[bestJob].image})`;  // 베스트 이미지 설정
        bestJobNameElement.textContent = bestJob;  // 베스트 직업 이름 설정
    } else {
        console.error(`Best job (${bestJob}) not found in jobData.`);
    }

    // worstJob 데이터가 존재하는지 확인
    if (jobData[worstJob]) {
        // 워스트 직업 정보 설정
        worstJobImageElement.style.backgroundImage = `url(${jobData[worstJob].image})`;  // 워스트 이미지 설정
        worstJobNameElement.textContent = worstJob;  // 워스트 직업 이름 설정
    } else {
        console.error(`Worst job (${worstJob}) not found in jobData.`);
    }
}

// 스탯 정보를 화면에 표시하는 함수
function displayStats(bestJob) {
    const statValues = jobData[bestJob]?.stats || { 체력: 50, 정신력: 50, 근력: 50, 순발력: 50, 지능: 50, 친화력: 50 };

    const statsContainer = document.querySelector('.stats'); // 스탯 창 요소 선택
    console.log('Stat values:', statValues); // 스탯 값을 콘솔에 출력하여 확인

    // 스탯 데이터를 HTML로 삽입
    statsContainer.innerHTML = `
        <div>체력 : ${statValues.체력} / 100</div>
        <div>정신력 : ${statValues.정신력} / 100</div>
        <div>근력 : ${statValues.근력} / 100</div>
        <div>순발력 : ${statValues.순발력} / 100</div>
        <div>지능 : ${statValues.지능} / 100</div>
        <div>친화력 : ${statValues.친화력} / 100</div>
    `;
}