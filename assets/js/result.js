import { jobData } from './jobData.js';

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const bestJob = urlParams.get('bestJob');  // URL에서 bestJob 값을 가져옴
    const worstJob = urlParams.get('worstJob'); // URL에서 worstJob 값을 가져옴

    // 직업 및 스탯 정보를 화면에 표시
    displayBestAndWorstJobs(bestJob, worstJob);
    
    // 스탯 바를 감시하는 Intersection Observer 설정
    observeStats();

    // 재시험 버튼 클릭 시 현재 URL에서 'result.html' 부분을 제거하고 메인 페이지로 이동
    const retestButton = document.querySelector('.retest-button-container');
    retestButton.addEventListener('click', function() {
        const baseUrl = window.location.origin; // 현재 URL의 origin 부분만 추출
        window.location.href = baseUrl; // 메인 페이지로 이동
    });

    // 방문하기 버튼 클릭 시 지정된 URL로 이동
    const visitButton = document.querySelector('.visit-button-container');
    visitButton.addEventListener('click', function() {
        window.location.href = 'https://www.ssalfriends.com/home'; // 지정된 페이지로 이동
    });

    // job-image-container를 꾹 눌렀을 때 이미지 저장 기능 (PC에서는 기본 메뉴 사용)
    const jobImageContainer = document.querySelector('.job-image-container');
    jobImageContainer.addEventListener('contextmenu', function(event) {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent); // 모바일 여부 확인

        if (isMobile) {
            event.preventDefault(); // 모바일에서는 기본 우클릭 메뉴 방지

            const imageElement = document.getElementById('job-image'); // 이미지 요소 선택
            const imageUrl = imageElement.src; // 이미지 URL 가져오기

            // 다운로드 링크 생성
            const link = document.createElement('a');
            link.href = imageUrl; // 이미지 URL 설정
            link.download = '직업이미지.png'; // 다운로드할 파일 이름 설정

            // 링크 클릭하여 다운로드 실행
            link.click();
        }
        // PC에서는 기본 브라우저 우클릭 메뉴가 표시되도록 설정
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

// 스탯 값을 동적으로 업데이트하는 함수
function updateStatBar(statId, value, maxValue) {
    const bar = document.getElementById(statId);
    const percentage = (value / maxValue) * 100; // 백분율 계산
    bar.style.width = `${percentage}%`; // 너비를 백분율에 맞게 설정
}

// 스탯 정보를 화면에 표시하는 함수
function displayStats(bestJob) {
    const statValues = jobData[bestJob]?.stats || { 체력: 50, 창의력: 50, 집중력: 50, 분석력: 50, 친화력: 50, 행동력: 50 };

    // 각 스탯 바 업데이트 (애니메이션 적용)
    updateStatBar('stat-health', statValues.체력, 100);
    updateStatBar('stat-creativity', statValues.창의력, 100);
    updateStatBar('stat-focus', statValues.집중력, 100);
    updateStatBar('stat-analysis', statValues.분석력, 100);
    updateStatBar('stat-affinity', statValues.친화력, 100);
    updateStatBar('stat-activity', statValues.행동력, 100);
}

// Intersection Observer를 사용하여 'stat-activity'가 화면에 나타났을 때 애니메이션 5초 후에 시작
function observeStats() {
    const statActivity = document.getElementById('stat-activity'); // '행동력' 스탯 바 요소 선택

    // Intersection Observer 콜백 함수
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // '행동력' 스탯 바가 화면에 나타났을 때 5초 후 애니메이션 실행
                setTimeout(() => {
                    const bestJob = new URLSearchParams(window.location.search).get('bestJob');
                    displayStats(bestJob); // 스탯 바 애니메이션 시작
                }, 800);
                observer.disconnect(); // 한 번 실행 후 더 이상 감시하지 않도록 설정
            }
        });
    };

    // Intersection Observer 설정 (threshold: 0.1 -> 요소가 10%만 보여도 감지)
    const observerOptions = {
        root: null, // 뷰포트를 기준으로 감시
        threshold: 0.1 // 10% 이상 보일 때 트리거
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    observer.observe(statActivity); // '행동력' 스탯 바 감시 시작
}