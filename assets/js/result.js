// 결과 페이지에서 직업 설명과 스탯을 표시하는 부분
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const bestJob = urlParams.get('bestJob');
    const worstJob = urlParams.get('worstJob');

    displayBestAndWostJobs(bestJob, worstJob);
    displayStats();
});

// 직업별 설명 리스트
const jobDescriptions = {
    "쌀 요리사": [
        "새로움? 그게 나의 기본 설정이지.",
        "즉흥은 내 필살기야, 준비 없이도 완벽하게!",
        "시작할 때가 제일 재밌지, 인정?",
        "창의력 완충 완료, 이제 출발!",
        "아이디어가 절로 떠오르는 걸 어쩌겠어.",
        "특별한 걸 만드는 게 내 특기지!",
        "내가 지나가면 평범함은 사라지고 특별함만 남아!"
    ],
    "쌀 유통 전문가": [
        "일은 미뤄야 제맛이지! #프로미룬이",
        "한 번 시작하면 끝장을 봐야지!",
        "계획? 난 내 방식대로 간다!",
        "내 시스템만큼 완벽한 건 없지.",
        "시간 약속? 내가 제일 잘 지켜!",
        "오늘은 핑계 말고 기회를 찾아볼까?",
        "지금 이 순간이 진짜 레전드!"
    ],
    "친환경 농업 연구원": [
        "자연이 나를 부르네, 출발해야지!",
        "디테일 속에서 내 아이디어가 빛나!",
        "새로운 가능성? 매일 탐구 중이지!",
        "내가 손대면 평범도 특별해져!",
        "끝까지 파헤쳐야 직성이 풀려!",
        "변화와 혁신, 그게 내가 가는 길!",
        "순간의 영감이 날 이끄는 동력이지!"
    ],
    "쌀 농업 경영자": [
        "계획은 철저하게, 실천은 완벽하게!",
        "차근차근, 내 리듬대로 가는 거지.",
        "과정의 재미를 아는 사람이 진짜 승자!",
        "내 페이스로 최고의 결과를 만들어!",
        "어떻게든 답은 찾아내고야 말지!",
        "한 걸음 한 걸음, 완성도를 높이는 중!",
        "계획 세우기? 그건 내 전문이지!"
    ],
    "쌀 가공 기술자": [
        "새로운 방식? 바로 실행이지!",
        "더 나은 방법 찾는 게 내 취미!",
        "내 손만 닿으면 뭐든 달라진다!",
        "디테일 하나로 차이를 만드는 중!",
        "작은 변화가 큰 혁신을 이끌지!",
        "과정 속에서 즐거움을 찾는 게 내 방식!",
        "늘 더 나은 결과를 만들어내고 있어!"
    ],
    "쌀 브랜드 마케터": [
        "새로움을 찾아 도전하는 게 내 스타일!",
        "작은 아이디어가 세상을 바꾼다!",
        "내 손만 닿으면 다 새로워져!",
        "세상에 새로운 빛을 더하는 중!",
        "디테일 하나로 큰 차이를 만든다!",
        "늘 더 나아지기 위해 발전 중이야!",
        "창의적인 아이디어가 폭발하는 순간!"
    ],
    "쌀 문화 연구가": [
        "과거와 현재를 잇는 완벽한 연결고리!",
        "작은 디테일 하나에도 의미가 철철!",
        "모르는 걸 알아가는 재미가 쏠쏠해!",
        "깊이 파고들어야 직성이 풀리지!",
        "숨겨진 이야기를 찾아 떠나는 탐험가!",
        "새로운 시각으로 세상을 바라보는 중!",
        "매일 배움에서 즐거움을 찾는 나!"
    ],
    "쌀 품종 개발자": [
        "더 나은 미래를 향해 전력 질주 중!",
        "새로운 가능성? 이미 클리어했지!",
        "틀을 깨고 나만의 길을 만든다!",
        "도전이 바로 내 원동력!",
        "늘 실험하며 한 발짝씩 나아가는 중!",
        "포기란 없어, 도전만이 있을 뿐!",
        "매일 더 나은 결과를 위해 달린다!"
    ]
};

// 가장 높은 점수와 낮은 점수의 직업을 찾아 설명 추가
function displayBestAndWostJobs(bestJob, worstJob) {
    const bestDescription = document.querySelector('.best-description-frame');
    const worstDescription = document.querySelector('.wost-description-frame');

    // best job의 설명 추가
    if (jobDescriptions[bestJob]) {
        bestDescription.innerHTML = jobDescriptions[bestJob].map(desc => `<p>${desc}</p>`).join("");
    }

    // worst job의 설명 추가
    if (jobDescriptions[worstJob]) {
        worstDescription.innerHTML = jobDescriptions[worstJob].map(desc => `<p>${desc}</p>`).join("");
    }
}

// 스탯을 랜덤으로 생성하는 함수
function generateRandomStats() {
    const maxStatValue = 100; // 각 스탯의 최대 값
    const minStatValue = 30;  // 각 스탯의 최소 값
    const totalStats = 6;     // 스탯의 개수 (체력, 정신력, 근력, 순발력, 지능, 친화력)

    let stats = [];
    let totalSum = 0;

    // 각 스탯을 최소값으로 설정하여 기본 값을 보장
    for (let i = 0; i < totalStats; i++) {
        let randomValue = Math.floor(Math.random() * (maxStatValue - minStatValue)) + minStatValue;
        stats.push(randomValue);
        totalSum += randomValue;
    }

    // 각 스탯의 총합이 너무 높거나 너무 낮지 않도록 조정
    const maxTotalSum = totalStats * maxStatValue * 0.8; // 최대 총합 (대략 80% 수준)
    const minTotalSum = totalStats * minStatValue * 1.2; // 최소 총합 (대략 120% 수준)

    // 총합이 범위를 벗어났을 때의 조정
    if (totalSum > maxTotalSum) {
        const excess = totalSum - maxTotalSum;
        for (let i = 0; i < totalStats; i++) {
            stats[i] -= Math.floor(excess / totalStats);
        }
    } else if (totalSum < minTotalSum) {
        const shortage = minTotalSum - totalSum;
        for (let i = 0; i < totalStats; i++) {
            stats[i] += Math.floor(shortage / totalStats);
        }
    }

    return {
        체력: stats[0],
        정신력: stats[1],
        근력: stats[2],
        순발력: stats[3],
        지능: stats[4],
        친화력: stats[5]
    };
}

// 스탯을 화면에 표시하는 함수
function displayStats() {
    const statValues = generateRandomStats();

    document.querySelector('.stats').innerHTML = `
        <div>체력 : ${statValues.체력} / 100</div>
        <div>정신력 : ${statValues.정신력} / 100</div>
        <div>근력 : ${statValues.근력}</div>
        <div>순발력 : ${statValues.순발력}</div>
        <div>지능 : ${statValues.지능}</div>
        <div>친화력 : ${statValues.친화력}</div>
    `;
}

// 페이지 로드 시 직업 설명과 스탯을 동시에 표시
document.addEventListener('DOMContentLoaded', function() {
    const bestJob = "쌀 요리사";  // 예시로 가장 높은 점수를 받은 직업
    const worstJob = "쌀 유통 전문가";  // 예시로 가장 낮은 점수를 받은 직업

    displayBestAndWostJobs(bestJob, worstJob);
    displayStats();
});