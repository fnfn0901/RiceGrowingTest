import { jobs } from './jobs.js';

// 질문에 따른 점수 증가 로직
export function addScore(questionIndex, answer) {
    switch (questionIndex + 1) {
        case 1:
            if (answer === 'A') {
                incrementScore('쌀 브랜드 마케터', 2);
                incrementScore('쌀 요리사', 1);
            } else {
                incrementScore('쌀 문화 연구가', 3);
                incrementScore('친환경 농업 연구원', 1);
            }
            break;
        case 2:
            if (answer === 'A') {
                incrementScore('쌀 유통 전문가', 2);
                incrementScore('쌀 가공 기술자', 2);
            } else {
                incrementScore('쌀 농업 경영자', 2);
                incrementScore('쌀 문화 연구가', 1);
            }
            break;
        case 3:
            if (answer === 'A') {
                incrementScore('친환경 농업 연구원', 4);
            } else {
                incrementScore('쌀 가공 기술자', 3);
                incrementScore('쌀 유통 전문가', 2);
            }
            break;
        case 4:
            if (answer === 'A') {
                incrementScore('쌀 농업 경영자', 4);
            } else {
                incrementScore('쌀 유통 전문가', 2);
                incrementScore('쌀 요리사', 2);
            }
            break;
        case 5:
            if (answer === 'A') {
                incrementScore('쌀 요리사', 5);
                incrementScore('쌀 브랜드 마케터', 2);
            } else {
                incrementScore('쌀 문화 연구가', 4);
            }
            break;
        case 6:
            if (answer === 'A') {
                incrementScore('쌀 문화 연구가', 3);
            } else {
                incrementScore('쌀 브랜드 마케터', 3);
                incrementScore('쌀 유통 전문가', 2);
            }
            break;
        case 7:
            if (answer === 'A') {
                incrementScore('쌀 가공 기술자', 3);
                incrementScore('쌀 품종 개발자', 2);
            } else {
                incrementScore('친환경 농업 연구원', 3);
            }
            break;
        case 8:
            if (answer === 'A') {
                incrementScore('쌀 품종 개발자', 4);
            } else {
                incrementScore('쌀 요리사', 3);
            }
            break;
    }
}

// 특정 직업에 점수 추가
function incrementScore(jobName, points) {
    let job = jobs.find(j => j.name === jobName);
    if (job) job.score += points;
}