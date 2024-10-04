import { jobData } from './jobData.js';

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const bestJob = urlParams.get('bestJob');  // URL에서 bestJob 값을 가져옴
    const worstJob = urlParams.get('worstJob'); // URL에서 worstJob 값을 가져옴

    // 직업 및 스탯 정보를 화면에 표시
    displayBestAndWorstJobs(bestJob);
    displayStats(bestJob);

    // 재시험 버튼 클릭 시 index 페이지로 이동
    const retestButton = document.querySelector('.retest-button');
    retestButton.addEventListener('click', function() {
        window.location.href = 'index.html'; // 메인 페이지로 이동
    });
});

// 직업 정보 및 이미지를 화면에 표시하는 함수
function displayBestAndWorstJobs(bestJob) {
    const jobImageElement = document.getElementById('job-image'); // 직업 이미지 요소 선택
    const jobTitleElement = document.querySelector('.job-title'); // 직업 제목 요소 선택
    const jobNameElement = document.querySelector('.job-name');   // 직업 이름 요소 선택
    const jobDescriptionElement = document.querySelector('.job-description'); // 직업 설명 요소 선택

    // bestJob 데이터가 존재하는지 확인
    if (jobData[bestJob]) {
        jobImageElement.src = jobData[bestJob].image;  // 이미지 설정
        jobNameElement.textContent = bestJob;  // 직업 이름 설정
        jobTitleElement.textContent = bestJob; // 직업 타이틀 설정

        // 직업 설명을 동적으로 추가 (각 문장에 동그라미 추가)
        jobDescriptionElement.innerHTML = jobData[bestJob].description.map(desc => `<span>${desc}</span>`).join('');
    } else {
        console.error(`Best job (${bestJob}) not found in jobData.`);
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