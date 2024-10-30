export const jobData = {
    "쌀 요리사": {
        description: [
            "새로움? 그게 나의 기본 설정이지.",
            "즉흥은 내 필살기야, 준비 없이도 완벽하게!",
            "시작할 때가 제일 재밌지, 인정?",
            "창의력 완충 완료, 이제 출발!",
            "아이디어가 절로 떠오르는 걸 어쩌겠어.",
            "특별한 걸 만드는 게 내 특기지!",
            "내가 지나가면 특별함만 남지!"
        ],
        stats: { 체력: 55, 창의력: 90, 집중력: 60, 분석력: 50, 친화력: 70, 행동력: 85 },
        image: './assets/images/result/result01.png',
        incrementScore: function(answer) {
            return answer === 'A' ? 4 : 3;
        }
    },
    "쌀 유통 관리사": {
        description: [
            "일은 미뤄야 제맛이지! #프로미룬이",
            "한 번 시작하면 끝장을 봐야지!",
            "계획? 난 내 방식대로 간다!",
            "내 시스템만큼 완벽한 건 없지.",
            "시간 약속? 내가 제일 잘 지켜!",
            "오늘은 핑계 말고 기회를 찾아볼까?",
            "지금 이 순간이 진짜 레전드!"
        ],
        stats: { 체력: 65, 창의력: 60, 집중력: 85, 분석력: 80, 친화력: 70, 행동력: 50 },
        image: './assets/images/result/result02.png',
        incrementScore: function(answer) {
            return answer === 'A' ? 3 : 5;
        }
    },
    "친환경 쌀 연구원": {
        description: [
            "자연이 나를 부르네, 출발해야지!",
            "디테일 속에서 내 아이디어가 빛나!",
            "새로운 가능성? 매일 탐구 중이지!",
            "내가 손대면 평범도 특별해져!",
            "끝까지 파헤쳐야 직성이 풀려!",
            "변화와 혁신, 그게 내가 가는 길!",
            "순간의 영감이 날 이끄는 동력이지!"
        ],
        stats: { 체력: 50, 창의력: 75, 집중력: 80, 분석력: 90, 친화력: 55, 행동력: 60 },
        image: './assets/images/result/result03.png',
        incrementScore: function(answer) {
            return answer === 'B' ? 4 : 2;
        }
    },
    "쌀 농업 경영자": {
        description: [
            "계획은 철저하게, 실천은 완벽하게!",
            "차근차근, 내 리듬대로 가는 거지.",
            "과정의 재미를 아는 사람이 진짜 승자!",
            "내 페이스로 최고의 결과를 만들어!",
            "어떻게든 답은 찾아내고야 말지!",
            "한 걸음 한 걸음, 완성도를 높이는 중!",
            "계획 세우기? 그건 내 전문이지!"
        ],
        stats: { 체력: 80, 창의력: 55, 집중력: 75, 분석력: 85, 친화력: 60, 행동력: 55 },
        image: './assets/images/result/result04.png',
        incrementScore: function(answer) {
            return answer === 'A' ? 5 : 3;
        }
    },
    "쌀 가공 기술자": {
        description: [
            "새로운 방식? 바로 실행이지!",
            "더 나은 방법 찾는 게 내 취미!",
            "내 손만 닿으면 뭐든 달라진다!",
            "디테일 하나로 차이를 만드는 중!",
            "작은 변화가 큰 혁신을 이끌지!",
            "과정 속에서 즐거움을 찾는 게 내 방식!",
            "늘 더 나은 결과를 만들어내고 있어!"
        ],
        stats: { 체력: 60, 창의력: 80, 집중력: 70, 분석력: 85, 친화력: 55, 행동력: 60 },
        image: './assets/images/result/result05.png',
        incrementScore: function(answer) {
            return answer === 'A' ? 4 : 2;
        }
    },
    "쌀 브랜드 마케터": {
        description: [
            "새로움을 찾아 도전하는 게 내 스타일!",
            "작은 아이디어가 세상을 바꾼다!",
            "내 손만 닿으면 다 새로워져!",
            "세상에 새로운 빛을 더하는 중!",
            "디테일 하나로 큰 차이를 만든다!",
            "늘 더 나아지기 위해 발전 중이야!",
            "창의적인 아이디어가 폭발하는 순간!"
        ],
        stats: { 체력: 60, 창의력: 90, 집중력: 65, 분석력: 55, 친화력: 80, 행동력: 60 },
        image: './assets/images/result/result06.png',
        incrementScore: function(answer) {
            return answer === 'A' ? 3 : 4;
        }
    },
    "쌀 문화 연구가": {
        description: [
            "과거와 현재를 잇는 완벽한 연결고리!",
            "작은 디테일 하나에도 의미가 철철!",
            "모르는 걸 알아가는 재미가 쏠쏠해!",
            "깊이 파고들어야 직성이 풀리지!",
            "숨겨진 이야기를 찾아 떠나는 탐험가!",
            "새로운 시각으로 세상을 바라보는 중!",
            "매일 배움에서 즐거움을 찾는 나!"
        ],
        stats: { 체력: 50, 창의력: 75, 집중력: 85, 분석력: 90, 친화력: 55, 행동력: 55 },
        image: './assets/images/result/result07.png',
        incrementScore: function(answer) {
            return answer === 'B' ? 3 : 4;
        }
    },
    "쌀 품종 개발자": {
        description: [
            "더 나은 미래를 향해 전력 질주 중!",
            "새로운 가능성? 이미 클리어했지!",
            "틀을 깨고 나만의 길을 만든다!",
            "도전이 바로 내 원동력!",
            "늘 실험하며 한 발짝씩 나아가는 중!",
            "포기란 없어, 도전만이 있을 뿐!",
            "매일 더 나은 결과를 위해 달린다!"
        ],
        stats: { 체력: 60, 창의력: 80, 집중력: 70, 분석력: 85, 친화력: 50, 행동력: 65 },
        image: './assets/images/result/result08.png',
        incrementScore: function(answer) {
            return answer === 'A' ? 5 : 3;
        }
    }
};

