import { jobData } from './jobData.js';

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const bestJob = urlParams.get('bestJob');
    const worstJob = urlParams.get('worstJob');
    const retestButton = document.querySelector('.retest-button');

    console.log('Best Job:', bestJob);  // 확인용 콘솔 로그
    console.log('Worst Job:', worstJob);  // 확인용 콘솔 로그

    displayBestAndWorstJobs(bestJob, worstJob);
    displayStats(bestJob);

    retestButton.addEventListener('click', function() {
        window.location.href = 'index.html'; // 'index.html'로 이동
    });
});

function displayBestAndWorstJobs(bestJob, worstJob) {
    const jobTitleElement = document.querySelector('.job-title');
    const bestDescription = document.querySelector('.best-description-frame');
    const worstDescription = document.querySelector('.worst-description-frame');
    const bestImage = document.querySelector('.best-job-image');  // best-job 이미지 선택
    const worstImage = document.querySelector('.worst-job-image'); // worst-job 이미지 선택

    // best job 제목 및 설명 추가
    jobTitleElement.textContent = bestJob;
    if (jobData[bestJob]) {
        bestDescription.innerHTML = jobData[bestJob].description.map(desc => `<p>${desc}</p>`).join("");
        bestImage.style.backgroundImage = `url(${jobData[bestJob].image})`;  // 이미지 경로 설정
    } else {
        console.error(`Best job (${bestJob}) description not found in jobData.`);
    }

    // worst job 설명 및 이미지 추가
    if (jobData[worstJob]) {
        worstDescription.innerHTML = jobData[worstJob].description.map(desc => `<p>${desc}</p>`).join("");
        worstImage.style.backgroundImage = `url(${jobData[worstJob].image})`;  // 이미지 경로 설정
    } else {
        console.error(`Worst job (${worstJob}) description not found in jobData.`);
    }
}

function displayStats(bestJob) {
    const statValues = jobData[bestJob]?.stats || { 체력: 50, 정신력: 50, 근력: 50, 순발력: 50, 지능: 50, 친화력: 50 };

    document.querySelector('.stats').innerHTML = `
        <div>체력 : ${statValues.체력}</div>
        <div>정신력 : ${statValues.정신력}</div>
        <div>근력 : ${statValues.근력}</div>
        <div>순발력 : ${statValues.순발력}</div>
        <div>지능 : ${statValues.지능}</div>
        <div>친화력 : ${statValues.친화력}</div>
    `;
}