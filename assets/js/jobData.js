export const jobData = {
    "쌀 요리사": {
        description: [
            "새로움? 그게 나의 기본 설정이지.",
            "즉흥은 내 필살기야, 준비 없이도 완벽하게!",
            "시작할 때가 제일 재밌지, 인정?",
            "창의력 완충 완료, 이제 출발!",
            "아이디어가 절로 떠오르는 걸 어쩌겠어.",
            "특별한 걸 만드는 게 내 특기지!",
            "내가 지나가면 평범함은 사라지고 특별함만 남아!"
        ],
        stats: { 체력: 83, 정신력: 52, 근력: 47, 순발력: 91, 지능: 64, 친화력: 73 },
        image: './assets/images/result/result01.png',
        incrementScore: function(answer) {
            if (answer === 'A') return 5;
            return 3;
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
        stats: { 체력: 67, 정신력: 85, 근력: 58, 순발력: 63, 지능: 74, 친화력: 92 },
        image: './assets/images/result/result02.png',
        incrementScore: function(answer) {
            if (answer === 'A') return 2;
            return 4;
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
        stats: { 체력: 55, 정신력: 93, 근력: 61, 순발력: 54, 지능: 82, 친화력: 68 },
        image: './assets/images/result/result03.png',
        incrementScore: function(answer) {
            if (answer === 'B') return 4;
            return 1;
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
        stats: { 체력: 74, 정신력: 72, 근력: 83, 순발력: 62, 지능: 88, 친화력: 57 },
        image: './assets/images/result/result04.png',
        incrementScore: function(answer) {
            if (answer === 'A') return 4;
            return 2;
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
        stats: { 체력: 63, 정신력: 67, 근력: 72, 순발력: 85, 지능: 91, 친화력: 53 },
        image: './assets/images/result/result05.png',
        incrementScore: function(answer) {
            if (answer === 'A') return 3;
            return 2;
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
        stats: { 체력: 72, 정신력: 65, 근력: 54, 순발력: 89, 지능: 83, 친화력: 62 },
        image: './assets/images/result/result06.png',
        incrementScore: function(answer) {
            if (answer === 'A') return 5;
            return 2;
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
        stats: { 체력: 53, 정신력: 88, 근력: 63, 순발력: 52, 지능: 84, 친화력: 71 },
        image: './assets/images/result/result07.png',
        incrementScore: function(answer) {
            if (answer === 'B') return 3;
            return 1;
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
        stats: { 체력: 61, 정신력: 82, 근력: 75, 순발력: 59, 지능: 92, 친화력: 56 },
        image: './assets/images/result/result08.png',
        incrementScore: function(answer) {
            if (answer === 'A') return 4;
            return 2;
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
    const jobNames = Object.keys(jobData);
    
    jobNames.forEach(jobName => {
        const job = jobData[jobName];
        if (job.incrementScore) {
            job.stats['score'] = (job.stats['score'] || 0) + job.incrementScore(answer);
        }
    });
}

// 결과 계산 로직
export function getFinalResult() {
    const jobNames = Object.keys(jobData);
    let maxScore = -1;
    let minScore = Infinity;
    let bestJob = null;
    let worstJob = null;

    jobNames.forEach(jobName => {
        const score = jobData[jobName].stats['score'] || 0;
        if (score > maxScore) {
            maxScore = score;
            bestJob = jobName;
        }
        if (score < minScore) {
            minScore = score;
            worstJob = jobName;
        }
    });

    return { bestJob, worstJob };
}