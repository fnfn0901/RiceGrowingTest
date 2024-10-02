// 텍스트 타이핑 애니메이션 함수
function typeText(element, text, speed, callback) {
    let i = 0;
    let isTag = false;
    let html = "";

    function typeCharacter() {
        if (i < text.length) {
            const currentChar = text.charAt(i);

            if (currentChar === "<") {
                isTag = true; // HTML 태그 시작을 감지
            }

            html += currentChar; // 태그나 텍스트 모두 html에 추가
            if (!isTag) {
                element.innerHTML = html; // 태그가 아니면 한 글자씩 추가
            }

            if (currentChar === ">") {
                isTag = false; // HTML 태그 끝을 감지하고 태그 전체를 한 번에 추가
                element.innerHTML = html; // 태그가 끝나면 전체 태그를 추가
            }

            i++; // 다음 글자로 이동
            setTimeout(typeCharacter, speed); // speed에 맞춰 다음 글자 추가
        } else {
            if (callback) callback(); // 타이핑이 완료된 후 callback 실행
        }
    }

    typeCharacter(); // 타이핑 애니메이션 시작
}

// 결과 직업 리스트 및 점수
const jobs = [
    { name: '쌀 요리사', score: 0 },
    { name: '쌀 유통 전문가', score: 0 },
    { name: '친환경 농업 연구원', score: 0 },
    { name: '쌀 농업 경영자', score: 0 },
    { name: '쌀 가공 기술자', score: 0 },
    { name: '쌀 브랜드 마케터', score: 0 },
    { name: '쌀 문화 연구가', score: 0 },
    { name: '쌀 품종 개발자', score: 0 }
];