// jobs 배열 생성
export const jobs = Object.keys(jobData).map(jobName => ({
    name: jobName,
    score: 0,
}));

// 점수 추가 로직
export function addScore(questionIndex, answer) {
    jobs.forEach(job => {
        const jobDetails = jobData[job.name];
        job.score += jobDetails.incrementScore(answer);  // 별도의 score 필드에 점수 누적
    });
}

// 결과 계산 로직
export function getFinalResult() {
    let maxScore = -Infinity;
    let minScore = Infinity;
    let bestJob = null;
    let worstJob = null;

    jobs.forEach(job => {
        const score = job.score;

        // 최대 점수 업데이트
        if (score > maxScore) {
            maxScore = score;
            bestJob = job.name;
        }

        // 최소 점수 업데이트
        if (score < minScore) {
            minScore = score;
            worstJob = job.name;
        }
    });

    // 동일한 점수의 다른 직업이 있을 경우 처리
    const maxScoreJobs = jobs.filter(job => job.score === maxScore);
    const minScoreJobs = jobs.filter(job => job.score === minScore);

    if (maxScoreJobs.length > 1) {
        bestJob = maxScoreJobs[Math.floor(Math.random() * maxScoreJobs.length)].name;
    }
    
    if (minScoreJobs.length > 1) {
        worstJob = minScoreJobs[Math.floor(Math.random() * minScoreJobs.length)].name;
    }

    // 예외 처리: bestJob과 worstJob이 동일할 경우
    if (bestJob === worstJob) {
        worstJob = minScoreJobs.filter(job => job.name !== bestJob)[0]?.name || worstJob;
    }

    return { bestJob, worstJob };
}