// 질문에 따른 점수 증가 로직
function addScore(questionIndex, answer) {
    switch (questionIndex) {
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

function incrementScore(jobName, points) {
    let job = jobs.find(j => j.name === jobName);
    if (job) job.score += points;
}

// 사용자의 선택에 따른 결과 처리
function processUserAnswers(answers) {
    for (let i = 0; i < answers.length; i++) {
        addScore(i + 1, answers[i]);
    }

    // 모든 직업 점수 중 가장 높은 점수와 가장 낮은 점수를 찾음
    let maxScore = Math.max(...jobs.map(job => job.score));
    let minScore = Math.min(...jobs.map(job => job.score));

    // 가장 높은 점수를 가진 직업과 가장 낮은 점수를 가진 직업을 필터링
    let finalJobs = jobs.filter(job => job.score === maxScore);
    let worstJobs = jobs.filter(job => job.score === minScore);

    // 동점일 경우 랜덤으로 선택
    let bestJob = finalJobs.length > 1 
        ? finalJobs[Math.floor(Math.random() * finalJobs.length)].name 
        : finalJobs[0].name;

    let worstJob = worstJobs.length > 1 
        ? worstJobs[Math.floor(Math.random() * worstJobs.length)].name 
        : worstJobs[0].name;

    // 최종 결과를 result.html로 전달
    return { bestJob, worstJob };
}

document.addEventListener('DOMContentLoaded', function() {
    const questions = [
        {
            question: `농사 시작!<br>오늘 첫날인데 무엇을 할까요?`,
            image: './assets/images/question/question01.png',
            choices: ['A. 일단 이웃들과 친해져야지! 파종 파티를 열어볼까?', 'B. 여유롭게 논 주변을 천천히 둘러보자.']
        },
        {
            question: `갑자기 비가 쏟아집니다!<br>당신의 대처는?`,
            image: './assets/images/question/question02.png',
            choices: ['A. 나를 막을 순 없지! 우비 입고 출동!', 'B. 비 오는 날은 쉬라고 있는 거지. 휴식 모드로 전환!']
        },
        {
            question: '논에 잡초가 가득 자라고 있어요. 어떻게 할까요?',
            image: './assets/images/question/question03.png',
            choices: [`A. 잡초도 하나의 생명!<br>그냥 두자.`, 'B. 잡초는 작물의 적! 당장 뽑아내야지.']
        },
        {
            question: `수확철이 다가오고 있습니다.<br>당신의 수확 계획은?`,
            image: './assets/images/question/question04.png',
            choices: ['A. 철저히 계획은 필수! 그래야 실수 없이 수확할 수 있지!', 'B. 상황에 맞춰 유연하게! 맞춰가는 게 더 효율적일걸?']
        },
        {
            question: '올해도 풍년입니다! 수확한 쌀을 어떻게 활용할까요?',
            image: './assets/images/question/question05.png',
            choices: ['A. 특별한 요리를 도전해 볼까? 쌀 젤라또나 쌀 피자는 어때?', 'B. 쌀은 나눌 때 더 맛있지! 이웃들과 나눠 먹으면 좋겠어.']
        },
        {
            question: `농사 성공을 축하하는 파티를 열려고 합니다.<br>어떤 스타일로 열까요?`,
            image: './assets/images/question/question06.png',
            choices: ['A. 혼자만의 시간을 갖고 조용히 힐링하는 게 나만의 축하 방식!', 'B. 기쁨은 나누면 두 배! 이웃들과 함께 신나는 파티를 열자!']
        },
        {
            question: '긴 휴경기, 당신은 이 시간을 어떻게 보낼 건가요?',
            image: './assets/images/question/question07.png',
            choices: ['A. 책도 읽고 음악을 들으면서 에너지를 충전!', 'B. 야외 활동이나 운동을 하며 활력을 채워보자!']
        },
        {
            question: `올해 성공적으로 농사를 마쳤습니다.<br>내년을 준비할 때 당신은?`,
            image: './assets/images/question/question08.png',
            choices: ['A. 최신 농업 기술을 공부해서 좀 더 효율적으로 일해보자!', 'B. 친환경 방식으로 천천히 도전해보자.']
        },
    ];

    let currentQuestionIndex = 0;
    const totalQuestions = questions.length;
    let userAnswers = [];
    let clickable = false;

    const questionText = document.querySelector('.question-text');
    const imageBox = document.querySelector('.image-box img');
    const choiceA = document.querySelector('.choice-a .choice-text');
    const choiceB = document.querySelector('.choice-b .choice-text');
    const hearts = document.querySelectorAll('.progress-bar img');
    const choiceABox = document.querySelector('.choice-a');
    const choiceBBox = document.querySelector('.choice-b');

    function updateQuestion() {
        clickable = false;
        const currentQuestion = questions[currentQuestionIndex];
        imageBox.src = currentQuestion.image;
        typeText(questionText, currentQuestion.question, 50, function() {
            clickable = true;
        });
        choiceA.innerHTML = currentQuestion.choices[0];
        choiceB.innerHTML = currentQuestion.choices[1];

        for (let i = 0; i < hearts.length; i++) {
            if (i <= currentQuestionIndex) {
                hearts[i].src = './assets/images/filledHeart.svg';
            } else {
                hearts[i].src = './assets/images/emptyHeart.svg';
            }
        }

        resetChoices();
    }

    function nextQuestion() {
        if (currentQuestionIndex < totalQuestions - 1) {
            currentQuestionIndex++;
            updateQuestion();
        } else {
            const result = processUserAnswers(userAnswers); // 최종 결과 처리
            console.log('최종 결과:', result);
            window.location.href = `result.html?bestJob=${encodeURIComponent(result.bestJob)}&worstJob=${encodeURIComponent(result.worstJob)}`; // 결과 페이지로 이동
        }
    }

    function handleChoiceSelection(choiceBox, choiceText, choiceValue) {
        if (!clickable) return;
        clickable = false;

        userAnswers.push(choiceValue); // 선택한 답 저장
        choiceBox.querySelector('img').src = './assets/images/selected.png';
        choiceText.style.color = '#ffffff';

        setTimeout(nextQuestion, 1000);
    }

    function resetChoices() {
        choiceABox.querySelector('img').src = './assets/images/unselected.png';
        choiceA.style.color = '#000000';
        choiceBBox.querySelector('img').src = './assets/images/unselected.png';
        choiceB.style.color = '#000000';
    }

    choiceABox.addEventListener('click', function() {
        handleChoiceSelection(choiceABox, choiceA, 'A');
    });

    choiceBBox.addEventListener('click', function() {
        handleChoiceSelection(choiceBBox, choiceB, 'B');
    });

    updateQuestion();
});